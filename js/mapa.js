/* =========================================================
   PAISAJE SONORO — Mapa interactivo (Leaflet)
   Configurable por página vía window.MAPA_CONFIG.
   ========================================================= */

(function () {

  // Configuración por defecto (la que usa archivo.html).
  const DEFAULT_CONFIG = {
    center: [38.0, -1.5],   // Región de Murcia
    zoom: 9,
    filtroMunicipio: null,  // si se indica, solo marca paisajes de ese municipio
    filtroPaisajeId: null,  // si se indica, solo marca el paisaje con ese id
    scrollWheelZoom: false  // por defecto, zoom con rueda solo al enfocar
  };

  let config;
  let mapa;
  let cluster;

  function iniciarMapa() {
    // gestureHandling: en móvil exige dos dedos para mover el mapa (de modo
    // que el dedo simple haga scroll de la página); en escritorio exige
    // Ctrl + rueda para hacer zoom. Esto evita que al desplazarse por la
    // página el usuario quede "atrapado" dentro del mapa.
    mapa = L.map('mapa', {
      gestureHandling: true,
      gestureHandlingOptions: {
        text: {
          touch: 'Usa dos dedos para mover el mapa',
          scroll: 'Usa Ctrl + scroll para hacer zoom',
          scrollMac: 'Usa ⌘ + scroll para hacer zoom'
        },
        duration: 1200
      }
    }).setView(config.center, config.zoom);

    const voyager = L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
      }
    );
    const topo = L.tileLayer(
      'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 17,
        attribution: 'Map data: &copy; OpenStreetMap, SRTM | Style: &copy; OpenTopoMap (CC-BY-SA)'
      }
    );
    const osm = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
      }
    );

    voyager.addTo(mapa);
    L.control.layers(
      {
        'CartoDB Voyager': voyager,
        'OpenTopoMap': topo,
        'OpenStreetMap': osm
      },
      null,
      { position: 'topright', collapsed: true }
    ).addTo(mapa);

    cluster = L.markerClusterGroup({ showCoverageOnHover: false });
    mapa.addLayer(cluster);
  }

  // Devuelve los paisajes a marcar en el mapa según los filtros activos.
  function paisajesParaMapa() {
    let lista = window.PaisajeSonoro.paisajesFiltrados();
    if (config.filtroMunicipio) {
      lista = lista.filter(p => p.municipio === config.filtroMunicipio);
    }
    if (config.filtroPaisajeId) {
      lista = lista.filter(p => p.id === config.filtroPaisajeId);
    }
    return lista;
  }

  function renderMarcadores(ajustarVista) {
    if (!cluster) return;
    cluster.clearLayers();
    const lista = paisajesParaMapa();
    const lang = (document.documentElement.lang === 'en') ? 'en' : 'es';

    lista.forEach(p => {
      const m = L.marker(p.coordenadas);
      const titulo = lang === 'en' ? p.titulo_en : p.titulo_es;
      m.bindTooltip(`${titulo} · ${p.fecha}`, { direction: 'top', offset: [-15, -10] });
      m.bindPopup(popupHTML(p));
      cluster.addLayer(m);
    });

    if (ajustarVista) ajustarVistaAMarcadores(lista);
  }

  // Encuadra el mapa según los paisajes que se están mostrando, en vez de
  // depender de un centro fijo. Así funciona igual de bien si los paisajes
  // están todos en Murcia, repartidos por varias comunidades, o se filtra a
  // un solo municipio. Las páginas de paisaje individual (con
  // filtroPaisajeId) mantienen su zoom cercano fijo y no se reencuadran.
  function ajustarVistaAMarcadores(lista) {
    if (config.filtroPaisajeId) return;       // página de paisaje: zoom fijo
    if (lista.length === 0) return;            // sin paisajes: mantiene config.center inicial
    if (lista.length === 1) {
      mapa.setView(lista[0].coordenadas, 13);
      return;
    }
    const bounds = L.latLngBounds(lista.map(p => p.coordenadas));
    mapa.fitBounds(bounds, { padding: [40, 40], maxZoom: 13 });
  }

  function popupHTML(p) {
    const url = window.PaisajeSonoro.urlPaisaje(p);
    return `
      <div class="popup-titulo">
        <span class="es">${p.titulo_es}</span>
        <span class="en">${p.titulo_en}</span>
      </div>
      <div class="popup-meta">
        ${p.fecha} ·
        <span class="es">${p.lugar_especifico_es}</span>
        <span class="en">${p.lugar_especifico_en}</span>
      </div>
      <a class="popup-cta" href="${url}">
        <span class="es">Escuchar →</span>
        <span class="en">Listen →</span>
      </a>
    `;
  }

  // Arranque al cargar la página.
  document.addEventListener('DOMContentLoaded', async () => {
    if (!document.getElementById('mapa')) return;  // página sin mapa
    config = Object.assign({}, DEFAULT_CONFIG, window.MAPA_CONFIG || {});

    iniciarMapa();

    try {
      await window.PaisajeSonoro.cargarDatos();
    } catch (err) {
      console.error('No se pudieron cargar los datos. ¿Estás abriendo el archivo con file:// en lugar de un servidor local? Usa Live Server en VS Code o python -m http.server.', err);
      const sidebar = document.getElementById('sidebar-lista');
      const grid    = document.getElementById('tarjetas-grid');
      const aviso   = '<p class="sidebar-vacio">Error cargando los datos. Sirve la página desde un servidor local (Live Server en VS Code).</p>';
      if (sidebar) sidebar.innerHTML = aviso;
      if (grid)    grid.innerHTML    = aviso;
      return;
    }

    if (document.getElementById('filtros'))       window.PaisajeSonoro.renderFiltros();
    if (document.getElementById('sidebar-lista')) window.PaisajeSonoro.renderListaLateral();
    if (document.getElementById('tarjetas-grid')) window.PaisajeSonoro.renderTarjetas(config.filtroMunicipio);
    if (config.filtroMunicipio)                   window.PaisajeSonoro.renderMunicipioInfo(config.filtroMunicipio);

    renderMarcadores(true);

    // Aplica el idioma sobre el contenido recién inyectado.
    if (typeof window.setLang === 'function') {
      let saved = 'es';
      try { saved = localStorage.getItem('paisajesonoro-lang') || 'es'; } catch (e) {}
      window.setLang(saved);
    }
  });

  // Cuando cambia el filtro, re-renderiza Y reencuadra (el conjunto de
  // paisajes visibles ha cambiado). Cuando solo cambia el idioma, se
  // reconstruyen los tooltips pero la vista del mapa no debe saltar.
  document.addEventListener('paisajes:actualizado', () => renderMarcadores(true));
  document.addEventListener('lang:changed', () => renderMarcadores(false));
})();
