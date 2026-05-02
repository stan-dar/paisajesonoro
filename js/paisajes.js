/* =========================================================
   PAISAJE SONORO — Carga de datos, filtros, listas y tarjetas
   Compartido por archivo.html y páginas de municipio / paisaje.
   ========================================================= */

(function () {

  /* === Detección del root del sitio ===
     Construye URLs que funcionen tanto en local (servidor en raíz),
     como en la URL provisional de GitHub Pages
     (https://stan-dar.github.io/paisajesonoro/) y en la definitiva
     (https://paisajesonoro.org/). */
  const SITE_ROOT = (function () {
    const path = window.location.pathname;
    const idx = path.indexOf('/paisajesonoro/');
    if (idx >= 0) return path.substring(0, idx + '/paisajesonoro/'.length);
    return '/';
  })();

  function urlPaisaje(p) {
    return SITE_ROOT + 'archivo/' + p.comunidad + '/' + p.municipio + '/' + p.id + '-' + p.slug + '.html';
  }

  function urlMunicipio(comunidad, municipio) {
    return SITE_ROOT + 'archivo/' + comunidad + '/' + municipio + '.html';
  }

  // Lista cerrada de tipos de paisaje (ver briefing sección 6).
  const TIPOS_PAISAJE = [
    { id: 'costero',      es: 'Costero',         en: 'Coastal' },
    { id: 'sierra-monte', es: 'Sierra y monte',  en: 'Mountain' },
    { id: 'huerta-vega',  es: 'Huerta y vega',   en: 'Farmland' },
    { id: 'ribera',       es: 'Ribera',          en: 'Riverside' },
    { id: 'urbano',       es: 'Urbano',          en: 'Urban' },
    { id: 'rural',        es: 'Rural',           en: 'Rural' },
    { id: 'industrial',   es: 'Industrial',      en: 'Industrial' },
    { id: 'patrimonio',   es: 'Patrimonio',      en: 'Heritage' },
    { id: 'tradicion',    es: 'Tradición',       en: 'Tradition' }
  ];

  const state = {
    paisajes: [],
    municipios: {},
    filtroTipo: null
  };

  // Carga ambos JSON en paralelo desde la raíz del sitio.
  // Se cachea: si varios módulos llaman a cargarDatos() en la misma página
  // (por ejemplo mapa.js y paisaje.js), comparten la misma promesa.
  let cargarPromise = null;
  function cargarDatos() {
    if (cargarPromise) return cargarPromise;
    cargarPromise = (async () => {
      const [pRes, mRes] = await Promise.all([
        fetch(SITE_ROOT + 'data/paisajes.json'),
        fetch(SITE_ROOT + 'data/municipios.json')
      ]);
      state.paisajes = await pRes.json();
      state.municipios = await mRes.json();
      return state;
    })();
    return cargarPromise;
  }

  // Devuelve los paisajes pasando el filtro de tipo activo.
  function paisajesFiltrados() {
    if (!state.filtroTipo) return state.paisajes;
    return state.paisajes.filter(p => p.tipo_paisaje === state.filtroTipo);
  }

  // Agrupa una lista de paisajes por municipio.
  function agruparPorMunicipio(lista) {
    const grupos = {};
    lista.forEach(p => {
      if (!grupos[p.municipio]) grupos[p.municipio] = [];
      grupos[p.municipio].push(p);
    });
    return grupos;
  }

  // Renderiza la barra de chips de filtros por tipo.
  function renderFiltros() {
    const cont = document.getElementById('filtros');
    if (!cont) return;
    let html = `
      <span class="filtros-label es">Filtrar por tipo</span>
      <span class="filtros-label en">Filter by type</span>
    `;
    TIPOS_PAISAJE.forEach(t => {
      html += `
        <button class="filtro-chip" data-tipo="${t.id}" type="button">
          <span class="es">${t.es}</span>
          <span class="en">${t.en}</span>
        </button>
      `;
    });
    html += `
      <button class="filtro-reset" id="btn-filtro-reset" type="button">
        <span class="es">Quitar filtro</span>
        <span class="en">Clear filter</span>
      </button>
    `;
    cont.innerHTML = html;

    cont.querySelectorAll('.filtro-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        const tipo = btn.dataset.tipo;
        state.filtroTipo = (state.filtroTipo === tipo) ? null : tipo;
        actualizarFiltrosUI();
        notificarCambio();
      });
    });

    document.getElementById('btn-filtro-reset').addEventListener('click', () => {
      state.filtroTipo = null;
      actualizarFiltrosUI();
      notificarCambio();
    });
  }

  function actualizarFiltrosUI() {
    document.querySelectorAll('.filtro-chip').forEach(b => {
      b.classList.toggle('activo', b.dataset.tipo === state.filtroTipo);
    });
  }

  // Renderiza la lista lateral del archivo principal con paisajes agrupados por municipio.
  function renderListaLateral() {
    const cont = document.getElementById('sidebar-lista');
    if (!cont) return;
    const lista = paisajesFiltrados();
    const grupos = agruparPorMunicipio(lista);
    const cuenta = lista.length;

    actualizarContador('.sidebar-contador', cuenta);

    if (cuenta === 0) {
      cont.innerHTML = `
        <p class="sidebar-vacio">
          <span class="es">No hay paisajes con este filtro todavía.</span>
          <span class="en">No soundscapes match this filter yet.</span>
        </p>
      `;
      reaplicarIdioma();
      return;
    }

    let html = '';
    Object.keys(grupos).sort().forEach(munSlug => {
      const mun = state.municipios[munSlug] || {};
      const grupo = grupos[munSlug];
      const comunidadSlug = mun.comunidad || (grupo[0] && grupo[0].comunidad) || '';
      const munUrl = comunidadSlug ? urlMunicipio(comunidadSlug, munSlug) : '#';
      html += `<div class="municipio-grupo">`;
      html += `
        <a class="municipio-link" href="${munUrl}">
          <h2 class="municipio-cabecera">
            <span class="es">${mun.nombre_es || munSlug}</span>
            <span class="en">${mun.nombre_en || munSlug}</span>
          </h2>
          <p class="municipio-comunidad">
            <span class="es">${mun.comunidad_nombre_es || ''}</span>
            <span class="en">${mun.comunidad_nombre_en || ''}</span>
          </p>
        </a>
      `;
      grupo.forEach(p => { html += renderTarjetaSidebar(p); });
      html += `</div>`;
    });
    cont.innerHTML = html;
    reaplicarIdioma();
  }

  // Tarjeta compacta para la lista lateral del archivo principal.
  function renderTarjetaSidebar(p) {
    const tipo = TIPOS_PAISAJE.find(t => t.id === p.tipo_paisaje) || { es: p.tipo_paisaje, en: p.tipo_paisaje };
    const url = urlPaisaje(p);
    return `
      <a class="paisaje-card" href="${url}">
        <span class="paisaje-card-num">${p.id}</span>
        <span class="paisaje-card-titulo es">${p.titulo_es}</span>
        <span class="paisaje-card-titulo en">${p.titulo_en}</span>
        <div class="paisaje-card-meta">
          <span class="es">${formatearFecha(p.fecha, 'es')}</span>
          <span class="en">${formatearFecha(p.fecha, 'en')}</span>
          ·
          <span class="es">${p.lugar_especifico_es}</span>
          <span class="en">${p.lugar_especifico_en}</span>
          <br>
          <span class="paisaje-card-tag">
            <span class="es">${tipo.es}</span>
            <span class="en">${tipo.en}</span>
          </span>
        </div>
      </a>
    `;
  }

  // Renderiza el grid grande de tarjetas (página de municipio o futuras vistas).
  function renderTarjetas(municipioSlug) {
    const cont = document.getElementById('tarjetas-grid');
    if (!cont) return;
    const lista = state.paisajes.filter(p => !municipioSlug || p.municipio === municipioSlug);

    actualizarContador('.tarjetas-contador', lista.length);

    if (lista.length === 0) {
      cont.innerHTML = `
        <p class="tarjetas-vacio">
          <span class="es">Aún no hay grabaciones publicadas en este municipio. Vuelve pronto.</span>
          <span class="en">No recordings published in this municipality yet. Come back soon.</span>
        </p>
      `;
      reaplicarIdioma();
      return;
    }

    let html = '';
    lista.forEach(p => { html += renderTarjetaGrande(p); });
    cont.innerHTML = html;
    reaplicarIdioma();
  }

  function renderTarjetaGrande(p) {
    const tipo = TIPOS_PAISAJE.find(t => t.id === p.tipo_paisaje) || { es: p.tipo_paisaje, en: p.tipo_paisaje };
    const url = urlPaisaje(p);
    const conImagen = !!p.imagen_url;
    const bgStyle = conImagen ? `background-image: url('${p.imagen_url}');` : '';
    return `
      <a class="tarjeta" href="${url}">
        <div class="tarjeta-imagen ${conImagen ? 'con-imagen' : ''}" style="${bgStyle}">
          <span class="tarjeta-num">${p.id}</span>
        </div>
        <div class="tarjeta-info">
          <h2 class="tarjeta-titulo">
            <span class="es">${p.titulo_es}</span>
            <span class="en">${p.titulo_en}</span>
          </h2>
          <p class="tarjeta-lugar">
            <span class="es">${p.lugar_especifico_es}</span>
            <span class="en">${p.lugar_especifico_en}</span>
          </p>
          <p class="tarjeta-fecha">
            <span class="es">${formatearFecha(p.fecha, 'es')}</span>
            <span class="en">${formatearFecha(p.fecha, 'en')}</span>
          </p>
          <div class="tarjeta-meta">
            <span class="tarjeta-tag">
              <span class="es">${tipo.es}</span>
              <span class="en">${tipo.en}</span>
            </span>
            <span class="tarjeta-cta">
              <span class="es">Escuchar →</span>
              <span class="en">Listen →</span>
            </span>
          </div>
        </div>
      </a>
    `;
  }

  // Rellena los datos del municipio en su página dedicada.
  function renderMunicipioInfo(slug) {
    const mun = state.municipios[slug];
    if (!mun) return;

    const set = (selectorEs, selectorEn, valEs, valEn) => {
      const a = document.querySelector(selectorEs);
      const b = document.querySelector(selectorEn);
      if (a) a.textContent = valEs;
      if (b) b.textContent = valEn;
    };

    set('.cabecera-titulo .es', '.cabecera-titulo .en', mun.nombre_es, mun.nombre_en);
    set('.cabecera-sub .es',    '.cabecera-sub .en',    mun.comunidad_nombre_es, mun.comunidad_nombre_en);
    set('#municipio-desc .es',  '#municipio-desc .en',  mun.descripcion_es, mun.descripcion_en);

    const wikiEs = document.getElementById('municipio-wiki-es');
    const wikiEn = document.getElementById('municipio-wiki-en');
    if (wikiEs) wikiEs.href = mun.wikipedia_url_es;
    if (wikiEn) wikiEn.href = mun.wikipedia_url_en;

    document.title = `${mun.nombre_es} · Paisaje Sonoro`;
  }

  // Actualiza un contador con singular/plural en ambos idiomas.
  function actualizarContador(selector, n) {
    const txt_es = n === 1 ? '1 grabación' : `${n} grabaciones`;
    const txt_en = n === 1 ? '1 recording' : `${n} recordings`;
    document.querySelectorAll(selector).forEach(el => {
      el.innerHTML = `<span class="es">${txt_es}</span><span class="en">${txt_en}</span>`;
    });
  }

  function formatearFecha(iso, lang) {
    if (!iso) return '';
    const partes = iso.split('-');
    const meses_es = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
    const meses_en = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const meses = lang === 'en' ? meses_en : meses_es;
    return `${parseInt(partes[2], 10)} ${meses[parseInt(partes[1], 10) - 1]} ${partes[0]}`;
  }

  // Re-aplica el idioma elegido sobre el HTML recién inyectado.
  function reaplicarIdioma() {
    if (typeof window.setLang !== 'function') return;
    let saved = 'es';
    try { saved = localStorage.getItem('paisajesonoro-lang') || 'es'; } catch (e) {}
    window.setLang(saved);
  }

  // Notifica que el filtro o la lista han cambiado.
  function notificarCambio() {
    renderListaLateral();
    document.dispatchEvent(new CustomEvent('paisajes:actualizado', {
      detail: { paisajes: paisajesFiltrados() }
    }));
  }

  // API expuesta globalmente.
  window.PaisajeSonoro = {
    SITE_ROOT,
    urlPaisaje,
    urlMunicipio,
    cargarDatos,
    paisajesFiltrados,
    agruparPorMunicipio,
    renderFiltros,
    renderListaLateral,
    renderTarjetas,
    renderMunicipioInfo,
    notificarCambio,
    state,
    TIPOS_PAISAJE
  };
})();
