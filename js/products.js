// ============================================
// SISTEMA DE PRODUCTOS - GENERACIÓN AUTOMÁTICA
// ============================================
// Este sistema genera automáticamente títulos y descripciones
// basándose en los nombres de archivos y rutas

// ============================================
// CONFIGURACIÓN DE PRODUCTOS
// ============================================
// Solo necesitas agregar la ruta de la imagen aquí
// El sistema generará automáticamente título, descripción y categoría
const PRODUCT_PATHS = [
    // UNIVERSOS - Stranger Things
    'assets/img/Universos/StangerThings/Once_StrangerThings.jpg',
    'assets/img/Universos/StangerThings/Once_Premium_StrangerThings.jpg',
    'assets/img/Universos/StangerThings/Chicos_StrangerThings.jpg',
    'assets/img/Universos/StangerThings/Chicos_Luces_StrangerThings.jpg',
    'assets/img/Universos/StangerThings/Chicos_Version_2_StrangerThings.jpg',
    'assets/img/Universos/StangerThings/Chicos_Version_3_StrangerThings.jpg',
    'assets/img/Universos/StangerThings/Vecna_Chicos-Version_1_StrangerThings.jpg',
    'assets/img/Universos/StangerThings/Vecna_Chicos-Version_2_StrangerThings.jpg',
    'assets/img/Universos/StangerThings/Team_StrangerThings.jpg',
    // UNIVERSOS - House of Dragons
    'assets/img/Universos/HouseOfDragons/HouseOfDragons.jpg',
    // ANIME
    'assets/img/Anime/Goku.jpg',
    'assets/img/Anime/Sailor_Moon_1.jpg',
    'assets/img/Anime/Sailor_Moon_2.jpg',
    'assets/img/Anime/Sailor_Moon_3.jpg',
    // EMPODERAMIENTO
    'assets/img/Empoderamiento/More_Pride.png',
    'assets/img/Empoderamiento/Future_Inclusive.png',
    'assets/img/Empoderamiento/Resist_Persist.png',
    'assets/img/Empoderamiento/Soy_Fabuloso.png',
    'assets/img/Empoderamiento/Ojo_de_loca_No_Se_Equivoca.png',
    // HEROÍNAS
    'assets/img/Heroínas/Cleopatra.png',
    'assets/img/Heroínas/La_Pola.png',
    'assets/img/Heroínas/Marie_Curie.png',
    // MEMES
    'assets/img/Memes/Calamardo_Bob_Esponga.jpg',
    'assets/img/Memes/Empanada_Lover.jpg',
    'assets/img/Memes/Homero_Simpson_Sueño.jpg',
    'assets/img/Memes/No_Dormi_Bien.png',
    // COLOMBIA
    'assets/img/Colombia/Esto_Es_Colombia.png',
    'assets/img/Colombia/Hableme_Perrito.png',
    'assets/img/Colombia/LaTiNa.png',
    'assets/img/Colombia/Me_Dijo_ChatGPT.png',
    'assets/img/Colombia/Papaya_Partida.png',
    'assets/img/Colombia/Parce_Made_In_Colombia.png',
    'assets/img/Colombia/Parchese.png',
    // NOISE
    'assets/img/Noise/Noise_1.jpg',
    'assets/img/Noise/Noise_2.jpg',
    'assets/img/Noise/Noise_3.jpg',
    'assets/img/Noise/Noise_4.jpg',
    'assets/img/Noise/Noise_5.jpg',
    'assets/img/Noise/Noise_6.png',
    // TOTE BAGS
    'assets/img/Tote bags/Chicos_StrangerThings_Tote_Bag.JPG',
    'assets/img/Tote bags/Dama_Antigua.png',
    'assets/img/Tote bags/Vecna_strangerThings.png'
];

// ============================================
// DICCIONARIOS Y PATRONES PARA GENERACIÓN
// ============================================
const KEYWORDS = {
    // Personajes y referencias
    'once': { title: 'Once - El Poder de la Mente', desc: 'Representa a Eleven con su poder telequinético. La heroína que desafía las dimensiones.' },
    'chicos': { title: 'Los Chicos - El Equipo', desc: 'Mike, Dustin, Lucas y Will. La amistad que vence al Upside Down.' },
    'vecna': { title: 'Vecna - El Terror', desc: 'El villano que desafía a todos. El poder oscuro.' },
    'team': { title: 'Team Stranger Things', desc: 'Todo el equipo unido. Hawkins nunca será igual.' },
    'goku': { title: 'Goku - Super Saiyajin', desc: 'El guerrero más fuerte del universo Dragon Ball. El poder que supera límites.' },
    'sailor': { title: 'Sailor Moon - Princesa de la Luna', desc: 'La guerrera que lucha por el amor y la justicia. El poder de la luna.' },
    'cleopatra': { title: 'Cleopatra - La Reina', desc: 'La última faraona de Egipto. El poder y la inteligencia.' },
    'pola': { title: 'La Pola - Heroína Nacional', desc: 'Policarpa Salavarrieta. La valentía que cambió la historia.' },
    'marie': { title: 'Marie Curie - La Científica', desc: 'La primera mujer en ganar un Nobel. La ciencia que transforma.' },
    'calamardo': { title: 'Calamardo - El Deprimido', desc: 'El meme que todos sentimos. La vida de Calamardo.' },
    'homero': { title: 'Homero - El Sueño', desc: 'Cuando solo quieres dormir. El meme de la vida real.' },
    
    // Frases y conceptos
    'pride': { title: 'More Pride', desc: 'Más orgullo, más amor, más libertad. Celebra quién eres.' },
    'inclusive': { title: 'Future Inclusive', desc: 'El futuro es inclusivo. Un mundo donde todos pertenecemos.' },
    'resist': { title: 'Resist & Persist', desc: 'Resiste y persiste. La fuerza de la determinación.' },
    'fabuloso': { title: 'Soy Fabuloso', desc: 'Celebra tu autenticidad y orgullo. Eres fabuloso tal como eres.' },
    'ojo': { title: 'Ojo de Loca No Se Equivoca', desc: 'La intuición que nunca falla. Confía en tu instinto.' },
    'colombia': { title: 'Esto Es Colombia', desc: 'Orgullo colombiano. La tierra que nos vio nacer.' },
    'perrito': { title: 'Hábleme Perrito', desc: 'El meme que nos representa. La jerga colombiana.' },
    'latina': { title: 'La TiNa', desc: 'El orgullo latino. La identidad que nos une.' },
    'chatgpt': { title: 'Me Dijo ChatGPT', desc: 'La era de la IA. El meme del futuro.' },
    'papaya': { title: 'Papaya Partida', desc: 'El dicho colombiano. La sabiduría popular.' },
    'parce': { title: 'Parce Made In Colombia', desc: 'Hecho en Colombia con orgullo. La calidad nacional.' },
    'parchese': { title: 'Parchese', desc: 'El plan que siempre funciona. La amistad colombiana.' },
    'empanada': { title: 'Empanada Lover', desc: 'El amor por las empanadas. La pasión colombiana.' },
    'dormi': { title: 'No Dormí Bien', desc: 'El estado de ánimo de lunes a viernes. La realidad.' },
    
    // Universos
    'house': { title: 'House of Dragons', desc: 'Fuego y sangre. El poder de los Targaryen.' },
    'dragons': { title: 'House of Dragons', desc: 'Fuego y sangre. El poder de los Targaryen.' },
    
    // Noise
    'noise': { title: 'Noise Original', desc: 'El diseño que empezó todo. La esencia de Noise.' },
    
    // Tote bags
    'tote': { title: 'Tote Bag', desc: 'Lleva tu estilo contigo. El diseño en cada viaje.' },
    'bag': { title: 'Tote Bag', desc: 'Lleva tu estilo contigo. El diseño en cada viaje.' }
};

const DESCRIPTIONS = {
    'premium': 'Edición premium. El diseño exclusivo que define tu estilo.',
    'version': 'Nueva versión. La evolución del diseño.',
    'luces': 'El diseño iluminado. La esperanza en cada detalle.',
    'edicion': 'Edición especial. El diseño que marca la diferencia.',
    'dama': 'Elegancia clásica. El estilo que trasciende.',
    'antigua': 'El diseño atemporal. La elegancia de siempre.'
};

// ============================================
// FUNCIONES DE GENERACIÓN AUTOMÁTICA
// ============================================

/**
 * Extrae la categoría de la ruta del archivo
 * Detecta automáticamente nuevas carpetas
 */
function extractCategory(path) {
    const pathParts = path.split('/');
    const categoryFolder = pathParts[pathParts.length - 2] || '';
    
    // Mapeo de carpetas a categorías (con soporte para nuevas carpetas)
    const categoryMap = {
        'Universos': 'universos',
        'Anime': 'anime',
        'Empoderamiento': 'empoderamiento',
        'Heroínas': 'heroinas',
        'Memes': 'memes',
        'Colombia': 'colombia',
        'Noise': 'noise',
        'Tote bags': 'tote-bags'
    };
    
    // Si la carpeta está en el mapa, usar ese valor
    if (categoryMap[categoryFolder]) {
        return categoryMap[categoryFolder];
    }
    
    // Si no está en el mapa, generar categoría automáticamente
    // Convertir a formato slug (minúsculas, sin espacios, sin acentos)
    const autoCategory = categoryFolder
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remover acentos
        .replace(/\s+/g, '-') // Espacios a guiones
        .replace(/[^a-z0-9-]/g, ''); // Remover caracteres especiales
    
    return autoCategory || 'empoderamiento';
}

/**
 * Genera un título creativo basándose en el nombre del archivo
 */
function generateTitle(filename, path) {
    // Remover extensión
    const nameWithoutExt = filename.replace(/\.(jpg|jpeg|png|gif|webp)$/i, '');
    
    // Normalizar: reemplazar guiones y underscores con espacios
    const normalized = nameWithoutExt
        .replace(/[-_]/g, ' ')
        .replace(/([A-Z])/g, ' $1')
        .trim()
        .toLowerCase();
    
    // Buscar palabras clave
    for (const [keyword, data] of Object.entries(KEYWORDS)) {
        if (normalized.includes(keyword.toLowerCase())) {
            // Si hay variaciones (premium, version, etc.)
            if (normalized.includes('premium')) {
                return data.title.replace(' - ', ' Premium - ');
            }
            if (normalized.includes('version') || normalized.includes('version_')) {
                const versionMatch = normalized.match(/version[_\s]?(\d+)/i);
                if (versionMatch) {
                    return `${data.title} - Versión ${versionMatch[1]}`;
                }
                return `${data.title} - Versión Especial`;
            }
            if (normalized.includes('luces')) {
                return data.title.replace(' - ', ' - Luces de Navidad');
            }
            if (normalized.includes('edicion') || normalized.includes('edición')) {
                const editionMatch = normalized.match(/edicion[_\s]?(\d+)/i);
                if (editionMatch) {
                    return `${data.title} - Edición ${editionMatch[1]}`;
                }
            }
            return data.title;
        }
    }
    
    // Si no hay keyword, generar título desde el nombre
    const words = normalized.split(/\s+/).filter(w => w.length > 0);
    const titleWords = words
        .filter(w => !['stranger', 'things', 'tote', 'bag', 'jpg', 'png'].includes(w))
        .map(w => w.charAt(0).toUpperCase() + w.slice(1));
    
    if (titleWords.length > 0) {
        return titleWords.join(' ');
    }
    
    // Fallback
    return nameWithoutExt.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

/**
 * Genera una descripción creativa basándose en el nombre y categoría
 */
function generateDescription(filename, path, title) {
    const normalized = filename.toLowerCase().replace(/\.(jpg|jpeg|png|gif|webp)$/i, '');
    
    // Buscar descripción en keywords
    for (const [keyword, data] of Object.entries(KEYWORDS)) {
        if (normalized.includes(keyword.toLowerCase())) {
            let desc = data.desc;
            
            // Modificadores
            if (normalized.includes('premium')) {
                desc = desc.replace('Representa', 'Edición premium de').replace('El poder', 'El poder exclusivo');
            }
            if (normalized.includes('version') || normalized.includes('version_')) {
                desc = 'Nueva versión del diseño. La evolución que marca la diferencia.';
            }
            if (normalized.includes('luces')) {
                desc = 'El equipo iluminado. La esperanza en la oscuridad.';
            }
            if (normalized.includes('vecna') && normalized.includes('chicos')) {
                desc = 'El enfrentamiento épico. El mal contra la amistad.';
            }
            
            return desc;
        }
    }
    
    // Descripciones por categoría
    const category = extractCategory(path);
    const categoryDescriptions = {
        'universos': 'Sumérgete en el universo que amas. El diseño que conecta.',
        'anime': 'El poder del anime en tu estilo. La fuerza que inspira.',
        'empoderamiento': 'La frase que empodera. El mensaje que transforma.',
        'heroinas': 'La heroína que inspira. El poder femenino.',
        'memes': 'El meme que todos sentimos. La risa que conecta.',
        'colombia': 'El orgullo colombiano. La identidad que nos une.',
        'noise': 'El diseño que habla. La identidad Noise.',
        'tote-bags': 'Lleva tu estilo contigo. El diseño en cada viaje.'
    };
    
    return categoryDescriptions[category] || 'Diseño único de Noise. El estilo que define.';
}

/**
 * Determina el badge del producto
 */
function determineBadge(filename, path, index) {
    const normalized = filename.toLowerCase();
    
    // Nuevos productos (primeros 3 de cada categoría o con "new" en el nombre)
    if (normalized.includes('new') || normalized.includes('nuevo')) {
        return 'new';
    }
    
    // Premium o limited
    if (normalized.includes('premium') || normalized.includes('limited')) {
        return 'limited';
    }
    
    // Bestsellers (algunos productos populares)
    const bestsellers = ['once', 'goku', 'perrito', 'ojo'];
    if (bestsellers.some(bs => normalized.includes(bs))) {
        return 'bestseller';
    }
    
    // Nuevos productos (primeros de cada categoría)
    const category = extractCategory(path);
    const categoryFirstIndex = PRODUCT_PATHS.findIndex(p => extractCategory(p) === category);
    if (index === categoryFirstIndex) {
        return 'new';
    }
    
    return null;
}

// ============================================
// GENERACIÓN DE PRODUCTOS
// ============================================

/**
 * Genera el array completo de productos
 */
function generateProducts() {
    return PRODUCT_PATHS.map((path, index) => {
        const filename = path.split('/').pop();
        const category = extractCategory(path);
        const title = generateTitle(filename, path);
        const description = generateDescription(filename, path, title);
        const badge = determineBadge(filename, path, index);
        
        return {
            image: path,
            title: title,
            description: description,
            category: category,
            badge: badge
        };
    });
}

// ============================================
// DETECCIÓN AUTOMÁTICA DE CATEGORÍAS
// ============================================

/**
 * Obtiene todas las categorías únicas de los productos
 */
function getUniqueCategories(productsList) {
    const categories = [...new Set(productsList.map(p => p.category))];
    return categories.sort();
}

/**
 * Mapeo de categorías a nombres de visualización
 * Se actualiza automáticamente con nuevas categorías
 */
function getCategoryDisplayName(category) {
    const categoryNames = {
        'universos': 'Universos',
        'anime': 'Anime',
        'empoderamiento': 'Empoderamiento',
        'heroinas': 'Heroínas',
        'memes': 'Memes',
        'colombia': 'Colombia',
        'noise': 'Noise',
        'tote-bags': 'Tote Bags'
    };
    
    // Si existe en el mapa, usar ese nombre
    if (categoryNames[category]) {
        return categoryNames[category];
    }
    
    // Si no existe, generar nombre automáticamente
    // Capitalizar primera letra de cada palabra
    return category
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

/**
 * Actualiza los filtros en el HTML automáticamente
 */
function updateFilters() {
    const filtersContainer = document.querySelector('.filters-container');
    if (!filtersContainer) return;
    
    const categories = getUniqueCategories(products);
    
    // Mantener el botón "Todas"
    const allButton = filtersContainer.querySelector('[data-filter="all"]');
    const existingButtons = filtersContainer.querySelectorAll('.filter-btn:not([data-filter="all"])');
    existingButtons.forEach(btn => btn.remove());
    
    // Agregar botones de categorías
    categories.forEach(category => {
        const button = document.createElement('button');
        button.className = 'filter-btn';
        button.setAttribute('data-filter', category);
        button.innerHTML = `<span>${getCategoryDisplayName(category)}</span>`;
        filtersContainer.appendChild(button);
    });
    
    // Reinicializar los event listeners de filtros
    if (typeof window.initFilters === 'function') {
        window.initFilters();
    }
}

// ============================================
// EXPORTACIÓN
// ============================================
// Generar productos automáticamente
const products = generateProducts();

// Arrays para compatibilidad con código existente
const tshirtImages = products.map(p => p.image);
const tshirtQuotes = products.map(p => p.title);
const productCategories = products.map(p => p.category);
const productBadges = products.map(p => p.badge);

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.products = products;
    window.tshirtImages = tshirtImages;
    window.tshirtQuotes = tshirtQuotes;
    window.productCategories = productCategories;
    window.productBadges = productBadges;
    
    // Función para regenerar productos (útil si se agregan nuevos)
    window.regenerateProducts = function() {
        const newProducts = generateProducts();
        window.products = newProducts;
        window.tshirtImages = newProducts.map(p => p.image);
        window.tshirtQuotes = newProducts.map(p => p.title);
        window.productCategories = newProducts.map(p => p.category);
        window.productBadges = newProducts.map(p => p.badge);
        
        // Actualizar filtros automáticamente
        updateFilters();
        
        return newProducts;
    };
    
    // Función para actualizar filtros
    window.updateFilters = updateFilters;
    
    // Actualizar filtros cuando el DOM esté listo (con delay para asegurar que script.js ya cargó)
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(updateFilters, 200);
        });
    } else {
        // DOM ya está listo, esperar un poco más para que script.js cargue
        setTimeout(updateFilters, 300);
    }
}

// Manejo de errores global para evitar que bloqueen la carga
window.addEventListener('error', function(e) {
    console.error('Error en products.js:', e.error);
    // Asegurar que el loading se oculte incluso si hay errores
    setTimeout(() => {
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay) {
            loadingOverlay.classList.add('hidden');
        }
    }, 2000);
});


