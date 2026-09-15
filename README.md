# Nossa Pizza

Sitio web profesional para **Nossa Pizza**, pizzería artesanal de inspiración
brasileña. Es un sitio estático (HTML + CSS + JavaScript, sin build ni
dependencias) listo para publicar en cualquier hosting estático.

## Estructura

```
index.html              → toda la página (una sola página con secciones ancladas)
css/style.css           → estilos, paleta de marca, animaciones y responsive
js/main.js              → menú móvil, animaciones al hacer scroll, galería con lightbox
assets/images/          → imágenes del sitio
assets/images/placeholders/ → ilustraciones provisionales (ver más abajo)
CONTENIDO-EDITABLE.md   → lista de todo lo que falta por confirmar (precios, fotos, contacto…)
```

## Ver la web en local

No requiere instalación. Basta con abrir `index.html` en el navegador, o
levantar un servidor estático simple, por ejemplo:

```bash
python3 -m http.server 8000
# luego abre http://localhost:8000
```

## Secciones de la página

Inicio → Nuestra historia → Nuestras pizzas → Calidad e ingredientes →
Por qué elegirnos → Galería → Menú → Pedidos → Contacto → Pie de página.

## Pendiente de completar

Las 5 imágenes de marca compartidas (pizza de goiabada, mascota chef,
logotipo, rolls de jamón y queso, pizza de calabresa) se usaron como
referencia de colores, tipografía y tono, pero no llegaron como archivos al
repositorio, así que hoy la web usa ilustraciones vectoriales provisionales
en `assets/images/placeholders/`. Lo mismo pasa con precios, dirección,
teléfono, horario y redes sociales, que no se indicaron en el encargo.

**Todo lo pendiente está documentado en [`CONTENIDO-EDITABLE.md`](./CONTENIDO-EDITABLE.md)**,
con la ruta exacta de cada archivo y línea a editar.
