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
    // CAMISETAS - Colombia
    'assets/img/Camisetas/Colombia/Cabello Meme.JPG',
    'assets/img/Camisetas/Colombia/Croptop chocorramo.JPG',
    'assets/img/Camisetas/Colombia/Croptop laTiNa Essential.JPG',
    'assets/img/Camisetas/Colombia/Croptop no soy monstruo.JPG',
    'assets/img/Camisetas/Colombia/hableme perrito.JPG',
    'assets/img/Camisetas/Colombia/made in colombia.JPG',
    'assets/img/Camisetas/Colombia/papaya given papaya taken.JPG',

    // CAMISETAS - Diciembre
    'assets/img/Camisetas/Diciembre/5 pa las 12.JPG',
    'assets/img/Camisetas/Diciembre/Ansiedad en diciembre.JPG',
    'assets/img/Camisetas/Diciembre/Ojo con eso nueva.JPG',
    'assets/img/Camisetas/Diciembre/Ojos con eso clasica.JPG',
    'assets/img/Camisetas/Diciembre/adonay.JPG',
    'assets/img/Camisetas/Diciembre/donde esta mi regalo.JPG',
    'assets/img/Camisetas/Diciembre/feliz año.JPG',
    'assets/img/Camisetas/Diciembre/guarito o miedo.JPG',
    'assets/img/Camisetas/Diciembre/limoncito con ron.JPG',
    'assets/img/Camisetas/Diciembre/lucerito.JPG',
    'assets/img/Camisetas/Diciembre/modo grinch.JPG',
    'assets/img/Camisetas/Diciembre/no dieta.JPG',
    'assets/img/Camisetas/Diciembre/no jo joo jodan.JPG',
    'assets/img/Camisetas/Diciembre/peces en el rio.JPG',
    'assets/img/Camisetas/Diciembre/yo afan no tengo Vecna sufre.JPG',

    // CAMISETAS - Empoderamiento
    'assets/img/Camisetas/Empoderamiento/future inclusive.JPG',
    'assets/img/Camisetas/Empoderamiento/more pride.JPG',
    'assets/img/Camisetas/Empoderamiento/ojo de loca.JPG',
    'assets/img/Camisetas/Empoderamiento/ressist.JPG',

    // CAMISETAS - Heroínas
    'assets/img/Camisetas/Heroinas/cleopatra.JPG',
    'assets/img/Camisetas/Heroinas/frida kahlo.JPG',
    'assets/img/Camisetas/Heroinas/marie curie.JPG',
    'assets/img/Camisetas/Heroinas/señora antigua.JPG',

    // CAMISETAS - Manga y Anime
    'assets/img/Camisetas/Manga/Croptop patamon digimon.JPG',
    'assets/img/Camisetas/Manga/Croptop sailor moon 1.JPG',
    'assets/img/Camisetas/Manga/Croptop sailor moon 2.JPG',
    'assets/img/Camisetas/Manga/Croptop sakura cardcaptor.JPG',
    'assets/img/Camisetas/Manga/gengar pokemon.JPG',
    'assets/img/Camisetas/Manga/majin buu.JPG',
    'assets/img/Camisetas/Manga/monkey dluffy.JPG',
    'assets/img/Camisetas/Manga/pokemons.JPG',
    'assets/img/Camisetas/Manga/sailor moon 3.JPG',
    'assets/img/Camisetas/Manga/saint seiya man.JPG',
    'assets/img/Camisetas/Manga/saint seiya woman.JPG',

    // CAMISETAS - Memes
    'assets/img/Camisetas/Memes/Croptop cynthia.JPG',
    'assets/img/Camisetas/Memes/ser adulto.JPG',

    // CAMISETAS - Pets
    'assets/img/Camisetas/Pets/andy dog.JPG',
    'assets/img/Camisetas/Pets/cat.JPG',
    'assets/img/Camisetas/Pets/dogs paw.JPG',
    'assets/img/Camisetas/Pets/general dog.JPG',
    'assets/img/Camisetas/Pets/kyra memorial.JPG',
    'assets/img/Camisetas/Pets/luna dog.JPG',
    'assets/img/Camisetas/Pets/odin dog.JPG',
    'assets/img/Camisetas/Pets/patacon dog.JPG',
    'assets/img/Camisetas/Pets/poncho dog memorial.JPG',
    'assets/img/Camisetas/Pets/vincet dog memorial.JPG',

    // CAMISETAS - Music
    'assets/img/Camisetas/Music/beele.JPG',
    'assets/img/Camisetas/Music/billie eilish 1.JPG',
    'assets/img/Camisetas/Music/billie eilish.JPG',
    'assets/img/Camisetas/Music/blackpink.JPG',
    'assets/img/Camisetas/Music/britney spears 1.JPG',
    'assets/img/Camisetas/Music/britney spears 2.JPG',
    'assets/img/Camisetas/Music/Croptop bts.JPG',
    'assets/img/Camisetas/Music/feid.JPG',
    'assets/img/Camisetas/Music/karol g.JPG',
    'assets/img/Camisetas/Music/mago de oz.JPG',
    'assets/img/Camisetas/Music/marilyn monroe 1.JPG',
    'assets/img/Camisetas/Music/marilyn monroe 2.JPG',
    'assets/img/Camisetas/Music/new york.JPG',
    'assets/img/Camisetas/Music/selena quintanilla.JPG',
    'assets/img/Camisetas/Music/shakira 1.JPG',
    'assets/img/Camisetas/Music/shakira 2.JPG',

    // CAMISETAS - Urban
    'assets/img/Camisetas/Urban/beside the point.JPG',
    'assets/img/Camisetas/Urban/great yourself.JPG',
    'assets/img/Camisetas/Urban/hands.JPG',
    'assets/img/Camisetas/Urban/its leviosa.JPG',
    'assets/img/Camisetas/Urban/reave.JPG',
    'assets/img/Camisetas/Urban/the real.JPG',
    'assets/img/Camisetas/Urban/tokyo cart.JPG',
    'assets/img/Camisetas/Urban/vincent van gogh.JPG',

    // CAMISETAS - Roblox
    'assets/img/Camisetas/Roblox/roblox.JPG',

    // GORRAS
    'assets/img/Gorras/angelica rugrats.JPG',
    'assets/img/Gorras/elijo violencia.JPG',
    'assets/img/Gorras/existencial crisis.JPG',
    'assets/img/Gorras/sailor moon.JPG',

    // NOISE (oculto)
    'assets/img/Noise/Noise_1.jpg',
    'assets/img/Noise/Noise_2.jpg',
    'assets/img/Noise/Noise_3.jpg',
    'assets/img/Noise/Noise_4.jpg',
    'assets/img/Noise/Noise_5.jpg',
    'assets/img/Noise/Noise_6.png',

    // TOTE BAGS
    'assets/img/Tote bags/bulbasaur pokemon.JPG',
    'assets/img/Tote bags/cartoons classics.JPG',
    'assets/img/Tote bags/Dama_Antigua.png',
    'assets/img/Tote bags/Frida Kahlo.JPG',
    'assets/img/Tote bags/gatito.JPG',
    'assets/img/Tote bags/gengar pokemon.JPG',
    'assets/img/Tote bags/horror movies characters.JPG',
    'assets/img/Tote bags/Perrito personalizado.JPG',
    'assets/img/Tote bags/perrito personalizado 2.JPG',
    'assets/img/Tote bags/sakura cardcaptor angel.JPG',
    'assets/img/Tote bags/sakura cardcaptor.JPG',
    'assets/img/Tote bags/stranger things capitulo final 3.JPG',
    'assets/img/Tote bags/stranger things capitulo final.JPG',
    'assets/img/Tote bags/stranger things december.JPG',
    'assets/img/Tote bags/stranger things demogorgon.JPG',
    'assets/img/Tote bags/stranger things final.JPG',
    'assets/img/Tote bags/stranger things kids.JPG',
    'assets/img/Tote bags/stranger things upside down 2.JPG',
    'assets/img/Tote bags/stranger things upside down 3.JPG',
    'assets/img/Tote bags/stranger things upside down.JPG',
    'assets/img/Tote bags/vecna stranger things black.JPG',
    'assets/img/Tote bags/vecna stranger things.PNG'
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
    'frida': { title: 'Frida Kahlo - Arte y Rebeldía', desc: 'La artista mexicana que convirtió su historia en colores y resiliencia.' },
    'señora': { title: 'Señora Antigua - Glam Clásico', desc: 'Elegancia atemporal, perlas y actitud impecable en cada detalle.' },
    'calamardo': { title: 'Calamardo - El Deprimido', desc: 'El meme que todos sentimos. La vida de Calamardo.' },
    'homero': { title: 'Homero - El Sueño', desc: 'Cuando solo quieres dormir. El meme de la vida real.' },
    'bulbasaur': { title: 'Bulbasaur - Planta Inicial', desc: 'El compañero leal de tipo planta. El inicio de la aventura.' },
    'cartoons': { title: 'Cartoon Classics', desc: 'Los clásicos que nunca pasan de moda. Nostalgia pura.' },
    'gatito': { title: 'Gatito - Ternura Felina', desc: 'La ternura de un gatito. El compañero perfecto.' },
    'horror': { title: 'Horror Icons', desc: 'Los personajes más icónicos del cine de terror. Miedo y estilo.' },
    'demogorgon': { title: 'Demogorgon - El Monstruo', desc: 'La criatura del Upside Down. El terror de Hawkins.' },
    'upside': { title: 'Upside Down', desc: 'El mundo del revés. Donde todo cambia.' },
    'kids': { title: 'Stranger Kids', desc: 'El grupo de amigos que desafía lo imposible.' },
    'stranger': { title: 'Stranger Things', desc: 'Cosas extrañas suceden en Hawkins.' },

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

    // Diciembre
    'adonay': { title: 'Adonay - ¿Por qué te casaste?', desc: 'La pregunta que Rodolfo Aicardi nos dejó para siempre.' },
    'limoncito': { title: 'Limoncito Con Ron', desc: 'El himno de la fiesta decembrina. ¡Sírvalo pues!' },
    'lucerito': { title: 'Lucerito', desc: '¿Por qué has perdido tus raros encantos? Nostalgia parrandera.' },
    'ojo con eso': { title: 'Ojo Con Eso', desc: 'Homenaje a Joaquín Bedoya y su éxito parrandero, fusionado con el terror de Pennywise ("Eso"). ¡Un doble sentido muy paisa!' },
    '5 pa las 12': { title: 'Faltan 5 Pa\' Las 12', desc: 'El himno del fin de año. Corre a abrazar a tu mamá.' },
    'ansiedad': { title: 'Ansiedad Navideña', desc: 'Cuando llega diciembre y no sabes qué hacer con tu vida.' },
    'regalo': { title: '¿Y Mi Regalo?', desc: 'La pregunta oficial de la nochebuena.' },
    'feliz año': { title: 'Feliz Año', desc: 'Prosperidad, amor y mucho guaro.' },
    'guarito': { title: 'Guarito o Miedo', desc: 'Diciembre sin guaro no es diciembre.' },
    'grinch': { title: 'Modo Grinch', desc: 'Para los que odian la navidad... pero aman la natilla.' },
    'dieta': { title: 'En Diciembre No Hay Dieta', desc: 'La dieta empieza en enero. Pásame el buñuelo.' },
    'jodan': { title: 'Jo Jo Jo... No Jodan', desc: 'Espíritu navideño con límites.' },
    'peces': { title: 'Los Peces en el Río', desc: 'Beben y beben y vuelven a beber. Como tú en diciembre.' },
    'afan': { title: 'Yo Afán No Tengo', desc: 'Como dice la canción... pero versión Vecna.' },

    // Universos
    'house': { title: 'House of Dragons', desc: 'Fuego y sangre. El poder de los Targaryen.' },
    'dragons': { title: 'House of Dragons', desc: 'Fuego y sangre. El poder de los Targaryen.' },

    // Noise
    'noise': { title: 'Noise Original', desc: 'El diseño que empezó todo. La esencia de Noise.' },

    // Tote bags
    'tote': { title: 'Tote Bag', desc: 'Lleva tu estilo contigo. El diseño en cada viaje.' },
    'bag': { title: 'Tote Bag', desc: 'Lleva tu estilo contigo. El diseño en cada viaje.' },

    // Cultura pop y música
    'beele': { title: 'Beele - Caribe Wave', desc: 'Vibras de dancehall y afrobeat directo del Caribe colombiano.' },
    'selena': { title: 'Selena Quintanilla - Reina del Tex-Mex', desc: 'Homenaje a la artista que conquistó los Grammy con Amor Prohibido.' },
    'billie': { title: 'Billie Eilish - Neon Moods', desc: 'Pop oscuro, susurros eléctricos y estilo oversized.' },
    'blackpink': { title: 'BLACKPINK - Born Pink', desc: 'Girl power K-pop con coreografías que incendian escenarios.' },
    'britney': { title: 'Britney Spears - Pop Icon', desc: 'El brillo Y2K que definió una era en MTV.' },
    'bts': { title: 'BTS - Beyond The Scene', desc: 'Siete voces, millones de ARMY y coreografías perfectas.' },
    'feid': { title: 'Feid - Ferxxo Nights', desc: 'Reggaetón mid tempo con gafas verdes y vibra Medellín.' },
    'karol': { title: 'Karol G - Bichota Energy', desc: 'Empoderamiento urbano y letras que se corean a gritos.' },
    'mago': { title: 'Mägo de Oz - Fiesta Folk', desc: 'Gaitas, metal y cuento épico en una sola camiseta.' },
    'marilyn': { title: 'Marilyn Monroe - Golden Icon', desc: 'Hollywood clásico, labios rojos y glamour eterno.' },
    'shakira': { title: 'Shakira - Hips Don’t Lie', desc: 'Fusiones latinas con movimientos imposibles y voz inconfundible.' },
    'vincent': { title: 'Vincent van Gogh - Starry Muse', desc: 'Pinceladas intensas que iluminan la noche.' },
    'tokyo': { title: 'Tokyo Drift - Neon Pulse', desc: 'Carreras nocturnas y glow urbano con sabor asiático.' },
    'angelica': { title: 'Angélica Pickles - Rugrats Queen', desc: 'La villana favorita del patio de juegos 90s.' },
    'rugrats': { title: 'Rugrats Nostalgia', desc: 'Nickelodeon vibes para fans de la infancia sin filtros.' },
    'leviosa': { title: 'It’s Leviosa, Not Leviosar', desc: 'La cita que todo potterhead corrige con orgullo.' },

    // Anime, manga y gaming
    'patamon': { title: 'Patamon - Guardián Digital', desc: 'La ternura Digimon que evoluciona en pura épica.' },
    'digimon': { title: 'Digimon Adventure', desc: 'Bestias digitales, amistad y nostalgia noventera.' },
    'sakura': { title: 'Sakura Card Captor', desc: 'Cartas mágicas, broches y outfits de Tomoyo.' },
    'gengar': { title: 'Gengar - Sombra Pokémon', desc: 'Smile travieso y aura púrpura salida de Kanto.' },
    'pokemon': { title: 'Pokémon Trainer', desc: 'Atrápalos todos con estilo retro gaming.' },
    'majin': { title: 'Majin Buu - Caos Rosa', desc: 'Villano impredecible con poder infinito y dulces.' },
    'dluffy': { title: 'Monkey D. Luffy - Rey Pirata', desc: 'Sombrero de paja listo para conquistar el Grand Line.' },
    'seiya': { title: 'Saint Seiya - Cosmos', desc: 'Caballeros de bronce encendiendo el cosmos por Atena.' },
    'roblox': { title: 'Roblox - Metaverso Pixel', desc: 'Creatividad infinita para gamers que construyen mundos.' },

    // Memes y frases
    'cynthia': { title: 'Cynthia Vibes', desc: 'La muñeca más punk de los 2000 vuelve en crop top.' },
    'adulto': { title: 'Ser Adulto Es Un Meme', desc: 'Cansancio, café y humor ácido en cada línea.' },
    'cabello': { title: 'Cabello Meme - Pelo Perfecto', desc: 'Drama capilar convertido en statement fashion.' },
    'chocorramo': { title: 'Chocorramo Love', desc: 'Dulce nostalgia colombiana en modo streetwear.' },
    'monstruo': { title: 'No Soy Monstruo', desc: 'Respuesta icónica para callar prejuicios con humor.' },

    // Mascotas
    'andy': { title: 'Andy Dog - Best Friend', desc: 'Un tributo peludo para llevar siempre cerca del corazón.' },
    'kyra': { title: 'Kyra - Guardian Angel', desc: 'Recuerdo brillante para una compañera leal.' },
    'odin': { title: 'Odín - Alma Aventurera', desc: 'Historias de parque y ternura en cada trazo.' },
    'poncho': { title: 'Poncho - Leyenda Canina', desc: 'Memorial para el perrito más noble del barrio.' },
    'patacon': { title: 'Patacón Dog', desc: 'El perrito con nombre de snack que todos aman.' },
    'luna': { title: 'Luna - Luz Peluda', desc: 'Reflejos plateados y ojitos que hipnotizan.' },
    'vincet': { title: 'Vincent Dog - Arte Canino', desc: 'Bigotes nobles inspirados en Van Gogh.' },
    'paw': { title: 'Dogs Paw - Huella Eterna', desc: 'Un imprint que simboliza fidelidad infinita.' }
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
 * Detecta automáticamente nuevas carpetas (incluye soporte para espacios)
 */
function extractCategory(path) {
    const pathParts = path.split('/');
    const categoryFolder = pathParts[pathParts.length - 2] || '';

    // Mapeo de carpetas a categorías (con soporte para nuevas carpetas y espacios)
    const categoryMap = {
        'Universos': 'universos',
        'Anime': 'anime',
        'Empoderamiento': 'empoderamiento',
        'Heroínas': 'heroinas',
        'Heroinas': 'heroinas',
        'Memes': 'memes',
        'Colombia': 'colombia',
        'Manga': 'manga',
        'Pets': 'pets',
        'Pop': 'music',
        'Music': 'music',
        'Roblox': 'roblox',
        'Gorras': 'gorras',
        'Urban': 'urban',
        'Noise': 'noise',
        'Tote bags': 'tote-bags',
        'Stanger Things': 'universos', // Subcarpeta dentro de Universos
        'House Of Dragons': 'universos' // Subcarpeta dentro de Universos
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
 * Determina el tipo de producto (Camisetas, Gorras, Tote Bags)
 */
function determineProductType(path) {
    const lowerPath = path.toLowerCase();

    if (lowerPath.includes('tote bags') || lowerPath.includes('tote-bags')) {
        return 'tote-bags';
    }

    if (lowerPath.includes('gorras')) {
        return 'gorras';
    }

    // Por defecto, todo lo demás son camisetas
    return 'camisetas';
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
    // Ordenar por longitud descendente para que coincidan primero las frases más específicas
    const sortedKeywords = Object.entries(KEYWORDS).sort((a, b) => b[0].length - a[0].length);

    for (const [keyword, data] of sortedKeywords) {
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
    // Ordenar por longitud descendente para que coincidan primero las frases más específicas
    const sortedKeywords = Object.entries(KEYWORDS).sort((a, b) => b[0].length - a[0].length);

    for (const [keyword, data] of sortedKeywords) {
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

            // Memoriales para mascotas fallecidas
            if (normalized.includes('memorial')) {
                const isCat = normalized.includes('cat');
                desc = isCat
                    ? 'Homenaje póstumo para recordar a tu gato con estilo y cariño.'
                    : 'Homenaje póstumo para celebrar la vida de tu perrito con estilo y cariño.';
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
        'manga': 'Paneles de shonen y shojo listos para tomar la calle.',
        'pets': 'Tributos peludos con energía cozy y corazón gigante.',
        'music': 'Beats icónicos, cultura pop y homenajes musicales en versión streetwear.',
        'urban': 'Grafiti deluxe, referencias callejeras y vibra street para romper la ciudad.',
        'roblox': 'Metaverso pixelado para gamers que crean mundos.',
        'gorras': 'Accesorios urbanos para coronar cualquier fit.',
        'noise': 'El diseño que habla. La identidad Noise.',
        'tote-bags': 'Lleva tu estilo contigo. El diseño en cada viaje.',
        'diciembre': 'La mejor época del año. Parranda, natilla y buñuelos.'
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
        const type = determineProductType(path);
        const title = generateTitle(filename, path);
        const description = generateDescription(filename, path, title);
        const badge = determineBadge(filename, path, index);

        return {
            image: path,
            title: title,
            description: description,
            category: category,
            type: type,
            badge: badge
        };
    }).filter(product => product.category !== 'noise'); // Filtrar productos de categoría "noise"
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
        'manga': 'Manga',
        'pets': 'Pets',
        'music': 'Music',
        'urban': 'Urban',
        'roblox': 'Roblox',
        'gorras': 'Gorras',
        'noise': 'Noise',
        'tote-bags': 'Tote Bags',
        'diciembre': 'Diciembre 💡'
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
/**
 * Actualiza los filtros en el HTML automáticamente
 */
function updateFilters() {
    const subFiltersContainer = document.getElementById('subFilters');
    if (!subFiltersContainer) return;

    // Limpiar filtros existentes
    subFiltersContainer.innerHTML = '';

    // Obtener categorías únicas de camisetas (excluyendo noise y tote-bags)
    const tshirtCategories = [...new Set(
        products
            .filter(p => p.type === 'camisetas' && p.category !== 'noise')
            .map(p => p.category)
    )].sort();

    // Botón "Todas"
    const allButton = document.createElement('button');
    allButton.className = 'filter-btn active';
    allButton.setAttribute('data-filter', 'all');
    allButton.innerHTML = '<span>Todas</span>';
    subFiltersContainer.appendChild(allButton);

    // Botones de categorías
    tshirtCategories.forEach(category => {
        const button = document.createElement('button');
        button.className = 'filter-btn';
        button.setAttribute('data-filter', category);
        button.innerHTML = `<span>${getCategoryDisplayName(category)}</span>`;
        subFiltersContainer.appendChild(button);
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
let products = [];
let tshirtImages = [];
let tshirtQuotes = [];
let productCategories = [];
let productTypes = [];
let productBadges = [];

try {
    products = generateProducts();
    console.log(`✅ Generados ${products.length} productos desde ${PRODUCT_PATHS.length} rutas`);

    // Arrays para compatibilidad con código existente
    tshirtImages = products.map(p => p.image);
    tshirtQuotes = products.map(p => p.title);
    tshirtImages = products.map(p => p.image);
    tshirtQuotes = products.map(p => p.title);
    productCategories = products.map(p => p.category);
    productTypes = products.map(p => p.type);
    productBadges = products.map(p => p.badge);

    console.log(`✅ Arrays creados: ${tshirtImages.length} imágenes, ${tshirtQuotes.length} títulos`);
} catch (error) {
    console.error('❌ Error generando productos:', error);
    products = [];
    tshirtImages = [];
    tshirtQuotes = [];
    tshirtQuotes = [];
    productCategories = [];
    productTypes = [];
    productBadges = [];
}

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.products = products;
    window.tshirtImages = tshirtImages;
    window.tshirtQuotes = tshirtQuotes;
    window.tshirtQuotes = tshirtQuotes;
    window.productCategories = productCategories;
    window.productTypes = productTypes;
    window.productBadges = productBadges;

    // Función para regenerar productos (útil si se agregan nuevos)
    window.regenerateProducts = function () {
        const newProducts = generateProducts();
        window.products = newProducts;
        window.tshirtImages = newProducts.map(p => p.image);
        window.tshirtQuotes = newProducts.map(p => p.title);
        window.tshirtQuotes = newProducts.map(p => p.title);
        window.productCategories = newProducts.map(p => p.category);
        window.productTypes = newProducts.map(p => p.type);
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
window.addEventListener('error', function (e) {
    if (e.error) {
        console.error('Error en products.js:', e.error);
    } else if (e.message) {
        console.error('Error en products.js:', e.message);
    }
    // Asegurar que el loading se oculte incluso si hay errores
    setTimeout(() => {
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay) {
            loadingOverlay.classList.add('hidden');
        }
    }, 2000);
}, true);


