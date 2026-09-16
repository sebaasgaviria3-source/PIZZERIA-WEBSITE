# Contenido pendiente de editar — Nossa Pizza

Este documento reúne **todo lo que falta por confirmar** en la web. No se ha
inventado ningún precio, ingrediente, dato de contacto ni reseña — todo lo
que no venía en tus imágenes o mensajes se dejó como campo claramente
marcado para rellenar.

En el código, estos campos llevan el atributo `data-editable`, `data-price=""`
o un comentario `<!-- EDITAR: ... -->`, así que puedes buscarlos con Ctrl+F.

## 1. Fotografías

**Fotos reales de Nossa Pizza** (las que subiste tú, ya integradas):

| Foto | Dónde se usa |
|---|---|
| `assets/images/pizza-goiabada.jpg` | Portada (hero), tarjeta "Goiabada" del menú, galería, imagen para compartir en redes (Open Graph) |
| `assets/images/mascot-chef.jpg` | Sección "Nuestra historia", distintivo "100% artesanal" del hero, galería |
| `assets/images/logo-nossa-pizza.jpg` | Galería (identidad de marca) |

**Fotografías de referencia (stock gratuito, no son de Nossa Pizza)** —
se usan como marcador visual de calidad mientras no haya fotografía propia
de esos elementos. Todas llevan `— foto de referencia, pendiente de
sustituir por la propia` en su `alt`, para que quede documentado en el
propio código:

| Foto | Dónde se usa |
|---|---|
| `assets/images/pizza-calabresa.jpg` | Tarjeta "Calabresa" del menú, galería |
| `assets/images/chef-oven.jpg` | Sección "Calidad e ingredientes", galería |
| `assets/images/pizza-margherita.jpg` | Galería |
| `assets/images/pizza-olives.jpg` | (disponible en `assets/images/`, aún sin usar) |

Cuando tengas fotografía real de tu pizza de calabresa, tu horno o tu
local, sustituye el `src` correspondiente en `index.html` — cada foto de
referencia aparece en 1-2 sitios, fácil de localizar buscando el nombre de
archivo.

**Aún falta** una foto para el **rocambole de jamón y queso** — al ser una
pieza enrollada (no una pizza redonda), ninguna de las fotos de stock que
enviaste correspondía a la forma real del producto, así que de momento
sigue con una ilustración vectorial provisional:
`assets/images/placeholders/pizza-roll-placeholder.svg`.

> Nota sobre archivos retirados: llegaron varios `.zip` a `assets/images/`
> a lo largo de la conversación con capturas de pantalla de otras webs
> (una pizzería llamada "BRACE") y con búsquedas de Google Images /
> bancos de stock que incluían fotos con derechos de autor de terceros y
> el escaparate real de otro restaurante ("Allô Pizza"). Ninguno de esos
> archivos se ha usado como contenido de Nossa Pizza y se han retirado del
> repositorio; solo se conservaron las fotos de stock genéricas (sin marca
> de otro negocio) listadas arriba.

## 2. Precios

No se ha facilitado ninguna lista de precios de Nossa Pizza, así que **todo
el sistema de tamaños y extras del menú funciona con precios en blanco**
(`data-price=""`). Mientras estén vacíos, la web es honesta al respecto: en
vez de mostrar un precio inventado, muestra **"Precio pendiente"**.

Para activar los precios reales, en `index.html` busca cada pizza dentro de
`<section id="menu">` y rellena los atributos `data-price` con el número
(usa punto o coma decimal, sin símbolo de moneda), por ejemplo:

```html
<!-- antes -->
<input type="radio" name="size-goiabada" value="Pequeña" data-price="">
<!-- después -->
<input type="radio" name="size-goiabada" value="Pequeña" data-price="9.50">
```

Hazlo también en el texto visible `<span class="size-option-price price" data-editable>[Precio]</span>`
(cámbialo por `9,50 €`, por ejemplo, y quita `data-editable`). En cuanto
rellenes los `data-price`, el cálculo automático del total, el carrito y el
resumen que se envía por WhatsApp funcionan solos — no hay que tocar el
JavaScript.

Lo mismo aplica a los extras (`data-price=""` en cada casilla).

## 3. Tamaños y raciones

Se han preparado 3 tamaños por pizza (Pequeña 25 cm / Mediana 30 cm / Grande
35 cm) y 2 raciones para el rocambole (Individual / Para compartir) como
**estructura de ejemplo**, ya que no se indicaron los tamaños reales de
Nossa Pizza. Edita las etiquetas (`Pequeña`, `25 cm`, etc.) en `index.html`
si tus tamaños reales son distintos.

## 4. Bebidas, postres y nuevas pizzas

Aún no hay categoría de bebidas ni postres — los filtros del menú
("Todas", "Clásicas", "Especiales", "Especialidades") solo muestran
categorías que existen de verdad hoy. Cuando tengas más productos:

1. Duplica una tarjeta `<article class="product-card">` dentro de `#product-grid`.
2. Cambia nombre, ingredientes, foto, tamaños/precios y `data-category`.
3. Si es una categoría nueva (p. ej. "bebidas"), añade un botón más en
   `.menu-filters` con `data-filter="bebidas"`.

## 5. Datos de contacto

En la sección `#contacto` y en el pie de página:

- **Dirección** → `[Editar: dirección de la pizzería]`
- **Teléfono** → `[Editar: número de teléfono]`
- **WhatsApp** → el número de ejemplo `34600000000` aparece en **tres**
  sitios que debes sustituir por el real: el botón "Pedir por WhatsApp" de
  `#pedidos`, el enlace de `#contacto`, y la constante `WHATSAPP_NUMBER` al
  principio de `js/cart.js` (esta última es la que usa el botón "Continuar
  al pedido por WhatsApp" del carrito).
- **Horario** → `[Editar: horario de apertura]`
- **Instagram / Facebook** → enlaces con `href="#"`, pendientes de la URL real.
- **Mapa** → en vez de incrustar una ubicación inventada, se dejó un aviso
  ("El mapa estará disponible en cuanto confirmemos la dirección"). Cuando
  tengas la dirección, sustituye `.map-placeholder` por un `<iframe>` de
  Google Maps u OpenStreetMap.

## 6. Pedidos online (delivery)

Los botones "Uber Eats" y "Just Eat" están visibles pero desactivados
(`(próximamente)`). En cuanto tengas los enlaces:

1. Busca `order-btn--pending` en `index.html`.
2. Cambia el `<span>` por un `<a href="URL_REAL" target="_blank" rel="noopener">`.
3. Quita la clase `order-btn--pending` y el texto `(próximamente)`.

## 7. Opiniones de clientes

La sección "Opiniones" usa 3 tarjetas de ejemplo, marcadas con una etiqueta
"Ejemplo" y un aviso explícito de que no son reseñas reales (para no
presentar testimonios inventados como si fueran de clientes de verdad).
Sustituye el texto de la cita y el nombre en cada `.review-card` de
`index.html`, y quita el `<span class="review-example-tag">Ejemplo</span>`
de las que ya sean reales.

## 8. Páginas legales

`privacidad.html` y `terminos.html` son plantillas con un aviso claro de
"contenido pendiente de redactar" — no son textos legales reales. Antes de
aceptar pedidos desde la web, sustitúyelos por una política de privacidad y
unos términos y condiciones redactados (idealmente con asesoría legal).

## 9. SEO / dominio

`index.html` incluye un `<link rel="canonical">` y metaetiquetas Open Graph
con el dominio de ejemplo `https://www.nossapizza.example/`. Sustitúyelo por
el dominio real cuando la web esté publicada. El bloque `Restaurant`
(`application/ld+json`) también tiene dirección y teléfono de ejemplo.

---

Todo lo demás (nombre de marca, historia, descripciones e ingredientes de
las tres pizzas, textos de "Calidad" y "Por qué elegirnos") se ha escrito a
partir de tus imágenes de referencia y del encargo original — no contiene
datos inventados sobre la pizzería.
