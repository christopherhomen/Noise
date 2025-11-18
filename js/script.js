// ============================================
// CONFIGURACIÓN
// ============================================
const CONFIG = {
    whatsappNumber: '573164212929', // Número de WhatsApp (Colombia: 57 + 3164212929)
    animationDelay: 50, // Delay entre animaciones de cards (ms)
    loadingDuration: 1200, // Duración del loading (ms)
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

function getProductBadges() {
    return window.productBadges || [];
}

// Verificar que los productos se cargaron correctamente
const products = getProducts();
const tshirtImages = getTshirtImages();
const tshirtQuotes = getTshirtQuotes();
const productCategories = getProductCategories();
const productBadges = getProductBadges();

if (products.length === 0 && tshirtImages.length === 0) {
    console.warn('⚠️ No se encontraron productos. Verificar que products.js se cargó correctamente.');
} else {
    console.log(`✅ Productos cargados: ${products.length} productos, ${tshirtImages.length} imágenes`);
}

// Sistema de favoritos
let favorites = JSON.parse(localStorage.getItem('noiseFavorites')) || [];

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
        let cardsCreated = 0;
        currentImages.forEach((imagePath, index) => {
            try {
                const card = createTshirtCard(imagePath, index, currentQuotes[index], currentCategories[index], currentBadges[index]);
                productGrid.appendChild(card);
                cardsCreated++;
                
                // Animación de aparición con delay
                setTimeout(() => {
                    card.classList.add('visible');
                }, index * CONFIG.animationDelay);
            } catch (error) {
                console.error(`❌ Error creando card ${index} (${imagePath}):`, error);
            }
        });
        console.log(`✅ ${cardsCreated} productos cargados exitosamente`);
    } catch (error) {
        console.error('❌ Error en loadTshirts():', error);
    }
}

function createTshirtCard(imagePath, index, title, category, badge) {
    // Obtener valores actualizados si no se pasan como parámetros
    const currentQuotes = getTshirtQuotes();
    const currentCategories = getProductCategories();
    const currentBadges = getProductBadges();
    
    const productTitle = title || currentQuotes[index] || `Noise T-Shirt ${index + 1}`;
    const productCategory = category || currentCategories[index] || 'empoderamiento';
    const productBadge = badge !== undefined ? badge : currentBadges[index];
    
    // Contenedor principal
    const card = document.createElement('div');
    card.className = 'tshirt-card';
    card.dataset.category = productCategory;
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
    if (favorites.includes(index)) {
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
    img.alt = `Noise T-Shirt ${index + 1}`;
    img.className = 'tshirt-image';
    img.loading = 'lazy';
    
    // Manejo de errores de imagen - ocultar toda la card si la imagen no está disponible
    img.onerror = function() {
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

function openWhatsApp(productName) {
    const message = encodeURIComponent(`Hola, me interesa esta camiseta: ${productName}`);
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
    
    const particleCount = 50;
    
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
    whatsappBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.15) rotate(5deg)';
    });
    
    whatsappBtn.addEventListener('mouseleave', function() {
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
function toggleFavorite(index) {
    const favoriteIndex = favorites.indexOf(index);
    if (favoriteIndex > -1) {
        favorites.splice(favoriteIndex, 1);
    } else {
        favorites.push(index);
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
    
    if (favorites.includes(index)) {
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
    
    favoritesContent.innerHTML = favorites.map(index => {
        const title = tshirtQuotes[index] || `Noise T-Shirt ${index + 1}`;
        const imagePath = tshirtImages[index];
        return `
            <div class="favorite-item">
                <div class="favorite-item-image">
                    <img src="${imagePath}" alt="${title}">
                </div>
                <div class="favorite-item-info">
                    <h4>${title}</h4>
                    <button class="favorite-item-remove" onclick="removeFromFavorites(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function removeFromFavorites(index) {
    const favoriteIndex = favorites.indexOf(index);
    if (favoriteIndex > -1) {
        favorites.splice(favoriteIndex, 1);
        localStorage.setItem('noiseFavorites', JSON.stringify(favorites));
        updateFavoritesUI();
        updateFavoriteButton(index);
    }
}

// Hacer función global para uso en HTML
window.removeFromFavorites = removeFromFavorites;

// ============================================
// SISTEMA DE FILTROS
// ============================================
function initFilters() {
    // Remover listeners anteriores para evitar duplicados
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        // Clonar el botón para remover todos los listeners
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
    });
    
    // Agregar listeners a los nuevos botones
    const newFilterButtons = document.querySelectorAll('.filter-btn');
    newFilterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover active de todos
            newFilterButtons.forEach(b => b.classList.remove('active'));
            // Añadir active al clickeado
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            filterProducts(filter);
        });
    });
}

// Hacer función global para que products.js pueda usarla
window.initFilters = initFilters;

function filterProducts(category) {
    const cards = document.querySelectorAll('.tshirt-card');
    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = '';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 10);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
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
    
    const results = [];
    products.forEach((product, index) => {
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
    
    const product = products[index] || {
        title: `Noise T-Shirt ${index + 1}`,
        description: 'Diseño único de Noise',
        image: tshirtImages[index] || '',
        category: 'empoderamiento'
    };
    
    const title = product.title;
    const description = product.description;
    const imagePath = product.image;
    const category = product.category;
    
    modalBody.innerHTML = `
        <div class="modal-image">
            <img src="${imagePath}" alt="${title}">
        </div>
        <div class="modal-info">
            <h2>${title}</h2>
            <p class="modal-description" style="color: var(--text-gray); margin: 1rem 0; line-height: 1.6;">${description}</p>
            <p class="modal-price">Consultar precio</p>
            <div class="modal-sizes">
                <h3>Talla</h3>
                <div class="size-options">
                    <button class="size-btn" data-size="S">S</button>
                    <button class="size-btn" data-size="M">M</button>
                    <button class="size-btn selected" data-size="L">L</button>
                    <button class="size-btn" data-size="XL">XL</button>
                </div>
            </div>
            <div class="modal-actions">
                <button class="modal-action-btn primary" onclick="openWhatsApp('${title.replace(/'/g, "\\'")}'); closeQuickView();">
                    Consultar por WhatsApp
                </button>
                <button class="modal-action-btn secondary" onclick="toggleFavorite(${index});">
                    <i class="${favorites.includes(index) ? 'fas' : 'far'} fa-heart"></i> ${favorites.includes(index) ? 'En Favoritos' : 'Agregar a Favoritos'}
                </button>
            </div>
        </div>
    `;
    
    // Inicializar selector de tallas
    const sizeButtons = modalBody.querySelectorAll('.size-btn');
    sizeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            sizeButtons.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
        });
    });
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Actualizar botón de favoritos después de renderizar
    setTimeout(() => {
        const favoriteBtn = modalBody.querySelector('.modal-action-btn.secondary');
        if (favoriteBtn) {
            favoriteBtn.addEventListener('click', () => {
                toggleFavorite(index);
                // Actualizar el botón
                const isFavorite = favorites.includes(index);
                favoriteBtn.innerHTML = `<i class="${isFavorite ? 'fas' : 'far'} fa-heart"></i> ${isFavorite ? 'En Favoritos' : 'Agregar a Favoritos'}`;
            });
        }
    }, 100);
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
        initSearch();
        initFavoritesSidebar();
        initNewsletterPopup();
        updateFavoritesUI();
        
        // Inicializar efectos
        initParallax();
        createParticles();
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

