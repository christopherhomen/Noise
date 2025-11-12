// ============================================
// CONFIGURACIÓN
// ============================================
const CONFIG = {
    whatsappNumber: '573164212929', // Número de WhatsApp
    animationDelay: 50, // Delay entre animaciones de cards (ms)
    loadingDuration: 1200, // Duración del loading (ms)
    parallaxSpeed: 0.5 // Velocidad del efecto parallax
};

// ============================================
// DATOS DE PRODUCTOS
// ============================================
const tshirtImages = [
    'assets/img/EA811981-C504-4043-A0A9-37ED975442ED.jpg',
    'assets/img/Photoroom_20251112_141341.jpg',
    'assets/img/Photoroom_20251112_141430.jpg',
    'assets/img/Photoroom_20251112_141648.jpg',
    'assets/img/Photoroom_20251112_141711.jpg',
    'assets/img/Photoroom_20251112_141825.jpg',
    'assets/img/Photoroom_20251112_142153.jpg',
    'assets/img/Photoroom_20251112_142242.jpg',
    'assets/img/Photoroom_20251112_142303.jpg',
    'assets/img/Photoroom_20251112_142330.jpg',
    'assets/img/Photoroom_20251112_142354.jpg',
    'assets/img/Photoroom_20251112_142414.jpg',
    'assets/img/Photoroom_20251112_142441.jpg',
    'assets/img/Photoroom_20251112_142502.jpg',
    'assets/img/Photoroom_20251112_142521.jpg',
    'assets/img/Photoroom_20251112_142544.jpg',
    'assets/img/Photoroom_20251112_142605.jpg',
    'assets/img/Photoroom_20251112_142625.jpg',
    'assets/img/Photoroom_20251112_142647.jpg',
    'assets/img/Photoroom_20251112_142711.jpg',
    'assets/img/Photoroom_20251112_142840.jpg',
    'assets/img/Photoroom_20251112_142909.jpg',
    'assets/img/Photoroom_20251112_143137.jpg',
    'assets/img/Photoroom_20251112_143157.jpg',
    'assets/img/Photoroom_20251112_143205.jpg',
    'assets/img/Photoroom_20251112_143219.png'
];

const tshirtQuotes = [
    "Be Yourself",
    "Stranger Things",
    "You Are Enough",
    "Live Your Truth",
    "Stay Weird",
    "Be Bold",
    "Own Your Story",
    "No Limits",
    "Be Free",
    "Stay Strong",
    "Be Authentic",
    "Dream Big",
    "Stay True",
    "Be Unique",
    "Own It",
    "Stay Wild",
    "Be Fearless",
    "Stay Real",
    "Be Proud",
    "Stay You",
    "Be Different",
    "Stay Strong",
    "Be Brave",
    "Stay Cool",
    "Be Amazing",
    "Stay Loud"
];

// ============================================
// FUNCIONES DE PRODUCTOS
// ============================================
function loadTshirts() {
    const productGrid = document.getElementById('productGrid');
    if (!productGrid) return;
    
    tshirtImages.forEach((imagePath, index) => {
        const card = createTshirtCard(imagePath, index);
        productGrid.appendChild(card);
        
        // Animación de aparición con delay
        setTimeout(() => {
            card.classList.add('visible');
        }, index * CONFIG.animationDelay);
    });
}

function createTshirtCard(imagePath, index) {
    // Contenedor principal
    const card = document.createElement('div');
    card.className = 'tshirt-card';
    
    // Contenedor de imagen
    const imageContainer = document.createElement('div');
    imageContainer.className = 'tshirt-image-container';
    
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
    
    const title = document.createElement('h3');
    title.className = 'tshirt-title';
    title.textContent = tshirtQuotes[index] || `Noise T-Shirt ${index + 1}`;
    
    const price = document.createElement('p');
    price.className = 'tshirt-price';
    price.textContent = 'Consultar precio';
    
    overlayContent.appendChild(title);
    overlayContent.appendChild(price);
    overlay.appendChild(overlayContent);
    
    imageContainer.appendChild(img);
    imageContainer.appendChild(overlay);
    
    // Botón de acción
    const actionBtn = document.createElement('button');
    actionBtn.className = 'tshirt-button';
    actionBtn.textContent = 'Más Info';
    actionBtn.setAttribute('aria-label', `Más información sobre ${tshirtQuotes[index]}`);
    actionBtn.onclick = () => openWhatsApp(tshirtQuotes[index] || `Noise T-Shirt ${index + 1}`);
    
    card.appendChild(imageContainer);
    card.appendChild(actionBtn);
    
    return card;
}

function openWhatsApp(productName) {
    const message = encodeURIComponent(`Hola, me interesa esta camiseta: ${productName}`);
    const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
}

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
    if (currentHref && CONFIG.whatsappNumber !== '1234567890') {
        const newHref = currentHref.replace(/wa\.me\/\d+/, `wa.me/${CONFIG.whatsappNumber}`);
        whatsappBtn.setAttribute('href', newHref);
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
    // Cargar productos
    loadTshirts();
    
    // Inicializar navegación
    initSmoothScroll();
    initHeaderScroll();
    initMobileMenu();
    
    // Inicializar efectos
    initParallax();
    createParticles();
    
    // Ocultar loading
    hideLoading();
    
    // Inicializar animaciones después de un delay
    setTimeout(() => {
        initScrollAnimations();
    }, 500);
    
    // Inicializar botón de WhatsApp
    initWhatsAppButton();
    
    // Manejo de errores
    handleImageErrors();
    
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

