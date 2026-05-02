# Briefing — Proyecto Paisaje Sonoro

**Versión 1.0 · 2026**
**Documento de referencia permanente para instancias ejecutoras**

---

## Cómo usar este documento

Este briefing es la fuente única de verdad sobre el proyecto Paisaje Sonoro. Cualquier instancia de Claude (Code, Chat o cualquier otra herramienta) que vaya a trabajar en el proyecto debe leer este documento **completo** antes de proponer o ejecutar cualquier acción.

El briefing recoge filosofía, arquitectura técnica, convenciones de código, criterios de diseño y reglas operativas. No es un documento decorativo: cada decisión que contiene se ha tomado deliberadamente y debe respetarse.

Si una decisión del briefing entra en conflicto con una petición puntual del usuario, la instancia ejecutora debe **señalar el conflicto y pedir confirmación** antes de actuar, no resolverlo silenciosamente.

Si el briefing no cubre una decisión necesaria, la instancia ejecutora debe **preguntar al usuario**, no improvisar.

Este documento se actualiza por versiones. Cualquier modificación queda documentada en su sección final.

### Documentos asociados

Este briefing se complementa con dos documentos operativos:

- **`workflow-paisajes.md`**: procedimiento paso a paso para añadir un nuevo paisaje al archivo. Se entrega junto con el briefing cada vez que el responsable va a publicar una nueva grabación.
- **`fases-implementacion.md`**: documento de uso único para la implementación inicial del sitio. Una vez completadas las fases, queda como archivo histórico.

### Aislamiento del repositorio de trabajo

El responsable mantiene varios repositorios en GitHub bajo la cuenta `stan-dar`. La instancia ejecutora **trabaja exclusivamente en el repositorio `stan-dar/paisajesonoro`** y dentro de su carpeta local correspondiente.

Reglas absolutas:

- **Nunca** modificar archivos fuera de la carpeta del repositorio Paisaje Sonoro
- **Nunca** acceder a otros repositorios del responsable, en particular `stan-dar/zonafotografia` (proyecto independiente, ya en producción y estable)
- **Nunca** ejecutar comandos `git` que afecten a otros repositorios o a configuración global de Git
- Si por error se detecta que se está trabajando en una ubicación equivocada, **detener la ejecución inmediatamente** y reportar al responsable

Esta separación protege otros proyectos del responsable de modificaciones accidentales.

---

## 1. Identidad del proyecto

### Qué es Paisaje Sonoro

Paisaje Sonoro es un archivo público y gratuito de paisajes sonoros documentados de la Región de Murcia (España), con vocación de extenderse al resto del territorio nacional. Cada entrada del archivo es una grabación de campo de un lugar concreto en un momento concreto, acompañada de su contexto geográfico, técnico y atmosférico completo.

El proyecto es bilingüe (español e inglés), de acceso libre, sin publicidad, sin monetización del contenido, y con licencia Creative Commons BY-NC-SA 4.0.

### En qué tradición se inscribe

Paisaje Sonoro hereda la tradición inaugurada por R. Murray Schafer y el World Soundscape Project en Vancouver en los años 70. Schafer planteó que el entorno acústico de un lugar es un objeto de estudio y documentación tan legítimo como su entorno visual. De su trabajo provienen los conceptos que estructuran el archivo: keynote sounds (sonidos de fondo que definen el carácter del lugar), sound signals (sonidos que destacan), soundmarks (sonidos identitarios únicos), y la práctica de la escucha atenta como método.

Hereda también la tradición de los archivos de campo contemporáneos: Radio Aporee, Cities and Memory, los archivos de paisaje sonoro de la BBC y de la NHK, el trabajo de Hildegard Westerkamp, Bernie Krause, Chris Watson y Gordon Hempton.

### Quién lleva el proyecto

Juan Fernando, fotógrafo profesional en Alhama de Murcia, propietario del estudio ZONA Fotografía. Trabaja bajo el alias online "Stan" o "stan-dar" en GitHub. El proyecto Paisaje Sonoro es una iniciativa personal de largo plazo, sin estructura jurídica formal en su fase actual.

### Filosofía y principios rectores

Estos principios son el marco ético y metodológico del proyecto. No son recomendaciones, son condiciones de existencia del archivo:

**Gratuidad permanente.** El acceso al archivo es libre y gratuito. No habrá nunca contenido de pago, suscripciones, ni paywall. El audio y las grabaciones son patrimonio público.

**Perdurabilidad.** El archivo aspira a durar décadas. Las decisiones técnicas se toman pensando en la sostenibilidad a largo plazo, no en la novedad puntual.

**Transparencia documental.** Los criterios de captura, edición y publicación son públicos. Cualquier oyente puede entender cómo se produjo lo que escucha.

**Bilingüismo total.** Toda página, todo metadato, toda descripción debe existir en español y en inglés. La traducción no es opcional.

**Accesibilidad.** El sitio debe ser usable por personas con limitaciones visuales, en conexiones lentas, en dispositivos modestos. Los estándares de accesibilidad WCAG son requisito mínimo.

**Respeto schaferiano.** Las grabaciones se editan según el protocolo (sección 3) pero nunca se procesan acústicamente. El sonido capturado se respeta.

**Stack libre y abierto.** Toda la infraestructura usa software y servicios libres o gratuitos: GitHub Pages, Internet Archive, OpenStreetMap, Leaflet.js, Creative Commons. No se introducen dependencias propietarias salvo absoluta necesidad.

**Escala humana.** El archivo crece al ritmo que su responsable puede sostener con calidad. No hay objetivos de cantidad. Una grabación bien hecha al mes es preferible a diez mal documentadas.

---

## 2. Equipo técnico de campo

### Hardware

- **Grabadora**: Tascam DR-60D MkII (4 canales simultáneos)
- **Micrófonos principales**: par estéreo t.bone SC 140 (cardioides, condensador de pequeña diafragma, 16.2 mV/Pa de sensibilidad, ruido propio 9.2 dB(A))
- **Micrófonos secundarios** (no se usan habitualmente para grabaciones de archivo por su menor sensibilidad): t.bone EM 9600 shotgun
- **Estación de mezcla**: Tascam DP-32SD (workstation hardware multitrack para edición sin PC)

### Configuración estéreo de captura

**Técnica NOS (Nederlandse Omroep Stichting)** como configuración por defecto del par SC 140:

- **Ángulo entre ejes**: 90° (45° a cada lado del eje central)
- **Separación entre cápsulas**: 30 cm exactos (membrana a membrana)
- **Geometría del montaje**: stereo bar con barra de separación de 13.5 cm; los micros se sujetan por el centro y se cruzan virtualmente detrás del bar a la altura de las clavijas XLR; los cuerpos no chocan físicamente
- **Altura del trípode**: 80-100 cm habitual, registrada en cada ficha
- **Orientación**: el eje central apunta hacia la fuente principal del paisaje

Variantes admisibles según el lugar:

- **ORTF** (110°, 17 cm) para paisajes abiertos sin foco único
- **XY coincidente** (90°, 0 cm) cuando se requiere monocompatibilidad estricta

La técnica usada se documenta en cada grabación.

### Parámetros de grabación

- **Frecuencia de muestreo**: 44.1 kHz
- **Profundidad**: 16 bits
- **Formato**: WAV
- **Modo**: 4CH en la DR-60D
- **Limiter**: OFF
- **Low cut**: OFF
- **Delay entre canales**: 0 ms
- **Plug-in power**: OFF
- **Ganancia**: HIGH por defecto en pistas 1-2, ajustada según el nivel del paisaje

### Razones de la elección técnica

El par SC 140 en NOS captura paisajes sonoros con sensibilidad alta y ruido propio bajo, lo que permite documentar entornos silenciosos (amaneceres, interiores, ambientes contemplativos) con detalle real. El formato 16/44.1 garantiza compatibilidad universal y archivado eficiente. La DP-32SD permite edición sin PC, alineada con el flujo hardware preferido por el operador.

---

## 3. Protocolo de edición

El protocolo de edición vive en el index del sitio público y rige todas las decisiones sobre qué se publica y cómo. Su contenido íntegro es:

### Filosofía del archivo

Paisaje Sonoro entiende cada grabación como un documento acústico del lugar y del momento, no como una composición artística ni como una reproducción neutra. El archivo es el resultado de una escucha atenta y de unas decisiones explícitas: qué grabar, cuándo grabar, cómo presentar lo grabado.

> *"Un paisaje sonoro consiste en eventos escuchados, no en objetos vistos."* — R. Murray Schafer

### Política de versiones

Cada sesión de campo genera una **única versión publicada**: una selección temporal de la grabación bruta, con criterios explícitos de edición, pensada como experiencia de escucha representativa del lugar.

La grabación bruta original puede conservarse o no a criterio del operador, pero **no forma parte del archivo público**. Lo que se publica es la versión curada.

### Duración de la versión publicada

- **5 a 8 minutos** para paisajes de densidad acústica alta y variación rápida
- **8 a 12 minutos** para paisajes de densidad e interés medios
- **12 a 18 minutos** para paisajes contemplativos o muy sutiles
- **Más de 18 minutos** solo para paisajes con narrativa temporal propia, justificado en metadatos
- **No se publican grabaciones de menos de 5 minutos** salvo justificación metodológica explícita

### Criterios de edición: qué se retira

Únicamente por selección temporal, nunca por filtrado acústico:

- **Intrusiones acústicas identificadas**: conversaciones humanas inteligibles
- **Pasajes prolongados sin actividad**: más de dos o tres minutos sin cambios significativos
- **Fallos técnicos puntuales**: roces, golpes de viento, fallos del trípode, clicks
- **Eventos electrónicos no representativos**: dispositivos individuales que dominan circunstancialmente

### Criterios de preservación: qué nunca se retira

- **Textura humana no individualizada**: voces lejanas, risas, pasos, conversaciones ininteligibles
- **Sonidos naturales del lugar**: olas, viento, lluvia, aves, insectos, follaje, agua, animales
- **Sonidos infraestructurales del entorno**: tráfico lejano, campanas, sirenas, trenes, aviones, obras

### Principio inviolable

El orden temporal de los sonidos nunca se altera. Se pueden retirar fragmentos, pero nunca reorganizarlos, duplicarlos ni intercalar material de otras grabaciones. El tiempo es parte del paisaje.

### Procesamiento acústico

La versión curada no aplica ningún procesamiento que altere el contenido acústico. No se usan ecualizadores, compresores, reducción de ruido, reverberación añadida, cambios de pitch, reajustes de estereofonía.

Únicamente se admiten:

- **Fundidos técnicos** de inicio y final inferiores a 50 ms para evitar clicks
- **Normalización de nivel global** sin alterar el rango dinámico

### Consideraciones éticas

Las personas cuyas voces aparecen no han dado consentimiento individual; por eso las conversaciones inteligibles se retiran. Los eventos públicos (procesiones, fiestas) son excepción legítima.

### Documentación de la edición

Cada grabación publicada incluye en sus metadatos: geolocalización, hora, fecha, equipo, condiciones meteorológicas y demás datos de la ficha de campo.

---

## 4. Identidad y dominio

### Dominios registrados

- **Principal**: `paisajesonoro.org` (registrado en Squarespace, 2026)
- **Defensivo**: `paisajesonoro.com` (con redirección 301 hacia .org)

### Convenciones tipográficas

- **Lectura humana**: `PaisajeSonoro.org` con CamelCase
- **Código y enlaces**: `paisajesonoro.org` en minúsculas

Los dominios son insensibles a mayúsculas (RFC 4343), por lo que ambas formas funcionan técnicamente. La distinción es de comunicación visual.

### Correo de contacto

- **Público**: `contacto@PaisajeSonoro.org` (visible) con `mailto:contacto@paisajesonoro.org` en el código
- **Reenvía a**: cuenta personal del responsable (no aparece nunca en el sitio público)
- **El correo personal** del responsable no debe aparecer en ninguna página pública del sitio

### Configuración técnica con GitHub Pages

Cuando se conecta el dominio a GitHub Pages:

1. En Settings → Pages → Custom domain: `paisajesonoro.org`
2. En el panel DNS de Squarespace, configurar:
   - 4 registros A apuntando a las IPs de GitHub Pages: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - 1 CNAME `www` apuntando a `stan-dar.github.io`
3. Crear archivo `CNAME` en la raíz del repositorio con una línea: `paisajesonoro.org`
4. Verificar HTTPS automático (Let's Encrypt vía GitHub Pages)

---

## 5. Arquitectura técnica del archivo

### Stack tecnológico

- **Hosting de medios**: Internet Archive (`archive.org`)
- **Hosting del sitio web**: GitHub Pages (repositorio `stan-dar/paisajesonoro`)
- **Mapas**: Leaflet.js + OpenStreetMap (capa principal CartoDB Voyager)
- **Tipografías**: Google Fonts (Cormorant Garamond + Jost)
- **Idiomas**: HTML estático con clases `.es` y `.en` y JavaScript de toggle

### URLs del sitio

- **URL provisional de desarrollo**: `https://stan-dar.github.io/paisajesonoro/` (activa durante la implementación, hasta la Fase 6 del documento `fases-implementacion.md`)
- **URL definitiva de producción**: `https://paisajesonoro.org` (activa tras la configuración del dominio personalizado en la Fase 6)

Durante el desarrollo, los enlaces internos del sitio deben usar **rutas relativas** (no absolutas) para que funcionen tanto en la URL provisional como en la definitiva sin necesidad de modificarlos. Solo las URLs canónicas, hreflang, Open Graph y sitemap usan la URL definitiva `https://paisajesonoro.org`.

### División de almacenamiento

| Contenido | Ubicación | Razón |
|---|---|---|
| HTML, CSS, JS | GitHub Pages | Código y estructura |
| JSON con datos del archivo | GitHub Pages | Datos estructurados, ligeros |
| Audio (MP3 + WAV) | Internet Archive | Archivos pesados, archivado permanente |
| Fotografías de paisajes | Internet Archive | Archivos pesados, archivado permanente |
| Imágenes del index | GitHub Pages | Solo 2 imágenes, optimizadas |
| Fichas DOCX rellenadas | Disco local del responsable | Archivo de trabajo personal |

GitHub almacena código y datos. Internet Archive almacena media pesada. Las fichas DOCX son herramienta personal de trabajo y no se suben a ningún servicio público.

### Estructura del repositorio

```
/
├── index.html                            Presentación + protocolo
├── archivo.html                          Mapa interactivo + acceso a paisajes
├── archivo/
│   └── murcia/
│       ├── cartagena.html                Índice del municipio
│       └── cartagena/
│           ├── 001-isla-plana.html
│           └── 002-...html
├── data/
│   ├── paisajes.json                     Datos de todas las grabaciones
│   └── municipios.json                   Datos de los municipios
├── css/
│   └── estilos.css                       CSS compartido
├── js/
│   ├── lang.js                           Toggle ES/EN
│   ├── mapa.js                           Lógica del mapa Leaflet
│   └── paisajes.js                       Renderizado dinámico desde JSON
├── img/
│   ├── hero-grabacion.jpg                Imagen del hero
│   └── onda-acceso.png                   Imagen del botón al archivo
├── CNAME                                 Dominio personalizado
├── favicon.ico
├── robots.txt
├── sitemap.xml                           Generado automáticamente
├── .gitignore
├── README.md                             Bilingüe ES/EN
├── briefing.md                           Marco permanente del proyecto
└── workflow-paisajes.md                  Procedimiento de adición de paisajes
```

### Convenciones de URL

- Numeración correlativa global: `001`, `002`, `003`... siempre tres dígitos con ceros a la izquierda (permite hasta 999 paisajes con orden alfabético = orden numérico)
- Slug descriptivo en kebab-case: `001-isla-plana`, `002-fuente-del-hilo`
- Jerarquía nacional preparada: `/archivo/{comunidad}/{municipio}/{id}-{slug}.html`
- Por ahora solo se usa Murcia, pero la estructura admite cualquier comunidad sin modificación

---

## 6. Modelo de datos: JSON central

### `data/paisajes.json`

Fuente única de verdad sobre las grabaciones. Cualquier cambio en datos de un paisaje se hace aquí; las páginas HTML, los mapas y los índices se generan o actualizan a partir de este archivo.

Estructura por entrada:

```json
{
  "id": "001",
  "slug": "isla-plana",
  "titulo_es": "Playa de Isla Plana",
  "titulo_en": "Isla Plana Beach",
  "lugar_especifico_es": "Baños de la Marrana",
  "lugar_especifico_en": "Baños de la Marrana",
  "comunidad": "murcia",
  "municipio": "cartagena",
  "coordenadas": [37.572883, -1.207950],
  "altitud_m": 5,
  "rumbo_grados": 86,
  "fecha": "2026-04-18",
  "hora_inicio": "19:15",
  "hora_fin": "20:25",
  "duracion_publicada_seg": 720,
  "tipo_paisaje": "costero",
  "estacion": "primavera",
  "tipo_dia": "fin-de-semana",
  "acontecimiento_es": "Sábado tarde",
  "acontecimiento_en": "Saturday afternoon",
  "viento": "calma",
  "nubosidad": "despejado",
  "precipitacion": "ninguna",
  "temperatura_c": null,
  "humedad_pct": null,
  "luz_lux": 3381,
  "campo_magnetico_ut": "40/44/1",
  "satelites_fijo_visible": "23/33",
  "error_horizontal_m": 3.8,
  "equipo": {
    "grabadora": "Tascam DR-60D MkII",
    "microfonos": "t.bone SC 140 (par estéreo)",
    "configuracion": "NOS — 90° entre ejes, 30 cm entre cápsulas",
    "frecuencia_muestreo_khz": 44.1,
    "bits": 16,
    "modo": "estéreo",
    "ganancia": "high",
    "altura_tripode_cm": 140
  },
  "audio_url": "https://archive.org/download/paisajesonoro-001-isla-plana/audio.mp3",
  "audio_url_wav": "https://archive.org/download/paisajesonoro-001-isla-plana/audio.wav",
  "imagen_url": "https://archive.org/download/paisajesonoro-001-isla-plana/foto.jpg",
  "internet_archive_url": "https://archive.org/details/paisajesonoro-001-isla-plana",
  "descripcion_es": "...",
  "descripcion_en": "...",
  "sonidos_principales_es": "...",
  "sonidos_principales_en": "...",
  "sonidos_fondo_es": "...",
  "sonidos_fondo_en": "...",
  "incidencias_es": "...",
  "incidencias_en": "...",
  "notas_campo_es": "...",
  "notas_campo_en": "...",
  "estado": "publicado",
  "version_protocolo": "1.0",
  "fecha_publicacion": "2026-04-26",
  "historial": [
    { "fecha": "2026-04-26", "accion": "publicado", "version_protocolo": "1.0" }
  ]
}
```

### `data/municipios.json`

Datos de los municipios donde hay grabaciones. Se actualiza automáticamente cuando se añade el primer paisaje de un municipio nuevo.

```json
{
  "cartagena": {
    "nombre_es": "Cartagena",
    "nombre_en": "Cartagena",
    "comunidad": "murcia",
    "comunidad_nombre_es": "Región de Murcia",
    "comunidad_nombre_en": "Region of Murcia",
    "coordenadas_centro": [37.6057, -0.9866],
    "descripcion_es": "Texto adaptado de Wikipedia (CC BY-SA 4.0)...",
    "descripcion_en": "Text adapted from Wikipedia (CC BY-SA 4.0)...",
    "wikipedia_url_es": "https://es.wikipedia.org/wiki/Cartagena_(España)",
    "wikipedia_url_en": "https://en.wikipedia.org/wiki/Cartagena,_Spain"
  }
}
```

### Lista cerrada de tipos de paisaje

Los valores admitidos en el campo `tipo_paisaje` son exclusivamente:

- `costero` — orillas, calas, puertos, paseos marítimos
- `sierra-monte` — sierras y zonas montañosas
- `huerta-vega` — huertas de regadío, vegas de río
- `ribera` — orillas de río, ramblas, fuentes, charcas
- `urbano` — calles, plazas, mercados de ciudad
- `rural` — pueblos pequeños, caminos, campos cultivados
- `industrial` — puertos comerciales, polígonos, ferrocarriles, aeropuertos
- `patrimonio` — interiores de iglesias, castillos, yacimientos, cuevas
- `tradicion` — encuentros de cuadrillas, procesiones, romerías, cantos religiosos o festivos en la calle, eventos colectivos con dimensión cultural o ritual

No se usa "Otro" ni "Periurbano". Si una grabación es mixta, se clasifica por el elemento dominante. La categoría `tradicion` describe un evento humano colectivo y puede coexistir físicamente con `urbano`, `rural` o `patrimonio`; en ese caso, si el evento es lo dominante, se clasifica como `tradicion`.

---

## 7. Diseño visual y gestión de imágenes

### Paleta de colores (variables CSS)

Definida en `:root` del archivo `estilos.css`:

```css
--tierra: #3d2b1f;
--tierra-medio: #6b4c38;
--arena: #c4a882;
--arena-claro: #e8d9c4;
--papel: #f5ede0;
--musgo: #5a6b4a;
--musgo-claro: #8a9e78;
--piedra: #8c7b6e;
--niebla: #d4c9bb;
--blanco: #faf6f0;
```

### Tipografías

- **Títulos y citas**: Cormorant Garamond (serif, ligero, italic disponible)
- **Cuerpo y UI**: Jost (sans-serif geométrica, pesos 200-400)
- Cargadas desde Google Fonts con `display=swap`

### Reglas de accesibilidad mínima

- **Tamaño de cuerpo de texto**: nunca por debajo de 0.85rem (≈ 13.6px)
- **Tamaño de etiquetas con letter-spacing**: nunca por debajo de 0.7rem
- **Contraste de texto**: mínimo WCAG AA (4.5:1 para texto normal, 3:1 para texto grande). Sobre fondos oscuros usar `--arena-claro` o `--niebla`, nunca `--tierra-medio`
- **Letter-spacing en cuerpo**: máximo 0.05em
- **Letter-spacing en etiquetas**: hasta 0.2-0.3em pero solo con tamaño suficiente

### Reglas de imágenes

**Formatos:**

- Fotografías: **JPG/JPEG** (preferido por estabilidad de perfil de color en navegadores y en Internet Archive; el WebP ha dado problemas reales en este proyecto)
- Iconos y formas: SVG
- Logos con transparencia: PNG optimizado
- Nunca: GIF para fotografías, BMP, TIFF

**Pesos máximos:**

- Hero del index: 200 KB máximo (idealmente 100-150 KB)
- Imágenes del index decorativas: 150 KB máximo
- Imágenes de paisajes (en Internet Archive): sin límite estricto, pero optimizadas a calidad razonable
- Iconos: 20 KB máximo (preferir SVG)

**Dimensiones máximas:**

- Hero del index: 1920px de ancho
- Imágenes de paisajes: 2400px en su lado mayor
- Miniaturas: 600px de ancho

**Naming:**

- Todo en kebab-case minúsculas
- Patrón: `{tipo}-{descripcion}.{ext}`
- Ejemplos correctos: `hero-grabacion.webp`, `001-isla-plana-orilla.webp`
- Ejemplos incorrectos: `AdobeStock_477306068.jpg`, `Foto Panorámica.jpg`

**Proceso obligatorio:**

- Toda imagen pasa por optimización (TinyPNG, Squoosh o equivalente) antes de subirse
- La instancia ejecutora **rechaza** subir imágenes que excedan los pesos máximos sin optimización previa

### Hero del index

- Imagen `hero-grabacion.webp` a sangre, ancho completo, altura mínima 85vh
- Texto superpuesto en blanco/arena claro sobre overlay sutil oscuro
- La imagen es el hero, no decora el hero

### Botón de acceso al archivo

- Imagen `onda-acceso.webp` integrada como elemento visual de un botón clicable
- Lleva a `archivo.html`
- Ubicado en la primera parte del index, antes de las secciones largas de contexto

### Multilingüismo

**Obligatorio en TODA página del sitio sin excepción:**

- Toggle ES/EN visible en esquina superior derecha (posición fija)
- Clases `.es` y `.en` aplicadas a cada elemento de texto traducible
- Script `setLang(l)` cargado desde `js/lang.js`
- Por defecto se carga español; el usuario puede cambiar con persistencia en `localStorage`

Una página sin traducción se considera incompleta.

### Mapas

**Tecnología**: Leaflet.js cargado desde CDN (`unpkg.com/leaflet@1.9.4`).

**Capa por defecto**: CartoDB Voyager

```
https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png
```

Atribución: `© OpenStreetMap contributors, © CARTO`

**Capas alternativas seleccionables**:

- OpenTopoMap (para paisajes montañosos)
- OSM Standard (para máximo detalle de calles)

**Mapa principal de `archivo.html`**:

- Centrado inicialmente en Región de Murcia (lat 38.0, lng -1.5, zoom 9)
- Marcadores agrupables con `Leaflet.markercluster` (CDN)
- Tooltip al hover con título y fecha
- Popup al clic con miniatura + título + botón "Escuchar"
- Lista lateral o inferior con los paisajes organizados por municipio

**Mapas individuales en páginas de paisaje**:

- 100% del ancho del contenedor, altura 50vh
- Centrado en la coordenada exacta del paisaje, zoom 14
- Un único marcador
- Sin clustering
- Selector de capas opcional discreto en la esquina

---

## 8. Estructura de las páginas

### `index.html`

**Función**: presentación del proyecto, contexto filosófico, protocolo.

**Secciones (en este orden)**:

1. **Hero** — imagen a sangre + título "Paisaje Sonoro" + subtítulo + descripción breve
2. **Botón de acceso al archivo** — imagen `onda-acceso.webp` integrada, lleva a `archivo.html`
3. **Concepto** — qué es un paisaje sonoro, tradición de Schafer
4. **Método** — cómo se trabaja (4 puntos: referencia, lugar, condiciones, audio+documentación)
5. **Protocolo** — los 9 puntos del protocolo de edición (sección 3 de este briefing) en formato `<details>` colapsable
6. **Footer** — marca, contacto (`contacto@PaisajeSonoro.org`), licencia, enlace a Internet Archive

**Notas**:

- Página estática, no carga datos dinámicos
- No tiene reproductor de audio ni listado de paisajes (eso está en `archivo.html`)

### `archivo.html`

**Función**: puerta de entrada al archivo. Mapa interactivo y navegación.

**Secciones**:

1. **Cabecera** — toggle ES/EN, breadcrumb (Inicio / Archivo)
2. **Mapa principal** — Leaflet con todos los paisajes marcados
3. **Lista lateral** — paisajes agrupados por municipio
4. **Filtros opcionales** — por tipo de paisaje, por estación, por año
5. **Footer** — estándar

### `archivo/{comunidad}/{municipio}.html`

**Función**: página de un municipio con sus paisajes.

**Secciones**:

1. **Cabecera** — toggle ES/EN, breadcrumb
2. **Título del municipio** y comunidad autónoma
3. **Descripción geográfica** — 2-3 frases adaptadas de Wikipedia, con cita y enlace al artículo (CC BY-SA 4.0)
4. **Mapa local** — Leaflet centrado en el municipio con sus paisajes marcados
5. **Lista de paisajes** — tarjetas con miniatura, título, fecha, tipo, enlace
6. **Mensaje informativo** si aún no hay grabaciones
7. **Footer** — estándar

### `archivo/{comunidad}/{municipio}/{id}-{slug}.html`

**Función**: página individual de un paisaje. Es donde se escucha y consulta.

**Secciones (en este orden)**:

1. **Cabecera** — toggle ES/EN, breadcrumb completo
2. **Título del paisaje** + lugar específico + fecha
3. **Reproductor de audio** — embebido, sirve desde Internet Archive, prominente
4. **Fotografía** — panorámica a sangre completa, altura 60vh, sirve desde Internet Archive
5. **Mapa Leaflet** — ancho completo, altura 50vh, marcador único
6. **Ficha técnica** — tabla integrada con todos los datos del JSON
7. **Descripción** — sonidos principales, sonidos de fondo, incidencias, notas de campo
8. **Pie con metadatos** — duración publicada, fechas, versión del protocolo, enlace al item en Internet Archive
9. **Navegación** — anterior/siguiente paisaje del mismo municipio, volver al municipio, volver al archivo
10. **Footer** — estándar

**Importante**: solo se muestra la duración de la versión publicada, no se hace referencia a la grabación bruta original.

### Footer estándar (común a todas las páginas)

- Nombre del proyecto: "Proyecto Paisaje Sonoro"
- Contacto: `contacto@PaisajeSonoro.org` (visible) con `mailto:contacto@paisajesonoro.org` en el `href`
- Licencia: Creative Commons BY-NC-SA 4.0
- Enlace a Internet Archive donde están alojados los medios
- Enlace al repositorio GitHub (opcional)
- Texto bilingüe ES/EN

**Reglas de accesibilidad**:

- Tamaño mínimo 0.85rem
- Texto en `--arena-claro` o `--niebla` sobre fondo `--tierra`
- Letter-spacing máximo 0.05em en cuerpo

---

## 9. Convenciones técnicas y de código

### Formato de archivos

- **Indentación**: 2 espacios para HTML, CSS, JS, JSON
- **Saltos de línea**: LF (Unix), no CRLF (Windows)
- **Codificación**: UTF-8 sin BOM
- **Líneas máximas**: 100 caracteres recomendado, 120 absoluto

### CSS

- Archivo único `css/estilos.css` para todo el sitio
- Variables CSS centralizadas en `:root`
- Organización por secciones con comentarios `/* === NOMBRE === */`
- Mobile first o desktop first según convenga, pero consistente
- Media queries de responsive

### Convenciones de nombres

- **Archivos**: kebab-case minúsculas (`mapa.js`, `001-isla-plana.html`)
- **Clases CSS**: kebab-case (`.proto-item`, `.reg-card`)
- **IDs CSS**: kebab-case, solo cuando sean estrictamente necesarios
- **Variables JS**: camelCase (`paisajeActual`)
- **Constantes JS globales**: UPPER_SNAKE_CASE (`TIPOS_PAISAJE`)
- **IDs de paisajes**: tres dígitos con ceros (`001`, `002`)

### Comentarios en código

- HTML: `<!-- SECCIÓN: nombre -->` antes de cada bloque principal
- CSS: `/* === NOMBRE === */` antes de bloques temáticos
- JavaScript: comentario al inicio de cada función, una línea explicando qué hace
- Idioma de los comentarios: español (consistencia interna)

### Mensajes de commit en GitHub

- En **inglés**, en imperativo, claros, atómicos
- Ejemplos correctos: `Add Isla Plana 001 paisaje page`, `Fix footer accessibility contrast`, `Update protocol version to 1.1`
- Ejemplos incorrectos: `cambios`, `varias cosas`, `arreglar`
- Un commit = una unidad lógica de cambio

### Archivos de configuración del repositorio

**`.gitignore`**:

```
# Sistema operativo
.DS_Store
Thumbs.db
desktop.ini

# Editores
.vscode/
.idea/
*.swp
*~

# Archivos personales del proyecto
fichas-trabajo/
audio-bruto/
fotos-originales/
notas-personales/

# Temporales
*.log
*.tmp
node_modules/

# Office en edición
~$*.docx
~$*.xlsx
```

**`CNAME`**: una línea con `paisajesonoro.org`

**`robots.txt`**:

```
User-agent: *
Allow: /
Sitemap: https://paisajesonoro.org/sitemap.xml
```

**`sitemap.xml`**: regenerado automáticamente cada vez que se añade una página. La instancia ejecutora actualiza este archivo al crear cualquier nueva página HTML.

**`favicon.ico`**: icono mínimo en SVG mientras no haya diseño definitivo.

**`README.md`**: bilingüe español/inglés, con secciones:

- Qué es Paisaje Sonoro
- Enlace al sitio público
- Estructura del repositorio
- Cómo añadir un nuevo paisaje (referencia al workflow)
- Licencia

### SEO y metadatos por página

Cada página HTML debe incluir:

- `<title>` específico, no genérico
- `<meta name="description">` de 150-160 caracteres en español + otra en inglés
- Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`)
- Twitter Card tags
- `<link rel="alternate" hreflang="es">` y `<link rel="alternate" hreflang="en">`
- `<link rel="canonical">` para evitar contenido duplicado
- Schema.org JSON-LD: para páginas de paisaje, marcar como `AudioObject` con metadatos completos

---

## 10. Reglas para la instancia ejecutora

Estas reglas se aplican a cualquier instancia que trabaje en el proyecto:

### Antes de actuar

1. **Leer este briefing completo** antes de proponer o ejecutar cualquier acción
2. **Identificar qué tipo de tarea se está pidiendo**: ¿añadir un paisaje (workflow operativo), modificar el sitio (cambio estructural), o algo nuevo?
3. **Verificar que existe el documento operativo correspondiente**: para añadir paisajes, requerir `workflow-paisajes.md`
4. **Si hay ambigüedad, preguntar al responsable** antes de actuar

### Durante la ejecución

1. **No improvisar** decisiones que el briefing ya ha tomado
2. **No introducir dependencias** (librerías, servicios) que el briefing no contemple
3. **No subir nada a GitHub sin permiso explícito** del responsable
4. **Trabajar en local hasta que se apruebe el push**
5. **Comentar el código** según las convenciones de la sección 9
6. **Respetar la estructura de archivos** definida en la sección 5

### Al terminar una tarea

1. **Reportar lo hecho** de forma clara y concisa al responsable
2. **Listar archivos creados o modificados**
3. **Indicar si la tarea está completa** o si hay decisiones pendientes
4. **No avanzar a la siguiente tarea** sin confirmación

### Conflictos entre briefing y peticiones puntuales

Si una petición del responsable contradice el briefing:

- **Señalar el conflicto** explícitamente
- **Explicar qué dice el briefing** y por qué
- **Preguntar si se quiere hacer una excepción** o actualizar el briefing
- **No actuar** hasta tener respuesta

### Información sensible

- **Nunca subir** a GitHub: fichas DOCX, audio bruto, fotos originales, notas personales
- **Nunca exponer** en el sitio público: el correo personal del responsable
- **Respetar** la dimensión de intimidad del protocolo de edición (no publicar conversaciones identificables)

### Aislamiento del repositorio (refuerzo)

- **Trabajar exclusivamente** en la carpeta local del repositorio `stan-dar/paisajesonoro`
- **No tocar nunca** archivos fuera de esa carpeta, ni siquiera para leer, modificar o investigar
- **No acceder** a otros repositorios del responsable, en particular `stan-dar/zonafotografia`
- Si surge la necesidad de consultar algo que está fuera de la carpeta del proyecto, **pedir permiso explícito** al responsable
- Ante cualquier duda sobre la ubicación correcta de trabajo, **detener la ejecución y preguntar**

---

## 11. Versionado del briefing

| Versión | Fecha | Cambios |
|---|---|---|
| 1.0 | Abril 2026 | Versión inicial. Recoge todas las decisiones tomadas en la fase de planificación del proyecto. |
| 1.0.1 | Abril 2026 | Añadida sección de aislamiento del repositorio de trabajo. Añadida URL provisional de desarrollo. Reforzada la regla de no acceder a otros repositorios del responsable. |
| 1.0.2 | Abril 2026 | Añadido el tipo de paisaje `tradicion` a la lista cerrada (sección 6) para encuentros de cuadrillas, procesiones, romerías y eventos colectivos con dimensión cultural o ritual. |
| 1.0.3 | Mayo 2026 | Cambio del formato preferido de fotografías de WebP a JPG/JPEG (sección 7) por problemas de perfil de color detectados en producción. Actualizadas referencias a la estructura de carpetas (sección 5) y al ejemplo de JSON (sección 6). |
| 1.0.4 | Mayo 2026 | Cambio del campo `duracion_publicada_min` (entero, minutos) a `duracion_publicada_seg` (entero, segundos) en el modelo de datos (sección 6) para guardar la duración exacta al segundo y formatearla en el frontend como MM:SS. |
| 1.0.5 | Mayo 2026 | Añadidos al ejemplo de JSON (sección 6) los campos opcionales `acontecimiento_es` y `acontecimiento_en` para describir un evento singular asociado a la sesión (ej. "Sábado tarde", "Procesión de Viernes Santo"). El campo es opcional; si no aplica, se deja en cadena vacía o se omite. |

Cualquier modificación posterior se documenta en esta tabla con su fecha y los cambios introducidos. Las grabaciones publicadas conservan la referencia a la versión del briefing y del protocolo bajo la cual se editaron y publicaron.

---

## 12. Glosario rápido

- **Briefing**: este documento. Marco de referencia permanente del proyecto.
- **Workflow de paisajes**: documento operativo `workflow-paisajes.md` con instrucciones paso a paso para añadir grabaciones nuevas.
- **Fases de implementación**: documento `fases-implementacion.md` de uso único para arrancar el sitio. Una vez completadas las fases, queda como archivo histórico.
- **Protocolo de edición**: documento metodológico que rige cómo se editan las grabaciones. Vive embebido en el index del sitio.
- **Instancia ejecutora**: cualquier sesión de Claude (u otra herramienta) que trabaje en el proyecto.
- **JSON central**: `data/paisajes.json`. Fuente única de verdad sobre las grabaciones.
- **Ficha de campo**: documento DOCX que el responsable rellena en campo. Vive en disco local, no se sube.
- **Versión publicada**: la única versión que existe en el archivo público.
- **NOS**: técnica estéreo Nederlandse Omroep Stichting (90° entre ejes, 30 cm entre cápsulas).

---

*Briefing v1.0.5 — mayo de 2026*
*paisajesonoro.org*
