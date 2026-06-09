# Maison Steff - Presentación web

Presentación escolar interactiva y completamente local para la microempresa **Maison Steff**. Fue creada con HTML5, CSS3 y JavaScript puro; no necesita internet, instalaciones, frameworks ni librerías externas.

## Cómo abrir el proyecto

1. Abre la carpeta `maison-steff-presentacion-web` (o esta carpeta del proyecto).
2. Haz doble clic en `index.html`.
3. El sitio se abrirá en el navegador predeterminado y funcionará sin conexión.

Para exponer en pantalla completa, presiona `F11` en la mayoría de navegadores.

## Controles de presentación

- Usa el menú superior para ir directamente a una sección.
- Usa los botones flotantes de la esquina inferior derecha para avanzar, retroceder o volver al inicio.
- `Flecha derecha` o `Page Down`: siguiente sección.
- `Flecha izquierda` o `Page Up`: sección anterior.
- `Home`: volver al inicio.
- `End`: ir al cierre.

## Estructura del proyecto

```text
maison-steff-presentacion-web/
  index.html
  css/
    style.css
  js/
    main.js
  assets/
    maison-steff-logo.png
    pastel-fresa.jpg
    pastel-vainilla.jpg
    pastel-tres-leches.jpg
    empaque-pasteles.jpg
  README.md
```

## Dónde cambiar textos

Todos los textos de la presentación están en `index.html`. Busca el título o frase que deseas modificar y reemplaza su contenido entre las etiquetas HTML.

Las ocho secciones principales son:

1. Inicio
2. Marca
3. Producto
4. Mercado
5. Marketing
6. Empresa
7. Investigación y contacto
8. Cierre

## Dónde colocar imágenes

Guarda las imágenes nuevas dentro de la carpeta `assets/`. Usa nombres simples, por ejemplo:

```text
assets/pastel-fresa.jpg
assets/pastel-vainilla.jpg
```

Después puedes insertarlas en `index.html` con:

```html
<img src="assets/pastel-fresa.jpg" alt="Pastel individual de fresa">
```

## Cómo reemplazar las ilustraciones de sabores

Las tarjetas de Fresa, Vainilla y Tres leches usan fotografías locales. Chocolate conserva una ilustración CSS como respaldo porque no hay una fotografía claramente identificada para ese sabor.

Para reemplazar una ilustración:

1. Abre `index.html`.
2. Busca la tarjeta del sabor, por ejemplo `class="flavor-card strawberry"`.
3. Reemplaza este bloque:

```html
<div class="mini-cake" aria-hidden="true"><span></span><i></i></div>
```

por:

```html
<img class="product-photo" src="assets/pastel-fresa.jpg" alt="Pastel individual de fresa">
```

4. Agrega este estilo al final de `css/style.css`:

```css
.product-photo {
  width: calc(100% + 40px);
  height: 170px;
  margin: -14px -20px 20px;
  object-fit: cover;
}
```

## Personalización visual

Los colores principales se encuentran al inicio de `css/style.css`, dentro de `:root`. Cambia esos valores para actualizar la paleta en todo el sitio.

El logotipo oficial utilizado por la web está en `assets/maison-steff-logo.png`. El archivo original `assets/Maison Steff.png` se conserva sin modificaciones.

## Instagram y QR

La tarjeta de Instagram enlaza al perfil oficial:

`https://www.instagram.com/maison_steff/`

Los espacios para el QR de Instagram y el QR del sitio web están preparados dentro de la sección **Investigación y contacto**. El QR del sitio se reemplazará por el definitivo cuando la web se publique en GitHub Pages.

## Publicación futura en GitHub Pages

El proyecto está preparado para publicarse como sitio estático. El último paso queda pendiente hasta tener acceso a la cuenta o repositorio de GitHub:

1. Crear o conectar el repositorio.
2. Subir los archivos.
3. Activar GitHub Pages desde la rama principal.
4. Generar el QR de la URL publicada.
5. Sustituir el espacio reservado del QR.

Los documentos administrativos y assets fuente no utilizados permanecen en la computadora, pero están excluidos mediante `.gitignore` para evitar publicarlos accidentalmente.

## Funcionamiento sin internet

El proyecto no usa Google Fonts, CDN, Bootstrap, Tailwind, React ni recursos externos para mostrarse. Todo lo visual se encuentra dentro de la carpeta; únicamente el botón de Instagram requiere internet cuando se desea abrir el perfil.
