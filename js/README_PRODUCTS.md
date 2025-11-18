# Sistema de Productos Automático - Noise

## 📋 Descripción

Este sistema genera automáticamente títulos, descripciones y categorías para los productos basándose únicamente en las rutas de las imágenes. **Solo necesitas agregar la ruta de la imagen** y el sistema hace el resto.

## 🚀 Cómo Agregar Nuevos Productos

### Paso 1: Agregar la imagen a la carpeta correspondiente

Coloca tu imagen en la carpeta apropiada dentro de `assets/img/`:
- `assets/img/Universos/` - Para referencias de series/películas
- `assets/img/Anime/` - Para personajes de anime
- `assets/img/Empoderamiento/` - Para frases de empoderamiento
- `assets/img/Heroínas/` - Para heroínas históricas
- `assets/img/Memes/` - Para memes
- `assets/img/Colombia/` - Para contenido colombiano
- `assets/img/Noise/` - Para diseños de la marca
- `assets/img/Tote bags/` - Para bolsas

**O crea una nueva carpeta** - El sistema detectará automáticamente la nueva categoría.

### Paso 2: Agregar la ruta en `js/products.js`

Abre `js/products.js` y agrega la ruta de tu imagen al array `PRODUCT_PATHS`:

```javascript
const PRODUCT_PATHS = [
    // ... productos existentes ...
    'assets/img/TuNuevaCarpeta/TuImagen.jpg',  // ← Agrega aquí
];
```

### Paso 3: ¡Listo!

El sistema automáticamente:
- ✅ Detecta la categoría desde la carpeta
- ✅ Genera un título creativo desde el nombre del archivo
- ✅ Crea una descripción apropiada
- ✅ Asigna badges (new, bestseller, limited) cuando corresponde
- ✅ Actualiza los filtros en la web

## 🎨 Generación Automática

### Títulos

El sistema analiza el nombre del archivo y genera títulos creativos:

- `Once_StrangerThings.jpg` → "Once - El Poder de la Mente"
- `Chicos_Version_2_StrangerThings.jpg` → "Los Chicos - Versión 2"
- `Goku.jpg` → "Goku - Super Saiyajin"

### Descripciones

Las descripciones se generan basándose en:
- Palabras clave en el nombre del archivo
- La categoría del producto
- Patrones reconocidos (premium, version, etc.)

### Categorías

Las categorías se detectan automáticamente desde la carpeta:
- Si la carpeta existe en el mapeo, usa ese nombre
- Si es nueva, genera automáticamente un slug (ej: "Nueva Carpeta" → "nueva-carpeta")

## 🔧 Personalización

### Agregar Palabras Clave Personalizadas

Si quieres que el sistema reconozca palabras específicas, edita el objeto `KEYWORDS` en `js/products.js`:

```javascript
const KEYWORDS = {
    'tu-palabra': { 
        title: 'Título Personalizado', 
        desc: 'Descripción personalizada.' 
    },
    // ... más keywords ...
};
```

### Agregar Nombres de Categorías

Para personalizar cómo se muestran las categorías, edita la función `getCategoryDisplayName()`:

```javascript
function getCategoryDisplayName(category) {
    const categoryNames = {
        'tu-categoria': 'Tu Categoría',
        // ... más categorías ...
    };
    // ...
}
```

## 📝 Ejemplo Completo

```javascript
// En js/products.js
const PRODUCT_PATHS = [
    // ... productos existentes ...
    'assets/img/NuevaCategoria/MiProducto_Especial.jpg',
];
```

El sistema generará automáticamente:
- **Categoría**: `nuevacategoria` (desde la carpeta)
- **Título**: Basado en "MiProducto_Especial"
- **Descripción**: Basada en la categoría y palabras clave
- **Badge**: Asignado automáticamente si es nuevo

## 🎯 Funciones Disponibles

### `regenerateProducts()`
Regenera todos los productos y actualiza la web:

```javascript
window.regenerateProducts();
```

### `updateFilters()`
Actualiza los filtros en la web con las nuevas categorías:

```javascript
window.updateFilters();
```

## 💡 Tips

1. **Nombres descriptivos**: Usa nombres de archivo descriptivos para mejores títulos automáticos
2. **Consistencia**: Mantén un formato consistente en los nombres (ej: `Personaje_Serie.jpg`)
3. **Palabras clave**: Incluye palabras clave en el nombre para mejor reconocimiento
4. **Nuevas carpetas**: El sistema detecta automáticamente nuevas carpetas como categorías

## 🔄 Actualización Automática

Cuando agregues nuevos productos:
1. Los filtros se actualizan automáticamente
2. Las categorías se detectan automáticamente
3. Los títulos y descripciones se generan automáticamente
4. No necesitas modificar el HTML ni otros archivos JS

---

**¡Es así de simple!** Solo agrega la ruta de la imagen y el sistema hace el resto. 🚀

