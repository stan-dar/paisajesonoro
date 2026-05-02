# Fases de implementación inicial

**Versión 1.0 · 2026**
**Documento de uso único para arrancar el sitio Paisaje Sonoro**

---

## Cómo usar este documento

Este documento describe las **6 fases** para implementar el sitio web Paisaje Sonoro desde el estado inicial hasta su publicación en `paisajesonoro.org`.

Se entrega a la instancia ejecutora **una sola vez**, junto con el briefing, en la primera sesión de implementación. Una vez completadas todas las fases, este documento queda como **archivo histórico** del proyecto y no se vuelve a usar para tareas operativas.

Para añadir paisajes al archivo (tarea recurrente), se usa el documento `workflow-paisajes.md`.

### Reglas estrictas durante la implementación

**1. Cada fase debe completarse y pasar revisión humana antes de iniciar la siguiente.** No se trabaja en paralelo en fases distintas. La instancia termina su fase, hace commit local (sin push), notifica al responsable y espera aprobación.

**2. El push a GitHub solo se ejecuta en la Fase 6.** Hasta entonces, todo el desarrollo es local. El responsable verifica los cambios abriendo los archivos HTML directamente en el navegador desde su disco local.

**3. La instancia ejecutora no avanza fases sin permiso explícito.** Al terminar cada fase, reporta lo hecho y espera la palabra del responsable para continuar.

**4. En caso de duda, preguntar.** Si alguna decisión necesaria no está cubierta por el briefing ni por este documento, la instancia ejecutora pregunta al responsable, no improvisa.

---

## Estado de partida

Antes de iniciar la Fase 1, el repositorio local debe contener:

- `briefing.md` (versión 1.0)
- `workflow-paisajes.md` (versión 1.0)
- `fases-implementacion.md` (este documento)
- `index.html` (versión inicial existente, con CSS embebido y problemas a corregir)
- `001-isla-plana.html` (borrador previo, puede usarse como referencia parcial)
- Imágenes Adobe Stock originales sin optimizar:
  - `AdobeStock_477306068.jpg` (ilustración de persona grabando entre árboles)
  - `AdobeStock_623218018.jpg` (onda gráfica decorativa)

El responsable trabaja con un editor de código local (VS Code u otro) y tiene Claude Code instalado para asistir en la implementación.

### Repositorio de trabajo

- **Repositorio único**: `stan-dar/paisajesonoro`
- **Carpeta local**: la que el responsable haya designado para este repositorio
- **URL provisional durante el desarrollo**: `https://stan-dar.github.io/paisajesonoro/` (activa ya, sirve para revisar cambios después de cada push)
- **URL definitiva de producción**: `https://paisajesonoro.org` (se activará en la Fase 6)

### Repositorios que NUNCA se tocan

El responsable mantiene otros repositorios bajo la cuenta `stan-dar` que **no forman parte de este proyecto** y nunca deben ser modificados, accedidos ni mencionados durante el desarrollo:

- `stan-dar/zonafotografia` (sitio profesional del estudio fotográfico, en producción y estable)
- Cualquier otro repositorio que pudiera existir en la cuenta del responsable

La instancia ejecutora trabaja **exclusivamente** dentro de la carpeta local del repositorio Paisaje Sonoro. Si por cualquier razón se detecta intención de tocar otra carpeta u otro repositorio, **detener la ejecución y pedir confirmación al responsable**.

---

## Fase 1 — Index reescrito

### Objetivo

Reescribir el index.html aplicando todas las decisiones del briefing. Pasar de CSS embebido a archivos externos. Establecer la base estructural y estética que heredarán las demás páginas.

### Tareas

**1.1 Estructura de carpetas**

Crear la estructura inicial del repositorio:

```
/css/
/js/
/img/
/data/
/archivo/
```

**1.2 Optimización de imágenes**

Procesar las dos imágenes Adobe Stock:

- `AdobeStock_477306068.jpg` → `img/hero-grabacion.webp`
  - Convertir a WebP
  - Redimensionar a máximo 1920px de ancho
  - Optimizar a 100-200 KB
- `AdobeStock_623218018.jpg` → `img/onda-acceso.webp`
  - Convertir a WebP
  - Optimizar a máximo 150 KB

**1.3 Extracción del CSS**

Crear `css/estilos.css` con:

- Todas las variables CSS del index actual en `:root`
- Todas las reglas de estilo del index actual
- Reorganizado por secciones con comentarios `/* === SECCIÓN === */`
- Preparado para ser compartido por todas las páginas del sitio

**1.4 Extracción del JavaScript de idioma**

Crear `js/lang.js` con:

- Función `setLang(l)` extraída del index actual
- Persistencia en `localStorage`
- Carga de idioma por defecto al cargar la página

**1.5 Reescritura del `index.html`**

- Enlazar al CSS externo: `<link rel="stylesheet" href="/css/estilos.css">`
- Enlazar al JS externo: `<script src="/js/lang.js" defer></script>`
- **Hero a sangre completa** con `hero-grabacion.webp`:
  - Imagen como `background-image` de la sección, `background-size: cover`
  - Altura mínima 85vh
  - Overlay sutil oscuro para legibilidad del texto
  - Texto superpuesto en blanco/arena claro
  - Texto: etiqueta proyecto + título "Paisaje Sonoro" + subtítulo + descripción
- **Botón de acceso al archivo** integrando `onda-acceso.webp` como elemento visual:
  - Sección posterior al hero
  - Botón clicable que enlaza a `/archivo.html`
  - Texto bilingüe: "Entrar al archivo" / "Enter the archive"
- **Sección Concepto** (mantener contenido del index actual)
- **Sección Método** (mantener contenido del index actual)
- **Sección Protocolo** (mantener los 9 puntos colapsables del index actual, actualizando el punto sobre versiones para reflejar que solo sobrevive la versión publicada)
- **Footer corregido por accesibilidad**:
  - Tamaño tipográfico mínimo 0.85rem
  - Color de texto: `var(--arena-claro)` o `var(--niebla)` sobre fondo `var(--tierra)`
  - Letter-spacing reducido a 0.05em en cuerpo
  - Contacto cambiado a `contacto@PaisajeSonoro.org` (visible) con `mailto:contacto@paisajesonoro.org` (href)
  - **Eliminar** completamente cualquier referencia al correo personal del responsable
- **SEO mínimo**:
  - `<title>Paisaje Sonoro · Archivo de paisajes sonoros documentados</title>`
  - Meta description ES + EN
  - Open Graph básico
  - Hreflang ES/EN

### Entregable de la Fase 1

- `/css/estilos.css`
- `/js/lang.js`
- `/img/hero-grabacion.webp`
- `/img/onda-acceso.webp`
- `/index.html` reescrito enlazando a los archivos externos

### Revisión humana antes de Fase 2

El responsable abre `/index.html` directamente en el navegador desde el disco local y verifica:

- ✓ El hero ocupa pantalla completa con la imagen a sangre
- ✓ El texto del hero se lee correctamente sobre la imagen
- ✓ El botón de acceso al archivo es visible y atractivo
- ✓ Las secciones Concepto, Método y Protocolo se ven como antes
- ✓ El footer es legible (contraste suficiente, tamaño adecuado)
- ✓ El correo personal ha desaparecido y aparece `contacto@PaisajeSonoro.org`
- ✓ El toggle ES/EN funciona y traduce todo el contenido
- ✓ El protocolo refleja que solo se conserva la versión publicada

Si todo está bien, el responsable autoriza pasar a la Fase 2.

---

## Fase 2 — Archivo con mapa interactivo

### Objetivo

Crear la puerta de entrada al archivo de grabaciones. Implementar el mapa Leaflet que actuará como interfaz principal para descubrir paisajes.

### Tareas

**2.1 Creación de `data/paisajes.json`**

Crear el archivo JSON inicial. Puede empezar como array vacío `[]` o con una entrada placeholder de Isla Plana 001 (datos provisionales que se completarán en la Fase 4).

**2.2 Creación de `data/municipios.json`**

Crear el archivo JSON inicial con la estructura definida en el briefing. Puede empezar vacío o con la entrada de Cartagena.

**2.3 Creación de `js/mapa.js`**

Lógica del mapa Leaflet con:

- Inicialización del mapa centrado en Región de Murcia (38.0, -1.5, zoom 9)
- Capa por defecto: CartoDB Voyager
- Capas alternativas: OpenTopoMap, OSM Standard
- Selector de capas (control nativo de Leaflet)
- Carga de paisajes desde `data/paisajes.json`
- Creación de marcadores con tooltip al hover y popup al clic
- Clustering con `Leaflet.markercluster` (cargado desde CDN)
- Atribución correcta en el footer del mapa

**2.4 Creación de `js/paisajes.js`**

Funciones auxiliares para:

- Cargar y parsear `paisajes.json`
- Filtrar paisajes por municipio, tipo, estación, año
- Renderizar la lista lateral textual

**2.5 Creación de `archivo.html`**

Estructura:

1. Cabecera con toggle ES/EN y breadcrumb (Inicio / Archivo)
2. Mapa principal Leaflet (ocupando la mayor parte de la pantalla)
3. Lista lateral con paisajes agrupados por municipio
4. Filtros opcionales por tipo de paisaje (selector con la lista cerrada definida en briefing sección 6)
5. Footer estándar

**2.6 Carga de Leaflet y plugins desde CDN**

```html
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.css" />
<link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.Default.css" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script src="https://unpkg.com/leaflet.markercluster@1.5.3/dist/leaflet.markercluster.js"></script>
```

### Entregable de la Fase 2

- `/data/paisajes.json` (vacío o con placeholder)
- `/data/municipios.json` (vacío o con placeholder)
- `/js/mapa.js`
- `/js/paisajes.js`
- `/archivo.html`

### Revisión humana antes de Fase 3

El responsable abre `/archivo.html` directamente en el navegador y verifica:

- ✓ El mapa carga correctamente con la capa Voyager
- ✓ El selector de capas funciona y permite cambiar a OpenTopoMap y OSM
- ✓ El mapa está centrado en Región de Murcia con zoom adecuado
- ✓ Si hay un paisaje placeholder, se ve el marcador con su tooltip y popup
- ✓ La lista lateral muestra correctamente los municipios (o un mensaje si está vacío)
- ✓ Los filtros por tipo de paisaje aparecen y son clicables
- ✓ El toggle ES/EN funciona en toda la página
- ✓ El footer es coherente con el del index

Si todo está bien, autorizar Fase 3.

---

## Fase 3 — Plantilla de página de municipio

### Objetivo

Crear la plantilla genérica de página de municipio con un caso real (Cartagena), validando que carga datos del JSON y se actualiza dinámicamente.

### Tareas

**3.1 Completar entrada de Cartagena en `data/municipios.json`**

- Nombre ES: "Cartagena"
- Nombre EN: "Cartagena"
- Comunidad: "murcia"
- Coordenadas centro: aproximadamente `[37.6057, -0.9866]`
- Descripción ES: 2-3 frases adaptadas de Wikipedia (https://es.wikipedia.org/wiki/Cartagena_(España))
- Descripción EN: equivalente del artículo en inglés
- URLs de Wikipedia ES y EN
- Atribución: "Texto adaptado de Wikipedia, CC BY-SA 4.0"

**3.2 Creación de `archivo/murcia/cartagena.html`**

Estructura:

1. Cabecera con toggle ES/EN, breadcrumb (Inicio / Archivo / Cartagena)
2. Título del municipio "Cartagena" + subtítulo "Región de Murcia"
3. Descripción geográfica (cargada desde `municipios.json`)
4. Cita y enlace al artículo de Wikipedia
5. Mapa local Leaflet centrado en Cartagena con sus paisajes marcados
6. Lista de paisajes en formato de tarjetas (cargadas desde `paisajes.json` filtradas por municipio)
7. Mensaje informativo si aún no hay paisajes
8. Footer estándar

**3.3 Plantilla de tarjeta de paisaje (reutilizable)**

Crear un componente visual de tarjeta con:

- Miniatura (imagen del paisaje desde Internet Archive)
- Título bilingüe
- Lugar específico
- Fecha
- Tipo de paisaje
- Botón "Escuchar" / "Listen"
- Enlace a la página individual

### Entregable de la Fase 3

- Entrada completa de Cartagena en `data/municipios.json`
- `/archivo/murcia/cartagena.html` funcional

### Revisión humana antes de Fase 4

El responsable abre `/archivo/murcia/cartagena.html` directamente en el navegador y verifica:

- ✓ La página carga sin errores
- ✓ El título y subtítulo aparecen correctamente
- ✓ La descripción de Wikipedia adaptada se ve bien con su cita
- ✓ El enlace a Wikipedia funciona y abre en nueva pestaña
- ✓ El mapa local Leaflet carga correctamente
- ✓ Si hay paisajes en Cartagena, aparecen las tarjetas
- ✓ Si no hay paisajes, aparece el mensaje informativo
- ✓ Los enlaces de breadcrumb funcionan
- ✓ El toggle ES/EN traduce todo el contenido

Si todo está bien, autorizar Fase 4.

---

## Fase 4 — Plantilla de paisaje individual

### Objetivo

Crear la primera página de paisaje completa (Isla Plana 001), validando toda la cadena de datos: ficha → JSON → HTML → publicación.

### Pre-requisito

Antes de la Fase 4, el responsable debe tener:

- Audio editado de Isla Plana 001 ya en Internet Archive (item `paisajesonoro-001-isla-plana`)
- Fotografía panorámica de Isla Plana en Internet Archive
- Ficha DOCX completa con todos los datos
- URLs directas de Internet Archive anotadas

(Si el audio aún no está editado, esta fase queda en pausa hasta que lo esté.)

### Tareas

**4.1 Completar entrada de Isla Plana 001 en `data/paisajes.json`**

Rellenar todos los campos según la ficha y los datos técnicos confirmados:

- ID: `001`
- Slug: `isla-plana`
- Datos de localización exactos
- Coordenadas: `[37.572883, -1.207950]` (verificadas)
- Altitud: 5 m (consultada en Iberpix)
- Datos temporales completos
- Tipo: `costero`
- Condiciones ambientales de la ficha
- Equipo estándar
- URLs de Internet Archive
- Descripciones bilingües (sonidos principales, fondo, incidencias, notas)

**4.2 Creación de `archivo/murcia/cartagena/001-isla-plana.html`**

Implementación completa de la plantilla de paisaje individual según briefing sección 8:

1. Cabecera con toggle ES/EN y breadcrumb completo (Inicio / Archivo / Cartagena / Isla Plana)
2. Título del paisaje + lugar específico + fecha
3. **Reproductor de audio** embebido desde Internet Archive (URL del MP3)
4. **Fotografía panorámica** a sangre 60vh desde Internet Archive
5. **Mapa Leaflet** ancho completo, altura 50vh, marcador único en `[37.572883, -1.207950]`, zoom 14, capa Voyager por defecto, selector de capas opcional discreto
6. **Ficha técnica** como tabla integrada con todos los datos del JSON: localización, altitud, fecha, hora, duración publicada, tipo, condiciones ambientales, equipo, configuración estéreo, frecuencia/bits, ganancia, altura del trípode
7. **Descripción narrativa**: sonidos principales, sonidos de fondo, incidencias, notas de campo (todos bilingües)
8. **Pie con metadatos**: duración publicada (no del bruto), fecha de grabación, fecha de publicación, versión del protocolo, enlace al item completo en Internet Archive
9. **Navegación**: anterior/siguiente paisaje del mismo municipio (si existen), volver al municipio Cartagena, volver al archivo principal
10. Footer estándar

**4.3 SEO completo de la página**

- `<title>Playa de Isla Plana · Paisaje Sonoro</title>` (versión EN: "Isla Plana Beach · Paisaje Sonoro")
- Meta description ES + EN específicas
- Open Graph: título, descripción, imagen (URL de Internet Archive), URL canonical
- Twitter Card
- Hreflang ES/EN
- Canonical URL
- Schema.org JSON-LD marcando como `AudioObject` con metadatos completos

### Entregable de la Fase 4

- Entrada completa de Isla Plana 001 en `data/paisajes.json`
- `/archivo/murcia/cartagena/001-isla-plana.html` completo y funcional
- El paisaje aparece automáticamente en el mapa principal de `archivo.html` y en la lista de tarjetas de `cartagena.html`

### Revisión humana antes de Fase 5

El responsable abre `/archivo/murcia/cartagena/001-isla-plana.html` directamente en el navegador y verifica:

- ✓ La página carga sin errores
- ✓ El reproductor de audio funciona y reproduce el MP3 desde Internet Archive
- ✓ La fotografía se ve correctamente a 60vh y bien encuadrada
- ✓ El mapa muestra exactamente la ubicación con zoom 14
- ✓ La ficha técnica está completa y bien formateada
- ✓ La descripción narrativa aparece en ambos idiomas
- ✓ El pie con metadatos es correcto y enlaza a Internet Archive
- ✓ Los enlaces de navegación funcionan
- ✓ El toggle ES/EN traduce todo
- ✓ La página se ve bien en móvil (responsive)
- ✓ Al volver al mapa principal, aparece el marcador de Isla Plana
- ✓ Al ir a Cartagena, aparece la tarjeta de Isla Plana

Si todo está bien, autorizar Fase 5.

---

## Fase 5 — Pulido y SEO

### Objetivo

Dejar el sitio listo para indexarse en Google, compartirse en redes y subirse a producción.

### Tareas

**5.1 Generación de `sitemap.xml`**

Crear automáticamente con todas las URLs del sitio:

- `https://paisajesonoro.org/`
- `https://paisajesonoro.org/archivo.html`
- `https://paisajesonoro.org/archivo/murcia/cartagena.html`
- `https://paisajesonoro.org/archivo/murcia/cartagena/001-isla-plana.html`
- (futuras páginas se añaden mediante el workflow de paisajes)

**5.2 Creación de `robots.txt`**

```
User-agent: *
Allow: /
Sitemap: https://paisajesonoro.org/sitemap.xml
```

**5.3 Creación de `favicon.ico`**

- Diseño mínimo provisional: SVG con una onda estilizada o las iniciales "PS"
- Convertir a `.ico` para máxima compatibilidad
- Ubicar en la raíz del repositorio

**5.4 Creación de `README.md`**

Bilingüe español/inglés con secciones:

- Qué es Paisaje Sonoro / What is Paisaje Sonoro
- Enlace al sitio público
- Estructura del repositorio
- Cómo añadir un nuevo paisaje (referencia a `workflow-paisajes.md`)
- Licencia (Creative Commons BY-NC-SA 4.0)
- Contacto

**5.5 Creación de `.gitignore`**

Con el contenido especificado en el briefing (sección 9).

**5.6 Creación de `CNAME`**

Un archivo de texto plano con una línea: `paisajesonoro.org`

**5.7 Verificación de Open Graph y Schema.org en todas las páginas**

Comprobar que todas las páginas existentes tienen:

- Open Graph completo
- Twitter Card
- Hreflang ES/EN
- Canonical URL

**5.8 Pruebas de accesibilidad**

- Ejecutar Lighthouse (Chrome DevTools) en `index.html`, `archivo.html`, `cartagena.html` y `001-isla-plana.html`
- Apuntar a puntuaciones 90+ en Accesibilidad
- Corregir cualquier problema crítico identificado

**5.9 Pruebas de velocidad**

- Ejecutar PageSpeed Insights
- Apuntar a puntuaciones 80+ en Performance
- Verificar que los Largest Contentful Paint (LCP) son razonables
- Optimizar lo que sea crítico

### Entregable de la Fase 5

- `/sitemap.xml`
- `/robots.txt`
- `/favicon.ico`
- `/README.md` bilingüe
- `/.gitignore`
- `/CNAME`
- Todas las páginas con SEO completo
- Informes de Lighthouse y PageSpeed Insights con puntuaciones aceptables

### Revisión humana antes de Fase 6

El responsable verifica:

- ✓ El sitemap incluye todas las páginas
- ✓ El robots.txt es correcto
- ✓ El favicon aparece en la pestaña del navegador
- ✓ El README es claro y bilingüe
- ✓ El .gitignore protege los archivos sensibles
- ✓ El CNAME contiene el dominio correcto
- ✓ Las páginas se comparten bien (probar con `https://www.opengraph.xyz/`)
- ✓ Lighthouse y PageSpeed dan puntuaciones razonables

Si todo está bien, autorizar Fase 6 (la decisión de subir a producción).

---

## Fase 6 — Subida a GitHub y configuración del dominio

### Objetivo

Publicar el sitio en producción en `https://paisajesonoro.org`.

### Tareas

**6.1 Push del repositorio a GitHub**

(Asumiendo que el repositorio remoto ya existe en `https://github.com/stan-dar/paisajesonoro`):

- `git add .`
- `git commit -m "Initial site implementation: index, archivo, Cartagena, Isla Plana 001"`
- `git push origin main`

(Si el repositorio remoto no existe aún, crearlo en GitHub primero, luego conectar el repositorio local con `git remote add origin ...` y hacer push.)

**6.2 Configuración de GitHub Pages**

- En GitHub: Settings → Pages
- Source: Deploy from a branch
- Branch: `main` / root
- Esperar el primer deploy (1-2 minutos)
- Verificar que el sitio está accesible en `https://stan-dar.github.io/paisajesonoro`

**6.3 Configuración del dominio personalizado**

- En GitHub: Settings → Pages → Custom domain
- Escribir: `paisajesonoro.org`
- GitHub creará el archivo CNAME en el repositorio (puede entrar en conflicto con el que ya hay; conservar el correcto)
- Activar "Enforce HTTPS" cuando esté disponible

**6.4 Configuración de DNS en Squarespace**

En el panel de Squarespace, añadir los siguientes registros DNS para `paisajesonoro.org`:

- 4 registros A apuntando a:
  - `185.199.108.153`
  - `185.199.109.153`
  - `185.199.110.153`
  - `185.199.111.153`
- 1 registro CNAME `www` apuntando a `stan-dar.github.io`

Para `paisajesonoro.com` (defensivo), configurar redirección 301 hacia `paisajesonoro.org`.

**6.5 Verificación del HTTPS**

- Esperar 5-30 minutos a que GitHub Pages emita el certificado SSL automáticamente (Let's Encrypt)
- Verificar que `https://paisajesonoro.org` carga con candado verde
- Activar "Enforce HTTPS" en la configuración de GitHub Pages

**6.6 Pruebas finales en producción**

Visitar `https://paisajesonoro.org` y verificar todo lo de la fase 4:

- ✓ El sitio carga en HTTPS
- ✓ El index se ve correctamente
- ✓ El botón al archivo lleva a `archivo.html`
- ✓ El mapa principal funciona
- ✓ La página de Cartagena funciona
- ✓ La página de Isla Plana 001 funciona y reproduce el audio
- ✓ El toggle ES/EN funciona en todas las páginas
- ✓ El correo `contacto@PaisajeSonoro.org` está configurado y reenvía correctamente

### Entregable final

- Sitio completo y funcional en `https://paisajesonoro.org`
- Repositorio GitHub público con todo el código
- HTTPS activo
- Primer paisaje (Isla Plana 001) publicado

### Cierre de la implementación inicial

A partir de este punto:

- Las fases descritas en este documento ya no se ejecutan
- Para añadir nuevos paisajes se sigue el procedimiento de `workflow-paisajes.md`
- Para cambios estructurales del sitio se modifica el briefing y se aplica el cambio puntual
- Este documento (`fases-implementacion.md`) queda en el repositorio como **archivo histórico** del proyecto

---

## Versionado del documento

| Versión | Fecha | Cambios |
|---|---|---|
| 1.0 | Abril 2026 | Versión inicial. |
| 1.0.1 | Abril 2026 | Añadida sección "Repositorio de trabajo" y "Repositorios que NUNCA se tocan" en estado de partida. Documentada la URL provisional `https://stan-dar.github.io/paisajesonoro/`. |

---

*Fases de implementación v1.0.1 — abril de 2026*
*paisajesonoro.org*
