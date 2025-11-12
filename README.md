# Noise - Ropa Urbana con Actitud

![Noise Logo](assets/logo/logo_white.PNG)

Sitio web moderno y responsive para **Noise**, una marca de ropa urbana que celebra la individualidad, la autenticidad y la libertad de ser quien quieras ser.

## 🎨 Características

- **Diseño Moderno y Urbano**: Interfaz limpia con efectos visuales impactantes
- **100% Responsive**: Optimizado para móviles, tablets y desktop
- **Galería de Productos**: Pasarela interactiva de camisetas con efectos hover
- **Integración WhatsApp**: Botón flotante para contacto directo
- **Animaciones Suaves**: Efectos parallax, partículas y transiciones fluidas
- **Menú Móvil**: Navegación hamburguesa con animaciones

## 🚀 Tecnologías

- **HTML5**: Estructura semántica
- **CSS3**: Estilos personalizados con variables CSS y animaciones
- **JavaScript (Vanilla)**: Interactividad sin dependencias
- **Tailwind CSS**: Framework CSS utility-first (CDN)
- **Font Awesome**: Iconos

## 📁 Estructura del Proyecto

```
Noise/
├── assets/
│   ├── img/          # Imágenes de camisetas
│   └── logo/         # Logos de la marca
├── css/
│   └── styles.css    # Estilos principales
├── js/
│   └── script.js    # Lógica JavaScript
├── index.html        # Página principal
└── README.md         # Documentación
```

## 🎯 Secciones

1. **Hero Section**: Presentación impactante con animaciones
2. **Productos**: Galería de camisetas con diseño grid responsive
3. **Sobre Nosotros**: Información de la marca
4. **Footer**: Información de contacto y derechos

## 📱 Responsive Design

El sitio está optimizado para:
- 📱 Móviles (320px+)
- 📱 Tablets (768px+)
- 💻 Laptops (1024px+)
- 🖥️ Desktops (1400px+)

## 🛠️ Configuración

1. Clona el repositorio:
```bash
git clone https://github.com/christopherhomen/Noise.git
```

2. Abre `index.html` en tu navegador

3. (Opcional) Configura un servidor local para desarrollo

## ⚙️ Personalización

### Cambiar número de WhatsApp

Edita `js/script.js`:
```javascript
const CONFIG = {
    whatsappNumber: 'TU_NUMERO_AQUI', // Formato: 573164212929
    // ...
};
```

### Añadir más productos

Edita el array `tshirtImages` en `js/script.js`:
```javascript
const tshirtImages = [
    'assets/img/tu-imagen.jpg',
    // ...
];
```

## 🎨 Paleta de Colores

- **Fondo Principal**: `#000000` (Negro)
- **Texto**: `#FFFFFF` (Blanco)
- **Acentos**: `#888888` (Gris)
- **WhatsApp**: `#25D366` (Verde)

## 📝 Licencia

© 2025 Noise. Todos los derechos reservados.

## 👤 Contacto

- **WhatsApp**: +57 316 421 2929
- **GitHub**: [@christopherhomen](https://github.com/christopherhomen)

---

**Noise** - Memes que vibran, frases que empoderan, referencias que conectan. Tu actitud, tu estilo.

