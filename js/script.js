// ============================================
// CONFIGURACIÓN
// ============================================
const CONFIG = {
    whatsappNumber: '573164212929', // Número de WhatsApp (Colombia: 57 + 3164212929)
    animationDelay: 30, // Delay entre animaciones de cards (ms) - reducido para carga más rápida
    loadingDuration: 800, // Duración del loading (ms) - reducido para carga más rápida
    parallaxSpeed: 0.5 // Velocidad del efecto parallax
};

// ============================================
// DATOS DE PRODUCTOS
// ============================================
// Los productos se cargan desde js/products.js
// Asegurarse de que products.js se cargue antes de este archivo
// Usar directamente window.* para evitar conflictos de declaración
function getProducts() {
    return window.products || [];
}

function getTshirtImages() {
    return window.tshirtImages || [];
}

function getTshirtQuotes() {
    return window.tshirtQuotes || [];
}

function getProductCategories() {
    return window.productCategories || [];
}

function getProductTypes() {
    return window.productTypes || [];
}

function getProductBadges() {
    return window.productBadges || [];
}

// Verificar que los productos se cargaron correctamente (sin declarar constantes para evitar conflictos)
(function checkProducts() {
    const products = getProducts();
    const tshirtImages = getTshirtImages();

    if (products.length === 0 && tshirtImages.length === 0) {
        console.warn('⚠️ No se encontraron productos. Verificar que products.js se cargó correctamente.');
    } else {
        console.log(`✅ Productos cargados: ${products.length} productos, ${tshirtImages.length} imágenes`);
    }
})();

// Sistema de favoritos
let favorites = JSON.parse(localStorage.getItem('noiseFavorites')) || [];

// Migración de datos antiguos (array de números) a nuevo formato (array de objetos)
if (favorites.length > 0 && typeof favorites[0] === 'number') {
    favorites = favorites.map(index => ({ index, size: null }));
    localStorage.setItem('noiseFavorites', JSON.stringify(favorites));
}

// Migración de datos antiguos (array de números) a nuevo formato (array de objetos)
if (favorites.length > 0 && typeof favorites[0] === 'number') {
    favorites = favorites.map(index => ({ index, size: null }));
    localStorage.setItem('noiseFavorites', JSON.stringify(favorites));
}

const MAX_RANDOM_CAMISETAS = 15;
let camisetasRandomOrder = [];
let camisetasDisplayLimit = MAX_RANDOM_CAMISETAS;
const CATEGORY_NOTICES = {
    pets: 'Categoría especial: personaliza tu camiseta con la foto de tu peludito y rinde homenaje con estilo.'
};

// ============================================
// FUNCIONES DE PRODUCTOS
// ============================================
function loadTshirts() {
    console.log('🔄 Iniciando carga de productos...');
    const productGrid = document.getElementById('productGrid');
    if (!productGrid) {
        console.error('❌ productGrid no encontrado');
        return;
    }

    // Obtener productos actualizados desde window
    const currentImages = getTshirtImages();
    const currentQuotes = getTshirtQuotes();
    const currentCategories = getProductCategories();
    const currentTypes = getProductTypes();
    const currentBadges = getProductBadges();

    // Verificar que hay productos
    if (!currentImages || currentImages.length === 0) {
        console.error('❌ No hay productos para cargar. Verificar que products.js se cargó correctamente.');
        console.log('Productos disponibles:', window.products);
        console.log('Imágenes disponibles:', window.tshirtImages);
        return;
    }

    console.log(`📦 Cargando ${currentImages.length} productos...`);

    try {
        generateRandomCamisetasOrder();
        let cardsCreated = 0;
        currentImages.forEach((imagePath, index) => {
            try {
                const card = createTshirtCard(imagePath, index, currentQuotes[index], currentCategories[index], currentBadges[index], currentTypes[index]);
                productGrid.appendChild(card);
                cardsCreated++;

                // Animación de aparición con delay (batch para mejor rendimiento)
                const batchDelay = Math.floor(index / 3) * CONFIG.animationDelay;
                setTimeout(() => {
                    card.classList.add('visible');
                }, batchDelay);
            } catch (error) {
                console.error(`❌ Error creando card ${index} (${imagePath}):`, error);
            }
        });
        console.log(`✅ ${cardsCreated} productos cargados exitosamente`);

        // Aplicar filtros iniciales con el límite aleatorio
        applyFilters();
    } catch (error) {
        console.error('❌ Error en loadTshirts():', error);
    }
}

function createTshirtCard(imagePath, index, title, category, badge, type) {
    // Obtener valores actualizados si no se pasan como parámetros
    const currentQuotes = getTshirtQuotes();
    const currentCategories = getProductCategories();
    const currentTypes = getProductTypes();
    const currentBadges = getProductBadges();

    const productTitle = title || currentQuotes[index] || `Noise T-Shirt ${index + 1}`;
    const productCategory = category || currentCategories[index] || 'empoderamiento';
    const productType = type || currentTypes[index] || 'camisetas';
    const productBadge = badge !== undefined ? badge : currentBadges[index];

    // Contenedor principal
    const card = document.createElement('div');
    card.className = 'tshirt-card';
    card.dataset.category = productCategory;
    card.dataset.type = productType;
    card.dataset.index = index;

    // Contenedor de imagen
    const imageContainer = document.createElement('div');
    imageContainer.className = 'tshirt-image-container';

    // Badge del producto
    if (productBadge) {
        const badgeEl = document.createElement('div');
        badgeEl.className = `product-badge ${productBadge}`;
        badgeEl.textContent = productBadge === 'new' ? 'Nuevo' :
            productBadge === 'bestseller' ? 'Más Vendido' :
                productBadge === 'limited' ? 'Limitado' : '';
        imageContainer.appendChild(badgeEl);
    }

    // Botón de favoritos
    const favoriteBtn = document.createElement('button');
    favoriteBtn.className = 'favorite-btn';
    favoriteBtn.setAttribute('aria-label', 'Agregar a favoritos');
    favoriteBtn.innerHTML = '<i class="far fa-heart"></i>';
    if (favorites.some(item => item.index === index)) {
        favoriteBtn.classList.add('active');
        favoriteBtn.innerHTML = '<i class="fas fa-heart"></i>';
    }
    favoriteBtn.onclick = (e) => {
        e.stopPropagation();
        toggleFavorite(index);
    };
    imageContainer.appendChild(favoriteBtn);

    const img = document.createElement('img');
    img.src = imagePath;
    img.alt = productTitle;
    img.className = 'tshirt-image';
    img.loading = 'lazy';
    img.decoding = 'async';
    // Priorizar primeras 6 imágenes para carga más rápida
    if (index < 6) {
        img.fetchPriority = 'high';
    }

    // Manejo de errores de imagen - ocultar toda la card si la imagen no está disponible
    img.onerror = function () {
        // Ocultar toda la tarjeta cuando la imagen no esté disponible
        card.style.display = 'none';
        card.style.visibility = 'hidden';
        card.style.opacity = '0';
        card.style.height = '0';
        card.style.margin = '0';
        card.style.padding = '0';
    };

    // Overlay con información
    const overlay = document.createElement('div');
    overlay.className = 'tshirt-overlay';

    const overlayContent = document.createElement('div');
    overlayContent.className = 'tshirt-info';

    const titleEl = document.createElement('h3');
    titleEl.className = 'tshirt-title';
    titleEl.textContent = productTitle;

    const price = document.createElement('p');
    price.className = 'tshirt-price';
    price.textContent = 'Consultar precio';

    overlayContent.appendChild(titleEl);
    overlayContent.appendChild(price);
    overlay.appendChild(overlayContent);

    // Botón de vista rápida
    const quickViewBtn = document.createElement('button');
    quickViewBtn.className = 'quick-view-btn';
    quickViewBtn.textContent = 'Vista Rápida';
    quickViewBtn.onclick = (e) => {
        e.stopPropagation();
        openQuickView(index);
    };
    imageContainer.appendChild(quickViewBtn);

    imageContainer.appendChild(img);
    imageContainer.appendChild(overlay);

    // Botón de acción
    const actionBtn = document.createElement('button');
    actionBtn.className = 'tshirt-button';
    actionBtn.textContent = 'Más Info';
    actionBtn.setAttribute('aria-label', `Más información sobre ${productTitle}`);
    actionBtn.onclick = () => openWhatsApp(productTitle);

    card.appendChild(imageContainer);
    card.appendChild(actionBtn);

    return card;
}

function openWhatsApp(productName, size = null, quality = null, price = null) {
    let messageText = `Hola, me interesa esta camiseta: ${productName}`;
    if (size) {
        messageText += `\nTalla: ${size}`;
    }
    if (quality) {
        messageText += `\nCalidad/Estilo: ${quality}`;
    }
    if (price) {
        messageText += `\nPrecio: ${price}`;
    }
    const message = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
}

// Hacer función global
window.openWhatsApp = openWhatsApp;

// ============================================
// NAVEGACIÓN Y SCROLL
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

function initParallax() {
    const hero = document.querySelector('.hero-section');
    const heroContent = document.querySelector('.hero-content');
    const heroGlows = document.querySelectorAll('.hero-glow');

    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const windowHeight = window.innerHeight;

        // Solo aplicar parallax cuando el hero está visible
        if (scrolled < windowHeight) {
            // Parallax solo en elementos internos, no en toda la sección
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                heroContent.style.opacity = 1 - (scrolled / windowHeight) * 0.5;
            }

            // Parallax más sutil en los glows
            heroGlows.forEach((glow, index) => {
                const speed = index === 0 ? 0.2 : 0.15;
                glow.style.transform = `translateY(${scrolled * speed}px)`;
            });
        }
    });
}

// ============================================
// ANIMACIONES Y EFECTOS
// ============================================
function hideLoading() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (!loadingOverlay) return;

    setTimeout(() => {
        loadingOverlay.classList.add('hidden');
    }, CONFIG.loadingDuration);
}

// Timeout de seguridad: ocultar loading después de 5 segundos máximo
setTimeout(() => {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay && !loadingOverlay.classList.contains('hidden')) {
        console.warn('Timeout de seguridad: ocultando loading después de 5 segundos');
        loadingOverlay.classList.add('hidden');
    }
}, 5000);

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar todas las cards
    document.querySelectorAll('.tshirt-card').forEach(card => {
        observer.observe(card);
    });

    // Observar secciones
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

function createParticles() {
    const particlesContainer = document.querySelector('.hero-particles');
    if (!particlesContainer) return;

    // Reducir número de partículas para mejor rendimiento
    const particleCount = window.innerWidth < 768 ? 25 : 35;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 3 + 1;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        particle.style.animation = `float ${duration}s ease-in-out infinite`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.opacity = Math.random() * 0.5 + 0.2;

        particlesContainer.appendChild(particle);
    }
}

// ============================================
// WHATSAPP BUTTON
// ============================================
function initWhatsAppButton() {
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    if (!whatsappBtn) return;

    // Actualizar el href con el número configurado
    const currentHref = whatsappBtn.getAttribute('href');
    if (currentHref) {
        // Reemplazar cualquier número en el href con el número configurado
        const newHref = currentHref.replace(/wa\.me\/\d+/, `wa.me/${CONFIG.whatsappNumber}`);
        whatsappBtn.setAttribute('href', newHref);
    } else {
        // Si no hay href, crear uno nuevo
        const message = encodeURIComponent('Hola, me interesa conocer más sobre Noise');
        whatsappBtn.setAttribute('href', `https://wa.me/${CONFIG.whatsappNumber}?text=${message}`);
    }

    // Efecto de hover mejorado
    whatsappBtn.addEventListener('mouseenter', function () {
        this.style.transform = 'scale(1.15) rotate(5deg)';
    });

    whatsappBtn.addEventListener('mouseleave', function () {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
}

// ============================================
// UTILIDADES
// ============================================
function handleImageErrors() {
    document.addEventListener('error', (e) => {
        if (e.target.tagName === 'IMG' && e.target.classList.contains('tshirt-image')) {
            // Si es una imagen de camiseta, ocultar toda la card
            const card = e.target.closest('.tshirt-card');
            if (card) {
                card.style.display = 'none';
                card.style.visibility = 'hidden';
                card.style.opacity = '0';
                card.style.height = '0';
                card.style.margin = '0';
                card.style.padding = '0';
            }
        }
    }, true);
}

function updateWhatsAppNumber(phoneNumber) {
    if (!phoneNumber) return;

    CONFIG.whatsappNumber = phoneNumber;

    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    whatsappLinks.forEach(link => {
        const currentHref = link.getAttribute('href');
        const newHref = currentHref.replace(/wa\.me\/\d+/, `wa.me/${phoneNumber}`);
        link.setAttribute('href', newHref);
    });
}

// ============================================
// SISTEMA DE FAVORITOS
// ============================================
function toggleFavorite(index, size = null) {
    const existingIndex = favorites.findIndex(item => item.index === index);

    if (existingIndex > -1) {
        // Si ya existe, lo quitamos (sin importar la talla, para simplificar UX de toggle)
        favorites.splice(existingIndex, 1);
    } else {
        // Si no existe, lo agregamos con la talla seleccionada
        favorites.push({ index, size });
    }

    localStorage.setItem('noiseFavorites', JSON.stringify(favorites));
    updateFavoritesUI();
    updateFavoriteButton(index);
}

function updateFavoriteButton(index) {
    const card = document.querySelector(`[data-index="${index}"]`);
    if (!card) return;
    const favoriteBtn = card.querySelector('.favorite-btn');
    if (!favoriteBtn) return;

    const isFavorite = favorites.some(item => item.index === index);

    if (isFavorite) {
        favoriteBtn.classList.add('active');
        favoriteBtn.innerHTML = '<i class="fas fa-heart"></i>';
    } else {
        favoriteBtn.classList.remove('active');
        favoriteBtn.innerHTML = '<i class="far fa-heart"></i>';
    }
}

function updateFavoritesUI() {
    const favoritesCount = document.getElementById('favoritesCount');
    if (favoritesCount) {
        favoritesCount.textContent = favorites.length;
        favoritesCount.style.display = favorites.length > 0 ? 'flex' : 'none';
    }
    renderFavoritesSidebar();
}

function renderFavoritesSidebar() {
    const favoritesContent = document.getElementById('favoritesContent');
    if (!favoritesContent) return;

    if (favorites.length === 0) {
        favoritesContent.innerHTML = '<p class="empty-favorites">No tienes favoritos aún</p>';
        return;
    }

    const itemsHTML = favorites.map(item => {
        const index = item.index;
        const size = item.size;
        const currentQuotes = getTshirtQuotes();
        const currentImages = getTshirtImages();
        const title = currentQuotes[index] || `Noise T-Shirt ${index + 1}`;
        const imagePath = currentImages[index];

        const sizeText = size ? `<span class="favorite-size">Talla: ${size}</span>` : '';

        return `
            <div class="favorite-item">
                <div class="favorite-item-image">
                    <img src="${imagePath}" alt="${title}">
                </div>
                <div class="favorite-item-info">
                    <h4>${title}</h4>
                    ${sizeText}
                    <button class="favorite-item-remove" onclick="removeFromFavorites(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');

    const buyButtonHTML = `
        <div class="favorites-actions">
            <button class="favorites-buy-btn" onclick="buyFavorites()">
                <i class="fab fa-whatsapp"></i> Comprar por WhatsApp
            </button>
        </div>
    `;

    favoritesContent.innerHTML = itemsHTML + buyButtonHTML;
}

function removeFromFavorites(index) {
    const existingIndex = favorites.findIndex(item => item.index === index);
    if (existingIndex > -1) {
        favorites.splice(existingIndex, 1);
        localStorage.setItem('noiseFavorites', JSON.stringify(favorites));
        updateFavoritesUI();
        updateFavoriteButton(index);
    }
}

function buyFavorites() {
    if (favorites.length === 0) return;

    const currentQuotes = getTshirtQuotes();
    let messageText = "Hola, quiero comprar estos favoritos:\n\n";

    favorites.forEach(item => {
        const title = currentQuotes[item.index] || `Noise T-Shirt ${item.index + 1}`;
        const sizeInfo = item.size ? ` (Talla: ${item.size})` : '';
        messageText += `- ${title}${sizeInfo}\n`;
    });

    const message = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
}

// Hacer función global para uso en HTML
window.removeFromFavorites = removeFromFavorites;
window.buyFavorites = buyFavorites;

// ============================================
// SISTEMA DE FILTROS
// ============================================
function generateRandomCamisetasOrder(forceReset = true) {
    const productList = getProducts();
    camisetasRandomOrder = productList
        .map((product, index) => ({ index, type: product.type }))
        .filter(item => item.type === 'camisetas')
        .map(item => item.index);

    for (let i = camisetasRandomOrder.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [camisetasRandomOrder[i], camisetasRandomOrder[j]] = [camisetasRandomOrder[j], camisetasRandomOrder[i]];
    }

    const total = camisetasRandomOrder.length;
    if (forceReset) {
        camisetasDisplayLimit = Math.min(MAX_RANDOM_CAMISETAS, total);
    } else {
        camisetasDisplayLimit = Math.min(camisetasDisplayLimit, total);
    }
}

function initLoadMoreButton() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (!loadMoreBtn) return;

    loadMoreBtn.addEventListener('click', () => {
        camisetasDisplayLimit = camisetasRandomOrder.length;
        applyFilters();
    });
}

function updateLoadMoreButtonState() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (!loadMoreBtn) return;

    const shouldShow = currentTypeFilter === 'camisetas'
        && currentCategoryFilter === 'all'
        && camisetasRandomOrder.length > camisetasDisplayLimit;

    if (shouldShow) {
        loadMoreBtn.style.display = 'inline-flex';
        loadMoreBtn.disabled = false;
    } else {
        loadMoreBtn.style.display = 'none';
        loadMoreBtn.disabled = true;
    }
}

function updateCategoryNotice() {
    const notice = document.getElementById('categoryNotice');
    if (!notice) return;

    const noticeText = CATEGORY_NOTICES[currentCategoryFilter];
    const shouldShow = currentTypeFilter === 'camisetas' && noticeText;

    if (shouldShow) {
        notice.innerHTML = `<strong>${noticeText}</strong>`;
        notice.classList.add('show');
    } else {
        notice.innerHTML = '';
        notice.classList.remove('show');
    }
}

// ============================================
// SISTEMA DE FILTROS
// ============================================
let currentTypeFilter = 'camisetas';
let currentCategoryFilter = 'all';

function initFilters() {
    // 1. Filtros Principales (Tipo)
    const mainFilterButtons = document.querySelectorAll('.main-filter-btn');
    mainFilterButtons.forEach(btn => {
        // Clonar para limpiar listeners
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
    });

    const newMainButtons = document.querySelectorAll('.main-filter-btn');
    newMainButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // UI Update
            newMainButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Logic Update
            currentTypeFilter = btn.dataset.type;
            currentCategoryFilter = 'all'; // Reset subfilter when changing type

            // Mostrar/Ocultar subfiltros
            const subFiltersContainer = document.getElementById('subFiltersContainer');
            if (currentTypeFilter === 'camisetas') {
                subFiltersContainer.classList.add('visible');
                // Resetear UI de subfiltros
                const subButtons = document.querySelectorAll('.sub-filters .filter-btn');
                subButtons.forEach(b => b.classList.remove('active'));
                const allBtn = document.querySelector('.sub-filters .filter-btn[data-filter="all"]');
                if (allBtn) allBtn.classList.add('active');
            } else {
                subFiltersContainer.classList.remove('visible');
            }

            applyFilters();
        });
    });

    // 2. Subfiltros (Categoría)
    const subFilterButtons = document.querySelectorAll('.sub-filters .filter-btn');
    subFilterButtons.forEach(btn => {
        // Clonar para limpiar listeners
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
    });

    const newSubButtons = document.querySelectorAll('.sub-filters .filter-btn');
    newSubButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // UI Update
            newSubButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Logic Update
            currentCategoryFilter = btn.dataset.filter;

            applyFilters();
        });
    });

    // Inicializar estado: mostrar subfiltros si estamos en camisetas
    const subFiltersContainer = document.getElementById('subFiltersContainer');
    if (currentTypeFilter === 'camisetas' && subFiltersContainer) {
        subFiltersContainer.classList.add('visible');
    }
}

// Hacer función global para que products.js pueda usarla
window.initFilters = initFilters;

function applyFilters() {
    const cards = document.querySelectorAll('.tshirt-card');
    const grid = document.getElementById('productGrid');
    const isAllCamisetas = currentTypeFilter === 'camisetas' && currentCategoryFilter === 'all';
    const allowedRandomIndexes = new Set();

    if (isAllCamisetas) {
        if (camisetasRandomOrder.length === 0) {
            generateRandomCamisetasOrder();
        } else {
            camisetasDisplayLimit = Math.min(camisetasDisplayLimit, camisetasRandomOrder.length);
        }

        camisetasRandomOrder.forEach((productIndex, orderPosition) => {
            const card = grid?.querySelector(`.tshirt-card[data-index="${productIndex}"]`);
            if (card) {
                card.style.order = orderPosition;
            }
        });

        camisetasRandomOrder
            .slice(0, Math.min(camisetasDisplayLimit, camisetasRandomOrder.length))
            .forEach(idx => allowedRandomIndexes.add(String(idx)));
    }

    let visibleCount = 0;

    cards.forEach(card => {
        const typeMatch = card.dataset.type === currentTypeFilter;
        const categoryMatch = currentCategoryFilter === 'all' || card.dataset.category === currentCategoryFilter;
        let shouldDisplay = typeMatch && (currentTypeFilter !== 'camisetas' || categoryMatch);

        if (isAllCamisetas) {
            shouldDisplay = typeMatch && allowedRandomIndexes.has(card.dataset.index);
        }

        if (shouldDisplay) {
            card.style.display = '';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 10);
            visibleCount++;
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });

    // Mensaje si no hay productos (ej: Gorras)
    const existingMsg = document.getElementById('no-products-msg');
    if (existingMsg) existingMsg.remove();

    if (visibleCount === 0) {
        const msg = document.createElement('div');
        msg.id = 'no-products-msg';
        msg.style.gridColumn = '1 / -1';
        msg.style.textAlign = 'center';
        msg.style.padding = '4rem';
        msg.style.color = 'var(--text-gray)';
        msg.innerHTML = `
            <i class="fas fa-box-open" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
            <p>Próximamente nuevos productos en esta categoría.</p>
        `;
        grid.appendChild(msg);
    }

    updateLoadMoreButtonState();
    updateCategoryNotice();
}

// Deprecated: Mantener por compatibilidad si algo externo lo llama
function filterProducts(category) {
    console.warn('filterProducts is deprecated. Use applyFilters instead.');
    currentCategoryFilter = category;
    applyFilters();
}

// ============================================
// SISTEMA DE BÚSQUEDA
// ============================================
function initSearch() {
    const searchToggle = document.getElementById('searchToggle');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchClose = document.getElementById('searchClose');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    if (!searchToggle || !searchOverlay) return;

    searchToggle.addEventListener('click', () => {
        searchOverlay.classList.add('active');
        setTimeout(() => searchInput?.focus(), 100);
    });

    searchClose?.addEventListener('click', () => {
        searchOverlay.classList.remove('active');
        searchInput.value = '';
        searchResults.innerHTML = '';
    });

    searchOverlay.addEventListener('click', (e) => {
        if (e.target === searchOverlay) {
            searchOverlay.classList.remove('active');
            searchInput.value = '';
            searchResults.innerHTML = '';
        }
    });

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            if (query.length < 2) {
                searchResults.innerHTML = '';
                return;
            }
            performSearch(query);
        });

        // Cerrar con ESC
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                searchOverlay.classList.remove('active');
                searchInput.value = '';
                searchResults.innerHTML = '';
            }
        });
    }
}

function performSearch(query) {
    const searchResults = document.getElementById('searchResults');
    if (!searchResults) return;

    const currentProducts = getProducts();
    const results = [];
    currentProducts.forEach((product, index) => {
        const titleMatch = product.title.toLowerCase().includes(query);
        const descMatch = product.description.toLowerCase().includes(query);
        if (titleMatch || descMatch) {
            results.push({ index, title: product.title, description: product.description, image: product.image });
        }
    });

    if (results.length === 0) {
        searchResults.innerHTML = '<p style="text-align: center; color: var(--text-gray); padding: 2rem;">No se encontraron resultados</p>';
        return;
    }

    searchResults.innerHTML = results.map(result => `
        <div class="search-result-item" onclick="openQuickView(${result.index}); document.getElementById('searchOverlay').classList.remove('active');">
            <div style="display: flex; gap: 1rem; align-items: center;">
                <img src="${result.image}" alt="${result.title}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
                <div>
                    <h4 style="margin-bottom: 0.25rem;">${result.title}</h4>
                    <p style="color: var(--text-gray); font-size: 0.9rem;">${result.description}</p>
                </div>
            </div>
        </div>
    `).join('');
}

// ============================================
// VISTA RÁPIDA (QUICK VIEW)
// ============================================
function openQuickView(index) {
    const modal = document.getElementById('quickViewModal');
    const modalBody = document.getElementById('modalBody');
    if (!modal || !modalBody) return;

    const currentProducts = getProducts();
    const currentImages = getTshirtImages();
    const product = currentProducts[index] || {
        title: `Noise T-Shirt ${index + 1}`,
        description: 'Diseño único de Noise',
        image: currentImages[index] || '',
        category: 'empoderamiento'
    };

    const title = product.title;
    const description = product.description;
    const imagePath = product.image;
    const category = product.category;

    // Determinar si es un producto que no requiere tallas (como tote bags)
    const noSizes = category === 'tote-bags';

    // Generar HTML del selector de tallas solo si es necesario
    const sizesHTML = noSizes ? '' : `
        <div class="modal-sizes">
            <h3>Talla</h3>
            <div class="size-options">
                <button class="size-btn" data-size="S">S</button>
                <button class="size-btn" data-size="M">M</button>
                <button class="size-btn selected" data-size="L">L</button>
                <button class="size-btn" data-size="XL">XL</button>
            </div>
        </div>
    `;

    // Generar HTML del selector de precios/calidad (solo para camisetas)
    const isTshirt = !noSizes && category !== 'gorras';
    const isGorra = category === 'gorras';
    const isToteBag = category === 'tote-bags';

    const pricingHTML = isTshirt ? `
        <div class="modal-pricing">
            <h3>Calidad & Fit</h3>
            <div class="pricing-options">
                <div class="pricing-group">
                    <h4>🧵 Classic</h4>
                    <button class="pricing-btn" data-quality="Classic - Algodón 160g" data-price="42k">
                        <span class="pricing-desc">Algodón 160g</span>
                        <span class="pricing-value">42k</span>
                    </button>
                </div>
                
                <div class="pricing-group">
                    <h4>🔥 Streetwear</h4>
                    <button class="pricing-btn selected" data-quality="Streetwear - Regular 230g" data-price="50k">
                        <span class="pricing-desc">Regular 230g</span>
                        <span class="pricing-value">50k</span>
                    </button>
                    <button class="pricing-btn" data-quality="Streetwear - Oversized 230g" data-price="55k">
                        <span class="pricing-desc">Oversized 230g</span>
                        <span class="pricing-value">55k</span>
                    </button>
                    <button class="pricing-btn" data-quality="Streetwear - Boxy Fit 230g" data-price="58k">
                        <span class="pricing-desc">Boxy Fit 230g</span>
                        <span class="pricing-value">58k</span>
                    </button>
                </div>

                <div class="pricing-group">
                    <h4>✨ Premium</h4>
                    <button class="pricing-btn" data-quality="Premium - Algodón Peruano 300g" data-price="80k">
                        <span class="pricing-desc">Algodón Peruano 300g</span>
                        <span class="pricing-value">80k</span>
                    </button>
                </div>
            </div>
        </div>
    ` : '';

    // Selector para Tote Bags
    const toteBagHTML = isToteBag ? `
        <div class="modal-pricing">
            <h3>Estilo & Color</h3>
            <div class="pricing-options">
                <div class="pricing-group">
                    <h4>🧵 Daily Tote</h4>
                    <button class="pricing-btn selected" data-quality="Daily Tote - Marfil" data-price="38k">
                        <span class="pricing-desc">Color Marfil - 100% Algodón (40x34cm)</span>
                        <span class="pricing-value">38k</span>
                    </button>
                </div>
                
                <div class="pricing-group">
                    <h4>🖤 Street Tote</h4>
                    <button class="pricing-btn" data-quality="Street Tote - Negro" data-price="38k">
                        <span class="pricing-desc">Color Negro - Dril Resistente (40x34cm)</span>
                        <span class="pricing-value">38k</span>
                    </button>
                </div>
            </div>
        </div>
    ` : '';

    // Determinar etiqueta y precio inicial
    let priceLabel = 'Precio:';
    let initialPrice = 'Consultar precio';

    if (isTshirt) {
        priceLabel = 'Precio elegido:';
        initialPrice = '50k';
    } else if (isGorra) {
        initialPrice = '30k';
    } else if (isToteBag) {
        initialPrice = '38k';
    }

    modalBody.innerHTML = `
        <div class="modal-image">
            <img src="${imagePath}" alt="${title}">
        </div>
        <div class="modal-info">
            <h2>${title}</h2>
            <p class="modal-description" style="color: var(--text-gray); margin: 1rem 0; line-height: 1.6;">${description}</p>
            <p class="modal-price" id="modalPriceDisplay"><span style="font-size: 0.9em; color: var(--text-gray); font-weight: 400;">${priceLabel}</span> ${initialPrice}</p>
            ${sizesHTML}
            ${pricingHTML}
            ${toteBagHTML}
            <div class="modal-actions">
                <button class="modal-action-btn primary" id="whatsappBtn">
                    COMPRAR POR WHATSAPP <i class="fab fa-whatsapp" style="margin-left: 8px;"></i>
                </button>
                <button class="modal-action-btn secondary" id="modalFavoriteBtn">
                    <i class="${favorites.some(item => item.index === index) ? 'fas' : 'far'} fa-heart"></i> ${favorites.some(item => item.index === index) ? 'En Favoritos' : 'Agregar a Favoritos'}
                </button>
            </div>
        </div>
    `;

    // Lógica para selector de precios (Camisetas y Tote Bags)
    if (isTshirt || isToteBag) {
        const pricingButtons = modalBody.querySelectorAll('.pricing-btn');
        const priceDisplay = modalBody.querySelector('#modalPriceDisplay');

        pricingButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                pricingButtons.forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');

                // Actualizar precio visualmente
                if (priceDisplay) {
                    // Mantener el label si es camiseta
                    const label = isTshirt ? '<span style="font-size: 0.9em; color: var(--text-gray); font-weight: 400;">Precio elegido:</span> ' : '<span style="font-size: 0.9em; color: var(--text-gray); font-weight: 400;">Precio:</span> ';
                    priceDisplay.innerHTML = `${label}${btn.dataset.price}`;

                    // Animación simple de cambio
                    priceDisplay.style.transform = 'scale(1.05)';
                    priceDisplay.style.color = '#fff';
                    setTimeout(() => {
                        priceDisplay.style.transform = 'scale(1)';
                        priceDisplay.style.color = 'var(--accent-white)'; // Volver al color original del precio
                    }, 200);
                }
            });
        });
    }

    // Configurar botón de WhatsApp
    const whatsappBtn = modalBody.querySelector('#whatsappBtn');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', () => {
            let selectedSize = null;
            let selectedQuality = null;
            let selectedPrice = null;

            if (!noSizes) {
                const selectedBtn = modalBody.querySelector('.size-btn.selected');
                if (selectedBtn) {
                    selectedSize = selectedBtn.dataset.size;
                }
            }

            if (isTshirt || isToteBag) {
                const selectedPricingBtn = modalBody.querySelector('.pricing-btn.selected');
                if (selectedPricingBtn) {
                    selectedQuality = selectedPricingBtn.dataset.quality;
                    selectedPrice = selectedPricingBtn.dataset.price;
                }
            } else if (isGorra) {
                selectedPrice = '30k';
            }

            openWhatsApp(title, selectedSize, selectedQuality, selectedPrice);
            closeQuickView();
        });
    }

    // Inicializar selector de tallas solo si existe
    if (!noSizes) {
        const sizeButtons = modalBody.querySelectorAll('.size-btn');
        sizeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                sizeButtons.forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
            });
        });
    }

    // Configurar botón de favoritos
    const favoriteBtn = modalBody.querySelector('#modalFavoriteBtn');
    if (favoriteBtn) {
        // Remover cualquier listener anterior
        const newFavoriteBtn = favoriteBtn.cloneNode(true);
        favoriteBtn.parentNode.replaceChild(newFavoriteBtn, favoriteBtn);

        // Agregar nuevo listener
        newFavoriteBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            let selectedSize = null;
            if (!noSizes) {
                const selectedBtn = modalBody.querySelector('.size-btn.selected');
                if (selectedBtn) {
                    selectedSize = selectedBtn.dataset.size;
                }
            }

            // Toggle favorite con talla
            toggleFavorite(index, selectedSize);

            // Actualizar el botón del modal después de que favorites se actualice
            setTimeout(() => {
                const isFavorite = favorites.some(item => item.index === index);
                newFavoriteBtn.innerHTML = `<i class="${isFavorite ? 'fas' : 'far'} fa-heart"></i> ${isFavorite ? 'En Favoritos' : 'Agregar a Favoritos'}`;
            }, 0);
        });
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeQuickView() {
    const modal = document.getElementById('quickViewModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Hacer funciones globales
window.openQuickView = openQuickView;
window.closeQuickView = closeQuickView;
window.toggleFavorite = toggleFavorite;

// ============================================
// NEWSLETTER POPUP
// ============================================
function initNewsletterPopup() {
    // Mostrar popup después de 3 segundos si no se ha cerrado antes
    const popupShown = localStorage.getItem('newsletterPopupShown');
    if (!popupShown) {
        setTimeout(() => {
            const popup = document.getElementById('newsletterPopup');
            if (popup) {
                popup.classList.add('active');
            }
        }, 3000);
    }

    const popup = document.getElementById('newsletterPopup');
    const popupClose = document.getElementById('popupClose');
    const newsletterForm = document.getElementById('newsletterForm');

    if (popupClose) {
        popupClose.addEventListener('click', () => {
            popup.classList.remove('active');
            localStorage.setItem('newsletterPopupShown', 'true');
        });
    }

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            // Aquí puedes añadir lógica para enviar el email a tu servicio
            alert(`¡Gracias por suscribirte! Te enviaremos ofertas exclusivas a ${email}`);
            popup.classList.remove('active');
            localStorage.setItem('newsletterPopupShown', 'true');
            newsletterForm.reset();
        });
    }

    // Cerrar al hacer clic fuera
    if (popup) {
        popup.addEventListener('click', (e) => {
            if (e.target === popup || e.target.classList.contains('newsletter-popup')) {
                popup.classList.remove('active');
                localStorage.setItem('newsletterPopupShown', 'true');
            }
        });
    }
}

// ============================================
// FAVORITES SIDEBAR
// ============================================
function initFavoritesSidebar() {
    const favoritesToggle = document.getElementById('favoritesToggle');
    const favoritesSidebar = document.getElementById('favoritesSidebar');
    const sidebarClose = document.getElementById('sidebarClose');

    if (!favoritesToggle || !favoritesSidebar) return;

    favoritesToggle.addEventListener('click', () => {
        favoritesSidebar.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    if (sidebarClose) {
        sidebarClose.addEventListener('click', () => {
            favoritesSidebar.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Cerrar al hacer clic fuera
    favoritesSidebar.addEventListener('click', (e) => {
        if (e.target === favoritesSidebar) {
            favoritesSidebar.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ============================================
// MENÚ MÓVIL
// ============================================
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');

    if (!mobileMenuToggle || !navLinks) return;

    // Toggle del menú
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Cerrar menú al hacer clic en un enlace
    const navLinkElements = navLinks.querySelectorAll('.nav-link');
    navLinkElements.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') &&
            !navLinks.contains(e.target) &&
            !mobileMenuToggle.contains(e.target)) {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Cerrar menú con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ============================================
// SCROLL TO TOP BUTTON
// ============================================
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (!scrollTopBtn) return;

    // Mostrar/ocultar botón según la posición del scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    // Funcionalidad de scroll suave a la sección de productos
    scrollTopBtn.addEventListener('click', () => {
        const productosSection = document.getElementById('productos');
        if (productosSection) {
            const headerOffset = 80;
            const elementPosition = productosSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        } else {
            // Fallback: scroll al inicio si no encuentra la sección
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
}

// ============================================
// LOOKBOOK
// ============================================
function initLookbook() {
    const lookbookGrid = document.getElementById('lookbookGrid');
    if (!lookbookGrid) return;

    // Rutas de imágenes del lookbook
    const lookbookImages = [
        'assets/lookbook/foto1.png',
        'assets/lookbook/foto2.png',
    ];

    // Si no hay imágenes, mostrar placeholder
    if (lookbookImages.length === 0) {
        lookbookGrid.innerHTML = `
            <div class="lookbook-placeholder">
                <i class="fas fa-camera"></i>
                <h3>Próximamente: Fotos de la comunidad Noise</h3>
                <p>Comparte tus looks con nosotros usando #NoiseStyle</p>
                <p style="margin-top: 1rem; font-size: 0.9rem; opacity: 0.7;">
                    Para agregar fotos al lookbook, crea la carpeta <code>assets/lookbook/</code> y agrega las rutas en <code>js/script.js</code>
                </p>
            </div>
        `;
        return;
    }

    // Si hay imágenes, cargarlas
    lookbookGrid.innerHTML = '';
    lookbookImages.forEach((imagePath, index) => {
        const lookbookItem = document.createElement('div');
        lookbookItem.className = 'lookbook-item';
        lookbookItem.style.opacity = '0';
        lookbookItem.style.transform = 'translateY(30px)';
        lookbookItem.style.cursor = 'pointer';

        const img = document.createElement('img');
        img.src = imagePath;
        img.alt = `Lookbook Noise ${index + 1}`;
        img.loading = 'lazy';
        img.decoding = 'async';

        // Manejo de errores
        img.onerror = function () {
            lookbookItem.style.display = 'none';
        };

        // Agregar evento click para abrir modal
        lookbookItem.addEventListener('click', () => {
            openLookbookModal(imagePath, index);
        });

        lookbookItem.appendChild(img);
        lookbookGrid.appendChild(lookbookItem);

        // Animación de aparición
        setTimeout(() => {
            lookbookItem.style.transition = 'all 0.6s ease';
            lookbookItem.style.opacity = '1';
            lookbookItem.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Función para abrir modal del lookbook
function openLookbookModal(imagePath, index) {
    // Crear o obtener el modal
    let modal = document.getElementById('lookbookModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'lookbookModal';
        modal.className = 'lookbook-modal';
        document.body.appendChild(modal);
    }

    modal.innerHTML = `
        <div class="lookbook-modal-overlay"></div>
        <div class="lookbook-modal-content">
            <button class="lookbook-modal-close" aria-label="Cerrar">
                <i class="fas fa-times"></i>
            </button>
            <div class="lookbook-modal-image-container">
                <img src="${imagePath}" alt="Lookbook Noise ${index + 1}" class="lookbook-modal-image">
            </div>
        </div>
    `;

    // Mostrar modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Cerrar al hacer clic en overlay o botón cerrar
    const overlay = modal.querySelector('.lookbook-modal-overlay');
    const closeBtn = modal.querySelector('.lookbook-modal-close');

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    overlay.addEventListener('click', closeModal);
    closeBtn.addEventListener('click', closeModal);

    // Cerrar con ESC
    const handleEsc = (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
            document.removeEventListener('keydown', handleEsc);
        }
    };
    document.addEventListener('keydown', handleEsc);
}

// ============================================
// INICIALIZACIÓN
// ============================================
function init() {
    console.log('🚀 Iniciando aplicación Noise...');
    console.log('Productos disponibles:', window.products?.length || 0);
    console.log('Imágenes disponibles:', window.tshirtImages?.length || 0);

    try {
        // Esperar un momento para asegurar que products.js cargó
        if (!window.products || window.products.length === 0) {
            console.warn('⚠️ Esperando productos...');
            setTimeout(() => {
                if (window.products && window.products.length > 0) {
                    console.log('✅ Productos cargados, reintentando...');
                    loadTshirts();
                } else {
                    console.error('❌ Productos aún no disponibles después del delay');
                }
            }, 500);
        } else {
            // Cargar productos
            loadTshirts();
        }

        // Inicializar navegación
        initSmoothScroll();
        initHeaderScroll();
        initMobileMenu();

        // Inicializar nuevas funcionalidades
        initFilters();
        initLoadMoreButton();
        initSearch();
        initFavoritesSidebar();
        // initNewsletterPopup(); // Oculto temporalmente
        updateFavoritesUI();

        // Inicializar efectos
        initParallax();
        createParticles();

        // Inicializar lookbook
        initLookbook();
    } catch (error) {
        console.error('❌ Error en init():', error);
    } finally {
        // Siempre ocultar loading, incluso si hay errores
        hideLoading();
    }

    // Inicializar animaciones después de un delay
    setTimeout(() => {
        initScrollAnimations();
    }, 500);

    // Inicializar botón de WhatsApp
    initWhatsAppButton();

    // Inicializar botón de scroll to top
    initScrollToTop();

    // Manejo de errores
    handleImageErrors();

    // Cerrar modales con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeQuickView();
            const searchOverlay = document.getElementById('searchOverlay');
            if (searchOverlay?.classList.contains('active')) {
                searchOverlay.classList.remove('active');
            }
            const favoritesSidebar = document.getElementById('favoritesSidebar');
            if (favoritesSidebar?.classList.contains('active')) {
                favoritesSidebar.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });

    // Cerrar modal al hacer clic en overlay
    const modalOverlay = document.getElementById('modalOverlay');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeQuickView);
    }

    const modalClose = document.getElementById('modalClose');
    if (modalClose) {
        modalClose.addEventListener('click', closeQuickView);
    }

    console.log('🚀 Noise website initialized successfully!');
}

// ============================================
// EVENT LISTENERS
// ============================================
document.addEventListener('DOMContentLoaded', init);

// Lazy loading mejorado
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Exportar funciones para uso global si es necesario
window.NoiseApp = {
    updateWhatsAppNumber,
    openWhatsApp,
    CONFIG
};

