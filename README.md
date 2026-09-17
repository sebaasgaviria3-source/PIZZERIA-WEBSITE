# TABOM Pizza

Sitio web profesional para **Nossa Pizza**, pizzería artesanal de inspiración
brasileña. Es un sitio estático (HTML + CSS + JavaScript, sin build ni
dependencias) listo para publicar en cualquier hosting estático.

## Estructura

```
index.html              → página principal (secciones ancladas)
privacidad.html         → plantilla de política de privacidad (pendiente de redactar)
terminos.html           → plantilla de términos y condiciones (pendiente de redactar)
css/style.css           → estilos, paleta de marca, animaciones y responsive
js/main.js              → menú móvil, animaciones al hacer scroll, galería con lightbox
js/cart.js              → filtros del menú, selector de tamaño/extras y carrito de compra
assets/images/          → fotos reales de la marca
assets/images/placeholders/ → ilustraciones provisionales para las fotos que aún faltan
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

Inicio → Menú (con selección de tamaño/extras y carrito) → Nuestra historia
→ Calidad e ingredientes → Por qué elegirnos → Galería → Opiniones →
Pedidos → Contacto → Pie de página.

## Funcionalidades

- **Menú con carrito real**: cada pizza permite elegir tamaño y extras, ver
  el precio en vivo, y añadirla a un carrito persistente (se guarda en el
  navegador). El botón "Continuar al pedido por WhatsApp" genera un mensaje
  con el resumen exacto del pedido.
- **Filtros de categoría** en el menú (Todas / Clásicas / Especiales /
  Especialidades), generados solo a partir de las pizzas reales.
- Diseño responsive mobile-first, con menú hamburguesa, barra de pedido
  fija en móvil y animaciones de aparición al hacer scroll.

## Pendiente de completar

Precios, tamaños reales, dirección, teléfono, horario, redes sociales, las
fotos de dos de las pizzas y el texto de las páginas legales siguen
pendientes de confirmar. **Todo está documentado, con la ruta exacta de
cada archivo, en [`CONTENIDO-EDITABLE.md`](./CONTENIDO-EDITABLE.md).**
