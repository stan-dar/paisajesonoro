# Paisaje Sonoro

[Español](#español) · [English](#english)

---

## Español

**Paisaje Sonoro** es un archivo público y gratuito de paisajes sonoros documentados de España, con vocación de extenderse al resto del territorio nacional desde la Región de Murcia. Cada entrada del archivo es una grabación de campo de un lugar concreto en un momento concreto, acompañada de su contexto geográfico, técnico y atmosférico completo.

El proyecto se inscribe en la tradición inaugurada por R. Murray Schafer y el World Soundscape Project, y se mantiene con criterios de transparencia documental, escala humana y respeto schaferiano por la grabación original.

- **Sitio público**: [paisajesonoro.org](https://paisajesonoro.org)
- **Audio y fotografías**: alojados en [Internet Archive](https://archive.org)
- **Licencia**: Creative Commons BY-NC-SA 4.0
- **Idiomas**: español e inglés (toda página, todo metadato)
- **Contacto**: [contacto@PaisajeSonoro.org](mailto:contacto@paisajesonoro.org)

### Estructura del repositorio

```
/
├── index.html                              Presentación + protocolo
├── archivo.html                            Mapa interactivo + acceso a paisajes
├── archivo/
│   └── murcia/
│       ├── cartagena.html                  Índice del municipio
│       └── cartagena/
│           └── 001-isla-plana.html         Página individual de paisaje
├── data/
│   ├── paisajes.json                       Datos de todas las grabaciones
│   └── municipios.json                     Datos de los municipios
├── css/
│   └── estilos.css                         CSS compartido
├── js/
│   ├── lang.js                             Toggle ES/EN
│   ├── mapa.js                             Lógica del mapa Leaflet
│   ├── paisajes.js                         Renderizado dinámico desde JSON
│   └── paisaje.js                          Plantilla de página individual
├── img/                                    Imágenes del index
├── favicon.svg
├── CNAME                                   Dominio personalizado
├── robots.txt
└── sitemap.xml
```

### Cómo añadir un nuevo paisaje

Cada paisaje requiere subir el audio y la fotografía a Internet Archive y añadir una entrada en `data/paisajes.json` con sus metadatos. Las páginas HTML se generan dinámicamente desde ese JSON.

### Stack tecnológico

Sitio estático servido desde GitHub Pages. Mapas con Leaflet.js sobre OpenStreetMap (capa CartoDB Voyager). Tipografías Cormorant Garamond y Jost desde Google Fonts. Sin dependencias propietarias.

### Responsable

Juan Fernando Sánchez Hernández — Alhama de Murcia, España.

---

## English

**Paisaje Sonoro** is a public, free archive of documented soundscapes from Spain, starting in the Region of Murcia and extending to the rest of the country. Each entry is a field recording of a specific place at a specific moment, accompanied by its full geographic, technical and atmospheric context.

The project belongs to the tradition opened by R. Murray Schafer and the World Soundscape Project, and is maintained under principles of documentary transparency, human scale and Schaferian respect for the original recording.

- **Public site**: [paisajesonoro.org](https://paisajesonoro.org)
- **Audio and photographs**: hosted on [Internet Archive](https://archive.org)
- **License**: Creative Commons BY-NC-SA 4.0
- **Languages**: Spanish and English (every page, every metadatum)
- **Contact**: [contacto@PaisajeSonoro.org](mailto:contacto@paisajesonoro.org)

### Repository structure

See the tree above (in the Spanish section). File names and structure are identical for both languages.

### How to add a new soundscape

Each soundscape requires uploading the audio and photograph to Internet Archive and adding an entry to `data/paisajes.json` with its metadata. HTML pages are generated dynamically from that JSON.

### Tech stack

Static site served from GitHub Pages. Maps with Leaflet.js over OpenStreetMap (CartoDB Voyager layer). Cormorant Garamond and Jost typefaces from Google Fonts. No proprietary dependencies.

### Maintainer

Juan Fernando Sánchez Hernández — Alhama de Murcia, Spain.
