/* =========================================================
   PAISAJE SONORO — Renderizador de página individual de paisaje
   Lee window.PAISAJE_ID y rellena la plantilla con los datos del JSON.
   ========================================================= */

(function () {
  if (!window.PAISAJE_ID) return;

  const PAISAJE_ID = window.PAISAJE_ID;

  function fmt(valor, sufijo) {
    if (valor === null || valor === undefined || valor === '') return '—';
    return sufijo ? `${valor} ${sufijo}` : String(valor);
  }

  function fmtCoord(coord) {
    if (!coord || coord.length !== 2) return '—';
    return `${coord[0].toFixed(6)}, ${coord[1].toFixed(6)}`;
  }

  function fmtFechaCompleta(iso, lang) {
    if (!iso) return '';
    const partes = iso.split('-');
    const meses_es = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
    const meses_en = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const meses = lang === 'en' ? meses_en : meses_es;
    return `${parseInt(partes[2], 10)} de ${meses[parseInt(partes[1], 10) - 1]} de ${partes[0]}`;
  }

  function fmtFechaEn(iso) {
    if (!iso) return '';
    const partes = iso.split('-');
    const meses_en = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    return `${parseInt(partes[2], 10)} ${meses_en[parseInt(partes[1], 10) - 1]} ${partes[0]}`;
  }

  // Formatea segundos como "MM:SS min" (o "H:MM:SS min" si supera la hora).
  function fmtDuracion(seg) {
    if (!seg && seg !== 0) return '—';
    const h = Math.floor(seg / 3600);
    const m = Math.floor((seg % 3600) / 60);
    const s = seg % 60;
    const mm = String(m).padStart(2, '0');
    const ss = String(s).padStart(2, '0');
    const tiempo = h > 0 ? `${h}:${mm}:${ss}` : `${m}:${ss}`;
    return `${tiempo} min`;
  }

  // Formato ISO 8601 para Schema.org duration (ej. PT11M25S).
  function fmtDuracionISO(seg) {
    if (!seg) return '';
    const h = Math.floor(seg / 3600);
    const m = Math.floor((seg % 3600) / 60);
    const s = seg % 60;
    let r = 'PT';
    if (h > 0) r += `${h}H`;
    if (m > 0) r += `${m}M`;
    if (s > 0) r += `${s}S`;
    return r;
  }

  function set(id, valor) {
    const el = document.getElementById(id);
    if (el) el.textContent = valor;
  }

  function setHtml(id, valor) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = valor;
  }

  function setAttr(id, attr, valor) {
    const el = document.getElementById(id);
    if (el) el.setAttribute(attr, valor);
  }

  function tipoNombre(slug, lang) {
    const t = (window.PaisajeSonoro.TIPOS_PAISAJE || []).find(x => x.id === slug);
    if (!t) return slug;
    return lang === 'en' ? t.en : t.es;
  }

  // Capitaliza primera letra (para etiquetas como "Calma", "Despejado").
  function cap(s) {
    if (!s) return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  // Re-aplica el idioma sobre el HTML inyectado.
  function reaplicarIdioma() {
    if (typeof window.setLang !== 'function') return;
    let saved = 'es';
    try { saved = localStorage.getItem('paisajesonoro-lang') || 'es'; } catch (e) {}
    window.setLang(saved);
  }

  function renderPagina(p, mun) {
    // Título de la pestaña del navegador.
    document.title = `${p.titulo_es} · Paisaje Sonoro`;

    // Breadcrumb
    setAttr('bc-municipio', 'href', window.PaisajeSonoro.urlMunicipio(p.comunidad, p.municipio));
    setHtml('bc-municipio', `<span class="es">${mun ? mun.nombre_es : p.municipio}</span><span class="en">${mun ? mun.nombre_en : p.municipio}</span>`);
    setHtml('bc-paisaje', `<span class="es">${p.titulo_es}</span><span class="en">${p.titulo_en}</span>`);

    // Cabecera
    setHtml('p-titulo', `<span class="es">${p.titulo_es}</span><span class="en">${p.titulo_en}</span>`);
    setHtml('p-lugar',  `<span class="es">${p.lugar_especifico_es}</span><span class="en">${p.lugar_especifico_en}</span>`);
    setHtml('p-fecha',  `<span class="es">${fmtFechaCompleta(p.fecha, 'es')}</span><span class="en">${fmtFechaEn(p.fecha)}</span>`);

    // Audio
    if (p.audio_url) {
      setAttr('audio-src', 'src', p.audio_url);
      const audioEl = document.getElementById('audio-player');
      if (audioEl) audioEl.load();
    }

    // Imagen hero
    if (p.imagen_url) {
      const heroEl = document.getElementById('paisaje-hero');
      if (heroEl) heroEl.style.backgroundImage = `url('${p.imagen_url}')`;
    }

    // Descripción narrativa
    setHtml('p-descripcion', `<p class="es">${p.descripcion_es}</p><p class="en">${p.descripcion_en}</p>`);
    setHtml('p-sonidos-principales', `<span class="es">${p.sonidos_principales_es}</span><span class="en">${p.sonidos_principales_en}</span>`);
    setHtml('p-sonidos-fondo', `<span class="es">${p.sonidos_fondo_es}</span><span class="en">${p.sonidos_fondo_en}</span>`);
    setHtml('p-incidencias', `<span class="es">${p.incidencias_es}</span><span class="en">${p.incidencias_en}</span>`);
    setHtml('p-notas', `<span class="es">${p.notas_campo_es || '—'}</span><span class="en">${p.notas_campo_en || '—'}</span>`);

    // Ficha técnica — Localización
    set('f-coord', fmtCoord(p.coordenadas));
    set('f-altitud', fmt(p.altitud_m, 'm'));
    set('f-rumbo', fmt(p.rumbo_grados, '°'));
    set('f-municipio', mun ? mun.nombre_es : p.municipio);
    setHtml('f-comunidad', `<span class="es">${mun ? mun.comunidad_nombre_es : ''}</span><span class="en">${mun ? mun.comunidad_nombre_en : ''}</span>`);

    // Ficha técnica — Tiempo
    setHtml('f-fecha', `<span class="es">${fmtFechaCompleta(p.fecha, 'es')}</span><span class="en">${fmtFechaEn(p.fecha)}</span>`);
    set('f-hora-inicio', p.hora_inicio || '—');
    set('f-hora-fin', p.hora_fin || '—');
    set('f-duracion', fmtDuracion(p.duracion_publicada_seg));
    setHtml('f-estacion', `<span class="es">${cap(p.estacion)}</span><span class="en">${cap(p.estacion)}</span>`);
    setHtml('f-tipo-dia', `<span class="es">${cap((p.tipo_dia || '').replace(/-/g, ' '))}</span><span class="en">${cap((p.tipo_dia || '').replace(/-/g, ' '))}</span>`);
    if (p.acontecimiento_es || p.acontecimiento_en) {
      setHtml('f-acontecimiento', `<span class="es">${p.acontecimiento_es || '—'}</span><span class="en">${p.acontecimiento_en || '—'}</span>`);
    }

    // Ficha técnica — Condiciones
    setHtml('f-tipo', `<span class="es">${tipoNombre(p.tipo_paisaje, 'es')}</span><span class="en">${tipoNombre(p.tipo_paisaje, 'en')}</span>`);
    set('f-viento', cap(p.viento));
    set('f-nubosidad', cap(p.nubosidad));
    set('f-precipitacion', cap(p.precipitacion));
    set('f-temperatura', p.temperatura_c !== null ? `${p.temperatura_c} °C` : '—');
    set('f-humedad', p.humedad_pct !== null ? `${p.humedad_pct} %` : '—');
    set('f-luz', fmt(p.luz_lux, 'lux'));
    set('f-magnetico', fmt(p.campo_magnetico_ut, 'µT'));
    set('f-satelites', p.satelites_fijo_visible || '—');
    set('f-error-h', fmt(p.error_horizontal_m, 'm'));

    // Ficha técnica — Equipo
    if (p.equipo) {
      set('f-grabadora', p.equipo.grabadora || '—');
      set('f-microfonos', p.equipo.microfonos || '—');
      set('f-config', p.equipo.configuracion || '—');
      set('f-frec-bits', `${p.equipo.frecuencia_muestreo_khz} kHz / ${p.equipo.bits} bits`);
      set('f-modo', p.equipo.modo || '—');
      set('f-ganancia', cap(p.equipo.ganancia));
      set('f-altura', fmt(p.equipo.altura_tripode_cm, 'cm'));
    }

    // Pie con metadatos
    setHtml('m-duracion', `<span class="es">${fmtDuracion(p.duracion_publicada_seg)} publicados</span><span class="en">${fmtDuracion(p.duracion_publicada_seg)} published</span>`);
    setHtml('m-fecha-grab', `<span class="es">Grabación: ${fmtFechaCompleta(p.fecha, 'es')}</span><span class="en">Recording: ${fmtFechaEn(p.fecha)}</span>`);
    setHtml('m-fecha-pub', `<span class="es">Publicado: ${fmtFechaCompleta(p.fecha_publicacion, 'es')}</span><span class="en">Published: ${fmtFechaEn(p.fecha_publicacion)}</span>`);
    setHtml('m-protocolo', `<span class="es">Protocolo v${p.version_protocolo}</span><span class="en">Protocol v${p.version_protocolo}</span>`);
    if (p.internet_archive_url) setAttr('m-ia-link', 'href', p.internet_archive_url);

    // Navegación anterior / siguiente del mismo municipio
    const hermanos = window.PaisajeSonoro.state.paisajes
      .filter(x => x.municipio === p.municipio)
      .sort((a, b) => a.id.localeCompare(b.id));
    const idx = hermanos.findIndex(x => x.id === p.id);
    const prev = idx > 0 ? hermanos[idx - 1] : null;
    const next = idx < hermanos.length - 1 ? hermanos[idx + 1] : null;

    const navPrev = document.getElementById('nav-prev');
    const navNext = document.getElementById('nav-next');
    if (navPrev) {
      if (prev) {
        navPrev.href = window.PaisajeSonoro.urlPaisaje(prev);
        navPrev.classList.remove('disabled');
        navPrev.querySelector('.nav-titulo').innerHTML =
          `<span class="es">${prev.titulo_es}</span><span class="en">${prev.titulo_en}</span>`;
      } else {
        navPrev.classList.add('disabled');
        navPrev.removeAttribute('href');
      }
    }
    if (navNext) {
      if (next) {
        navNext.href = window.PaisajeSonoro.urlPaisaje(next);
        navNext.classList.remove('disabled');
        navNext.querySelector('.nav-titulo').innerHTML =
          `<span class="es">${next.titulo_es}</span><span class="en">${next.titulo_en}</span>`;
      } else {
        navNext.classList.add('disabled');
        navNext.removeAttribute('href');
      }
    }

    const navMun = document.getElementById('nav-municipio');
    if (navMun) {
      navMun.href = window.PaisajeSonoro.urlMunicipio(p.comunidad, p.municipio);
      navMun.querySelector('.nav-titulo').innerHTML =
        `<span class="es">${mun ? mun.nombre_es : p.municipio}</span><span class="en">${mun ? mun.nombre_en : p.municipio}</span>`;
    }
    const navArchivo = document.getElementById('nav-archivo');
    if (navArchivo) {
      navArchivo.href = window.PaisajeSonoro.SITE_ROOT + 'archivo.html';
    }

    // Schema.org JSON-LD para AudioObject
    const schema = {
      "@context": "https://schema.org",
      "@type": "AudioObject",
      "name": p.titulo_es,
      "alternateName": p.titulo_en,
      "description": p.descripcion_es,
      "contentUrl": p.audio_url,
      "encodingFormat": "audio/mpeg",
      "duration": fmtDuracionISO(p.duracion_publicada_seg),
      "datePublished": p.fecha_publicacion,
      "dateCreated": p.fecha,
      "license": "https://creativecommons.org/licenses/by-nc-sa/4.0/",
      "contentLocation": {
        "@type": "Place",
        "name": p.lugar_especifico_es,
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": p.coordenadas[0],
          "longitude": p.coordenadas[1]
        }
      }
    };
    const schemaScript = document.getElementById('schema-jsonld');
    if (schemaScript) schemaScript.textContent = JSON.stringify(schema, null, 2);

    reaplicarIdioma();
  }

  document.addEventListener('DOMContentLoaded', async () => {
    try {
      await window.PaisajeSonoro.cargarDatos();
    } catch (err) {
      console.error('No se pudieron cargar los datos.', err);
      return;
    }
    const p = window.PaisajeSonoro.state.paisajes.find(x => x.id === PAISAJE_ID);
    if (!p) {
      console.error('Paisaje no encontrado:', PAISAJE_ID);
      return;
    }
    const mun = window.PaisajeSonoro.state.municipios[p.municipio];
    renderPagina(p, mun);
  });
})();
