# Contenido pendiente de editar — Nossa Pizza

Este documento reúne **todo lo que quedó marcado como editable** en la web porque
no venía en las referencias de marca (las 5 imágenes) ni en el encargo original.
No se ha inventado ningún dato: precios, ingredientes no visibles, dirección,
teléfono, horario y enlaces reales se han dejado como campos claramente
identificados para rellenar.

En el código, estos campos llevan el atributo `data-editable` o un comentario
`<!-- EDITAR: ... -->`, así que puedes buscarlos con Ctrl+F en `index.html`.

## 1. Fotografías reales

Las 5 imágenes de marca que compartiste (la pizza de goiabada, la mascota
chef, el logotipo "Nossa Pizza", los rolls de jamón y queso, y la pizza de
calabresa) son la referencia visual oficial, pero **como archivos de imagen
no llegaron adjuntos al repositorio** (solo se pudieron analizar visualmente).
Por eso la web usa ilustraciones vectoriales provisionales que imitan la
paleta y composición de cada foto, guardadas en:

```
assets/images/placeholders/
├── pizza-goiabada-placeholder.svg   → sustituir por la foto de la pizza de goiabada y queso
├── pizza-calabresa-placeholder.svg  → sustituir por la foto de la pizza de calabresa y cebolla
├── pizza-roll-placeholder.svg       → sustituir por la foto del rocambole de jamón y queso
├── mascot-placeholder.svg           → sustituir por la foto/ilustración oficial de la mascota chef
├── logo-lockup-placeholder.svg      → sustituir por el logotipo oficial "Nossa Pizza"
└── og-image-placeholder.svg         → sustituir por una foto 1200×630 para compartir en redes
```

**Cómo sustituirlas:** guarda tus fotos reales (formato .jpg o .png,
recomendado 1200×1200px para pizzas y 1600×1200px para fotos de ambiente) en
`assets/images/`, y en `index.html` cambia el `src="assets/images/placeholders/..."`
de cada `<img>` por la ruta de tu nuevo archivo. El texto `alt` de cada imagen
ya está escrito — solo revísalo si cambia el encuadre de la foto.

Secciones con imágenes a sustituir: **Hero** (portada), **Nuestra Historia**,
**Nuestras Pizzas**, **Galería** y las metaetiquetas `og:image` / `twitter:image`
del `<head>`.

## 2. Precios

Ninguna de las 5 imágenes mostraba precios, así que todos los precios de la
web (sección "Nuestras Pizzas" y "Menú") aparecen como `[Precio]` /
`[Precio pendiente]`. Búscalos en `index.html` y sustitúyelos por el precio real.

## 3. Menú — categorías Bebidas y Extras

No se proporcionó información sobre bebidas ni extras, así que la sección
`#menu` incluye filas de ejemplo (`[Bebida]`, `[Extra]`, `[Precio]`) listas
para rellenar con tus productos reales. Puedes duplicar el bloque
`<li class="menu-row">...</li>` para añadir más artículos.

## 4. Nuevas pizzas de la carta

En "Nuestras Pizzas" y en el menú se dejó una fila `[Nueva pizza]` de ejemplo
para cuando quieras incorporar más sabores a la carta.

## 5. Datos de contacto

En la sección `#contacto` y en el pie de página:

- **Dirección** → `[Editar: dirección de la pizzería]`
- **Teléfono** → `[Editar: número de teléfono]`
- **WhatsApp** → el botón usa el número de ejemplo `34600000000`. Sustitúyelo
  en dos sitios: el botón "Pedir por WhatsApp" de la sección `#pedidos` y el
  enlace de WhatsApp de `#contacto`.
- **Horario** → `[Editar: horario de apertura]`
- **Instagram / Facebook** → los enlaces están con `href="#"`, pendientes de
  la URL real de cada red social.
- **Mapa** → se dejó un bloque con el mensaje "El mapa estará disponible en
  cuanto confirmemos la dirección del local" en vez de incrustar una
  ubicación inventada. Cuando tengas la dirección, puedes sustituir
  `.map-placeholder` por un `<iframe>` de Google Maps u OpenStreetMap.

## 6. Pedidos online (delivery)

Los botones "Uber Eats" y "Just Eat" están visibles pero desactivados
(`(próximamente)`), a la espera de que la pizzería se dé de alta en esas
plataformas. En cuanto tengas los enlaces:

1. Busca `order-btn--pending` en `index.html`.
2. Cambia el `<span>` por un `<a href="URL_REAL" target="_blank" rel="noopener">`.
3. Quita la clase `order-btn--pending` y el texto `(próximamente)`.

## 7. SEO / dominio

`index.html` incluye un `<link rel="canonical">` y metaetiquetas Open Graph
con el dominio de ejemplo `https://www.nossapizza.example/`. Sustitúyelo por
el dominio real cuando la web esté publicada. El bloque `Restaurant`
(`application/ld+json`) también tiene dirección y teléfono de ejemplo que hay
que completar para que Google los use en resultados de búsqueda locales.

---

Todo lo demás (nombre de marca, historia, descripciones de las tres pizzas,
ingredientes, textos de "Calidad" y "Por qué elegirnos") se ha escrito a
partir de lo que aparece en tus 5 imágenes de referencia y del encargo
original — no contiene datos inventados sobre la pizzería.
