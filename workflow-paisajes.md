# Workflow para añadir un nuevo paisaje

**Versión 1.0 · 2026**
**Documento operativo del proyecto Paisaje Sonoro**

---

## Cómo usar este documento

Este documento describe el procedimiento para añadir una nueva grabación al archivo Paisaje Sonoro. Se entrega a la instancia ejecutora **junto con el briefing** cada vez que el responsable quiera publicar un nuevo paisaje.

El workflow está dividido en cinco pasos. Los pasos 1, 2, 3 y 5 los ejecuta el responsable humano; el paso 4 lo ejecuta la instancia.

Si en algún momento del proceso surge una duda no resuelta por este documento o por el briefing, la instancia ejecutora **debe preguntar** antes de improvisar.

---

## Paso 1 — Preparación en casa (responsable)

Antes de cualquier subida o trabajo digital, el responsable prepara los archivos en local.

### 1.1 Edición del audio

- Abrir la grabación bruta capturada en campo en la Tascam DP-32SD (o en software equivalente)
- Aplicar los criterios del **protocolo de edición** del briefing (sección 3):
  - Retirar conversaciones humanas inteligibles que identifiquen a personas concretas
  - Retirar pasajes de más de 2-3 minutos sin actividad acústica relevante
  - Retirar fallos técnicos puntuales (roces, golpes de viento, clicks)
  - Retirar eventos electrónicos individuales no representativos del lugar
- **No** aplicar ecualización, compresión, reducción de ruido ni ningún procesamiento acústico
- Aplicar fundidos técnicos de inicio y final (menos de 50 ms)
- Aplicar normalización global de nivel (sin alterar rango dinámico)
- Comprobar que la duración final está dentro de la horquilla del tipo de paisaje (ver sección 3 del briefing)

### 1.2 Exportación del audio

- Exportar versión definitiva como **WAV 16 bits / 44.1 kHz** (formato de archivo)
- Exportar también como **MP3 320 kbps** (formato de difusión)
- Comprobar que ambos archivos suenan correctamente

### 1.3 Selección de la fotografía

- Elegir 1 fotografía panorámica del lugar tomada el mismo día de la grabación
- La foto representa el paisaje, no el equipo de grabación
- Optimizar a **JPG/JPEG**, máximo 2400px en su lado mayor, calidad razonable. (El WebP ha dado problemas de perfil de color en este proyecto, por eso se prefiere JPG.)
- Nombre del archivo: **flexible**. Recomendado que empiece por el número del paisaje y permita identificar el tipo (ej: `001-isla-plana-foto.jpg` o `001 Isla Plana WEB.jpg`). Lo importante es que la URL exacta quede registrada después en el JSON.

### 1.4 Cumplimentación de la ficha

- Abrir la plantilla DOCX de ficha de campo
- Rellenar todos los datos capturados en campo (puede ser desde notas a mano)
- Guardar como `{id}-{slug}-ficha.docx` (ej: `001-isla-plana-ficha.docx`)
- Esta ficha **vive en el disco local del responsable** y nunca se sube a ningún servicio público

### 1.5 Verificación final antes de subir

- Audio MP3 ✓
- Audio WAV ✓
- Fotografía WebP optimizada ✓
- Ficha DOCX completa ✓
- Coordenadas GPS verificadas (cotejar con Iberpix del IGN si la altitud GPS es sospechosa)

---

## Paso 2 — Subida a Internet Archive (responsable)

Internet Archive es donde viven el audio y la fotografía de cada paisaje. GitHub solo guarda el código y los metadatos.

### 2.1 Crear nuevo item

- Entrar en `https://archive.org/upload`
- Si no se ha hecho nunca, registrar cuenta (gratuita, una sola vez)

### 2.2 Identificador del item

Patrón recomendado: `paisajesonoro-{id}-{slug}` (kebab-case minúsculas) o `PaisajeSonoro-{id}-{Slug}` (CamelCase). Cualquiera de las dos formas vale; la capitalización exacta queda fijada al crear el item y no debe cambiarse después. El identificador es único, irrepetible y no se reutiliza nunca.

Ejemplos válidos:
- `paisajesonoro-001-isla-plana`
- `PaisajeSonoro-001-IslaPlana`
- `paisajesonoro-015-mercado-veronicas`

### 2.3 Archivos a subir

Sube como mínimo el audio MP3 y la fotografía JPG. Puedes subir también la versión WAV (recomendado para archivado a largo plazo) y otros formatos auxiliares (HD, etc.). El nombre exacto de cada archivo es **flexible**: lo importante es que empiece por el número del paisaje y permita identificar el tipo (audio / imagen). Lo único innegociable es que las URLs exactas (item, MP3, JPG, y opcionalmente WAV) queden anotadas en el siguiente paso para registrarlas en el JSON.

Ejemplos de nombres válidos:
- `001-isla-plana-audio.mp3` y `001-isla-plana-foto.jpg`
- `001 Isla Plana Audio MP3.mp3` y `001 Isla Plana WEB.jpg`

### 2.4 Metadatos en Internet Archive

**Título**:
```
{Título ES} / {Título EN}
```
Ejemplo: `Playa de Isla Plana / Isla Plana Beach`

**Descripción** (campo bilingüe en este orden):

```
[ES]
Paisaje sonoro grabado en {lugar específico}, {municipio}, {comunidad}, España.
Fecha: {fecha} a las {hora_inicio}.
Duración publicada: {duracion} minutos.
Tipo de paisaje: {tipo_paisaje}.

Equipo: Tascam DR-60D MkII, par estéreo t.bone SC 140 en configuración NOS (90°, 30 cm), 16 bits / 44.1 kHz.

Forma parte del archivo Paisaje Sonoro: https://paisajesonoro.org

Licencia: Creative Commons BY-NC-SA 4.0

[EN]
Soundscape recorded at {specific place}, {municipality}, {community}, Spain.
Date: {date} at {start_time}.
Published duration: {duration} minutes.
Landscape type: {landscape_type}.

Equipment: Tascam DR-60D MkII, t.bone SC 140 stereo pair in NOS configuration (90°, 30 cm), 16-bit / 44.1 kHz.

Part of the Paisaje Sonoro archive: https://paisajesonoro.org

License: Creative Commons BY-NC-SA 4.0
```

**Tags** (separados por comas):

```
paisaje-sonoro, soundscape, field-recording, {municipio}, {tipo-paisaje}, murcia, spain
```

Ejemplo para Isla Plana:
```
paisaje-sonoro, soundscape, field-recording, cartagena, costero, murcia, spain
```

**Licencia**: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 (`CC BY-NC-SA 4.0`)

**Colección sugerida**: `community audio` (la colección abierta de Internet Archive)

**Idioma**: Spanish + English (Internet Archive permite múltiples)

### 2.5 Anotación de URLs

Una vez subido y procesado el item (puede tardar unos minutos), anotar las URLs definitivas:

- **URL del item completo**:
  `https://archive.org/details/paisajesonoro-001-isla-plana`

- **URL directa del MP3**:
  `https://archive.org/download/paisajesonoro-001-isla-plana/001-isla-plana-audio.mp3`

- **URL directa del WAV** (opcional, si se subió):
  `https://archive.org/download/paisajesonoro-001-isla-plana/001-isla-plana-audio.wav`

- **URL directa de la imagen**:
  `https://archive.org/download/paisajesonoro-001-isla-plana/001-isla-plana-foto.jpg`

**Reglas de las URLs (importantes):**

- **Usar siempre las URLs canónicas** `https://archive.org/details/...` y `https://archive.org/download/...`. **No** usar las URLs de los nodos CDN (tipo `https://dn711401.ca.archive.org/...` o `https://ia600109.us.archive.org/...`), porque son inestables y pueden dejar de funcionar si Internet Archive mueve el contenido. Las canónicas redirigen al CDN actual de forma transparente.
- **Sensibles a mayúsculas**: el `{item-id}` y los nombres de archivo deben respetar la capitalización exacta con la que se subieron a Internet Archive. Si el item es `PaisajeSonoro-001-IslaPlana`, no funciona como `paisajesonoro-001-islaplana`.
- **Codificación de espacios**: si los nombres de archivo contienen espacios, deben escribirse codificados como `%20` en la URL (ej: `001%20Isla%20Plana%20WEB.jpg`).

Estas URLs son las que se pasarán a la instancia ejecutora para que las integre tal cual en el JSON del paisaje.

---

## Paso 3 — Entrega a la instancia ejecutora (responsable)

### 3.1 Apertura de sesión

- Abrir nueva sesión de Claude Code en la carpeta local del repositorio `paisajesonoro`
- Verificar que la carpeta tiene los siguientes documentos en su raíz:
  - `briefing.md`
  - `workflow-paisajes.md`
  - El sitio web ya implementado (HTML, CSS, JS, JSON)

**Importante**: la sesión debe abrirse específicamente en la carpeta del repositorio `stan-dar/paisajesonoro`, no en una carpeta superior ni en otra carpeta del sistema. Esto garantiza que la instancia trabaja aislada y no puede acceder accidentalmente a otros proyectos del responsable (en particular `stan-dar/zonafotografia`).

### 3.2 Contexto inicial a la instancia

Pasar a la instancia los siguientes documentos como contexto:

1. `briefing.md` (marco general)
2. `workflow-paisajes.md` (este documento)
3. La ficha DOCX rellenada del paisaje
4. Las URLs de Internet Archive (item, MP3, WAV, imagen)

### 3.3 Encargo

Decir literalmente o equivalente:

> "Lee el briefing y el workflow de paisajes en su totalidad antes de actuar. Voy a añadir un nuevo paisaje al archivo. Aquí están los datos. Ejecuta el paso 4 del workflow."

---

## Paso 4 — Ejecución (instancia ejecutora)

La instancia ejecuta **todos** los siguientes subpasos en orden. No omite ninguno.

### 4.1 Lectura de la ficha DOCX

- Extraer todos los datos de la ficha rellenada
- Identificar:
  - Identificador y slug del paisaje
  - Datos de localización (coordenadas, altitud, rumbo, municipio, comunidad)
  - Datos temporales (fecha, hora inicio, hora fin, duración publicada)
  - Tipo de paisaje (debe ser uno de los 8 tipos cerrados; ver briefing sección 6)
  - Condiciones ambientales
  - Equipo técnico (deben coincidir con los valores estándar del briefing)
  - Descripción de sonidos (principales, fondo, incidencias, notas)

### 4.2 Validación de datos

Antes de seguir, verificar:

- ✓ El `id` es de tres dígitos con ceros a la izquierda
- ✓ El `slug` está en kebab-case minúsculas, sin acentos ni caracteres especiales
- ✓ El `tipo_paisaje` es uno de los valores cerrados de la lista (ver briefing sección 6)
- ✓ Las `coordenadas` son un array `[latitud, longitud]` en grados decimales
- ✓ La `duracion_publicada_seg` es ≥ 300 segundos (5 minutos), o tiene justificación explícita
- ✓ El `municipio` y la `comunidad` están en kebab-case minúsculas
- ✓ Las URLs de Internet Archive son accesibles y siguen el patrón correcto

Si alguna validación falla, **detener la ejecución y reportar al responsable**.

### 4.3 Creación de la entrada en `data/paisajes.json`

- Abrir `data/paisajes.json`
- Verificar que no existe ya una entrada con el mismo `id` o `slug` (evitar duplicados)
- Añadir nueva entrada con la estructura completa definida en el briefing (sección 6), respetando todos los campos:
  - Identificación: `id`, `slug`, títulos ES/EN, lugar específico ES/EN
  - Localización: `comunidad`, `municipio`, `coordenadas`, `altitud_m`, `rumbo_grados`
  - Temporal: `fecha`, `hora_inicio`, `hora_fin`, `duracion_publicada_seg` (entero en segundos; ej: 685 para 11 min 25 s)
  - Clasificación: `tipo_paisaje`, `estacion`, `tipo_dia`, `acontecimiento_es`/`acontecimiento_en` (opcional, para sesiones con un evento singular: "Sábado tarde", "Procesión de Viernes Santo", "Mercado semanal", etc.; si no aplica, dejar cadena vacía o omitir)
  - Condiciones: `viento`, `nubosidad`, `precipitacion`, `temperatura_c`, `humedad_pct`, `luz_lux`, etc.
  - Equipo: objeto `equipo` con todos los campos
  - URLs de Internet Archive (canónicas, ver paso 2.5)
  - Descripciones bilingües (1-3 frases narrativas en `descripcion_es`/`en`; `sonidos_principales_es`/`en`; `sonidos_fondo_es`/`en`; `incidencias_es`/`en`; `notas_campo_es`/`en`)
  - Estado, versión del protocolo, fecha de publicación
  - Historial: array con la entrada inicial `{ "fecha": "{hoy}", "accion": "publicado", "version_protocolo": "1.0" }`

### 4.4 Comprobación de existencia del municipio

- Abrir `data/municipios.json`
- Verificar si el municipio ya existe en el archivo

**Si NO existe**:
- Crear nueva entrada en `data/municipios.json` con la estructura definida en el briefing (sección 6)
- Buscar 2-3 frases descriptivas del municipio en Wikipedia (versión española e inglesa), adaptarlas (no copiar literal extenso), y añadir cita: *"Texto adaptado de Wikipedia, CC BY-SA 4.0"* con enlace al artículo
- Anotar las coordenadas del centro del municipio

**Si SÍ existe**:
- No modificar la entrada del municipio (ya está)

### 4.5 Creación del archivo HTML del paisaje

Crear el archivo en la ruta:

```
archivo/{comunidad}/{municipio}/{id}-{slug}.html
```

Ejemplo:
```
archivo/murcia/cartagena/001-isla-plana.html
```

**En la práctica, la página HTML funciona como plantilla rellenada dinámicamente por `js/paisaje.js` desde el JSON.** El procedimiento real es:

1. **Copiar** un paisaje ya existente como base (ej. `archivo/murcia/cartagena/001-isla-plana.html`).
2. **Guardar** con el nuevo nombre: `archivo/{comunidad}/{municipio}/{id}-{slug}.html`.
3. **Modificar únicamente los siguientes valores** (todo lo demás es plantilla y lo rellena el JS):
   - El bloque `<script>` antes de los demás scripts:
     - `window.PAISAJE_ID = '{nuevo-id}';`
     - `window.MAPA_CONFIG.center = [{lat}, {lng}];`
     - `window.MAPA_CONFIG.filtroPaisajeId = '{nuevo-id}';`
   - En el `<head>`:
     - `<title>` con el título real (ES como predeterminado)
     - `<meta name="description" data-es="..." data-en="..." content="...">` (150-160 caracteres ES + EN)
     - `<link rel="canonical">`, `<link rel="alternate" hreflang>` con la nueva URL absoluta
     - `<meta property="og:title">`, `og:description`, `og:url` con los valores nuevos
     - `<meta property="og:image">` y `<meta name="twitter:image">` apuntando a la `imagen_url` del paisaje
4. **Verificar la profundidad de las rutas relativas** a CSS y JS: si el paisaje está en `archivo/{comunidad}/{municipio}/`, las rutas son `../../../css/...` y `../../../js/...`. Esto no cambia entre paisajes mientras todos respeten esta jerarquía.

**El JS rellena automáticamente**: breadcrumb, título, lugar, fecha, audio, foto a sangre, descripción, sonidos, ficha técnica completa, pie de metadatos, navegación anterior/siguiente, enlace a Internet Archive y el JSON-LD de Schema.org. **No tocar nada de eso en el HTML.**

**Reglas obligatorias** (que ya cumple la plantilla; solo verificar):

- Toggle ES/EN visible y funcional
- Clases `.es` y `.en` en cada elemento de texto traducible
- Schema.org JSON-LD marcando como `AudioObject` (lo genera `paisaje.js`)
- Solo se muestra duración publicada (no se menciona el bruto)

### 4.6 Creación o actualización de la página del municipio

**Si es el primer paisaje del municipio**:

Crear el archivo `archivo/{comunidad}/{municipio}.html` siguiendo la plantilla estándar de página de municipio (briefing sección 8):

1. Cabecera (toggle ES/EN, breadcrumb)
2. Título del municipio y comunidad
3. Descripción geográfica (de `municipios.json`, con cita Wikipedia)
4. Mapa local Leaflet centrado en el municipio
5. Lista de paisajes (al menos el recién añadido) en formato de tarjetas
6. Footer estándar

**Si ya existe la página del municipio**:

No hace falta tocar el archivo HTML del municipio. Las páginas de municipio cargan los paisajes desde el JSON dinámicamente, así que el nuevo paisaje aparecerá automáticamente en la lista.

(Si la implementación actual no carga dinámicamente desde el JSON, sino que lista paisajes en HTML estático, entonces sí se actualiza el HTML del municipio para añadir la nueva tarjeta.)

### 4.7 Actualización del mapa principal

El archivo `archivo.html` carga los paisajes desde `data/paisajes.json` y crea los marcadores dinámicamente. Si la implementación es correcta, el nuevo paisaje aparecerá automáticamente en el mapa principal sin necesidad de tocar `archivo.html`.

(Si por alguna razón la implementación es estática, actualizar `archivo.html` para incluir el nuevo paisaje.)

### 4.8 Actualización del sitemap

Abrir `sitemap.xml` y añadir la nueva URL:

```xml
<url>
  <loc>https://paisajesonoro.org/archivo/{comunidad}/{municipio}/{id}-{slug}.html</loc>
  <lastmod>{fecha-publicacion}</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

Si es el primer paisaje del municipio, añadir también la URL de la página del municipio.

### 4.9 Commit y push (solo si el responsable lo autoriza explícitamente)

**Por defecto, no hacer push automáticamente.** El responsable decide cuándo publicar.

Cuando se autorice el push:

- Hacer commit con mensaje descriptivo: `Add {Título del paisaje} {id} paisaje page`
  - Ejemplo: `Add Isla Plana 001 paisaje page`
- Hacer push a GitHub

### 4.10 Reporte al responsable

Al terminar, listar al responsable:

- ✓ Entrada añadida en `data/paisajes.json`
- ✓ Entrada {creada/ya existía} en `data/municipios.json`
- ✓ Archivo HTML del paisaje creado en `{ruta}`
- ✓ {Página del municipio creada/Página del municipio ya existía}
- ✓ Sitemap actualizado
- ✓ {Commit y push realizados / Pendiente de autorización para push}

Y avisar al responsable que ejecute el paso 5.

---

## Paso 5 — Verificación (responsable)

Una vez la instancia haya completado el paso 4 y se haya autorizado y ejecutado el push:

### 5.1 Esperar la publicación

- GitHub Pages tarda 2-3 minutos en publicar los cambios después del push
- Esperar pacientemente

**Nota sobre verificación local antes del push** (opcional pero recomendado):

Si quieres revisar el paisaje en local antes de subirlo a producción, **no abras los archivos HTML directamente con doble clic**. Las páginas que cargan datos del JSON (`archivo.html`, `cartagena.html` y la propia página del paisaje) requieren un servidor HTTP porque el navegador bloquea `fetch()` sobre `file://`.

Opciones rápidas:
- **VS Code**: instalar la extensión *Live Server* y pulsar "Go Live" en la barra inferior. Abre la carpeta del proyecto en `http://localhost:5500/`.
- **Terminal**: desde la carpeta del proyecto, `python -m http.server 8000` y abrir `http://localhost:8000/`.

El `index.html` sí funciona con doble clic porque no carga datos.

### 5.2 Verificación en navegador

Visitar `https://paisajesonoro.org` y comprobar:

**Página individual del nuevo paisaje** (`/archivo/{comunidad}/{municipio}/{id}-{slug}.html`):

- ✓ Carga sin errores
- ✓ El reproductor de audio funciona y reproduce desde Internet Archive
- ✓ La fotografía se ve correctamente a 60vh
- ✓ El mapa Leaflet muestra la ubicación correcta con el zoom adecuado
- ✓ La ficha técnica muestra todos los datos correctamente
- ✓ La descripción aparece completa
- ✓ El toggle ES/EN funciona y traduce todo el contenido
- ✓ Los enlaces de navegación (anterior/siguiente, volver) funcionan

**Página del municipio** (`/archivo/{comunidad}/{municipio}.html`):

- ✓ Si era el primer paisaje del municipio: la página existe y se ve bien
- ✓ El nuevo paisaje aparece en la lista de tarjetas
- ✓ El mapa local muestra el marcador del nuevo paisaje
- ✓ La descripción del municipio aparece (si fue creada)

**Mapa principal** (`/archivo.html`):

- ✓ El nuevo paisaje aparece como marcador en la posición correcta
- ✓ Al hacer clic en el marcador se ve el popup correctamente
- ✓ El popup enlaza a la página individual del paisaje

**Sitemap y SEO**:

- ✓ `sitemap.xml` incluye la nueva URL
- ✓ Las metaetiquetas Open Graph se ven bien al compartir en redes (probar con `https://www.opengraph.xyz/`)

### 5.3 Acciones correctivas

Si alguna verificación falla:

- Reportar el problema concreto a la instancia ejecutora
- Pedir corrección específica
- Repetir el paso 5 tras la corrección

### 5.4 Cierre

Cuando todo esté correcto:

- Compartir el enlace del nuevo paisaje (redes sociales, contactos relevantes) si se desea
- Archivar la ficha DOCX en la carpeta local del proyecto
- Actualizar el contador de paisajes (si se lleva)

---

## Casos especiales

### Primer paisaje de una comunidad nueva (fuera de Murcia)

Si por primera vez se añade un paisaje fuera de la Región de Murcia (por ejemplo, en Andalucía o Aragón):

- La instancia debe crear las carpetas correspondientes: `archivo/{nueva-comunidad}/{nuevo-municipio}/`
- Crear o actualizar `data/municipios.json` con datos del municipio Y de la comunidad si fuese necesario
- Verificar que el mapa principal centra correctamente al haber paisajes fuera de Murcia (puede ser oportuno revisar el zoom y centro inicial de `archivo.html`)
- Notificar al responsable que se ha incorporado una comunidad nueva al archivo

### Paisaje que reemplaza una versión anterior

Si se decide republicar un paisaje con cambios (por ejemplo, una reedición tras revisión metodológica):

- **Mantener** el mismo `id` y `slug`
- **Conservar** el item original en Internet Archive como histórico
- Subir la nueva versión como item separado en Internet Archive (con identificador `paisajesonoro-{id}-{slug}-v2`)
- Actualizar las URLs en la entrada del JSON
- Añadir entrada al campo `historial` del JSON: `{ "fecha": "{hoy}", "accion": "actualizado", "cambio": "descripción del cambio" }`
- Actualizar `fecha_publicacion`

### Paisaje retirado del archivo

Si por alguna razón se decide retirar un paisaje del archivo público:

- **No eliminar** la entrada del JSON
- Cambiar el campo `estado` a `"retirado"`
- Añadir entrada al campo `historial`: `{ "fecha": "{hoy}", "accion": "retirado", "motivo": "..." }`
- La instancia debe modificar las páginas y mapas para no mostrar paisajes con estado `"retirado"`
- El item de Internet Archive puede mantenerse o retirarse según el caso

---

## Versionado del workflow

| Versión | Fecha | Cambios |
|---|---|---|
| 1.0 | Abril 2026 | Versión inicial. |
| 1.0.1 | Abril 2026 | Añadida nota sobre apertura de sesión específica en la carpeta del repositorio Paisaje Sonoro. |
| 1.0.2 | Mayo 2026 | Cambio de WebP a JPG para fotografías de paisaje (paso 1.3 y 2.3). Relajada la convención de nombres de archivo (paso 2.3) y de capitalización del identificador del item de Internet Archive (paso 2.2): se admite kebab-case y CamelCase. La regla innegociable pasa a ser que las URLs exactas queden registradas en el JSON. |
| 1.0.3 | Mayo 2026 | Actualizado el campo de duración de `duracion_publicada_min` (minutos) a `duracion_publicada_seg` (segundos) en pasos 4.2 y 4.3, alineado con briefing v1.0.4. |
| 1.0.4 | Mayo 2026 | Auditoría completa tras la publicación del primer paisaje (Isla Plana 001). Cambios: (a) paso 2.5 — añadidas reglas de URLs canónicas, sensibilidad a mayúsculas y codificación de espacios; (b) paso 4.3 — añadidos los campos `acontecimiento_es`/`en` y descripciones bilingües detalladas; (c) paso 4.5 — reescrito reflejando la realidad del flujo: la página HTML del paisaje funciona como plantilla rellenada por `paisaje.js` desde el JSON; basta con copiar un paisaje existente y modificar solo `PAISAJE_ID`, coordenadas del mapa y metadatos SEO; (d) paso 5.1 — añadida nota sobre Live Server / `python -m http.server` para verificación local. |

Cualquier modificación posterior se documenta en esta tabla.

---

*Workflow v1.0.4 — mayo de 2026*
*paisajesonoro.org*
