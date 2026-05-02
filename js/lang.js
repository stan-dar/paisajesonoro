/* =========================================================
   PAISAJE SONORO — Toggle de idioma ES / EN
   Persiste el idioma elegido en localStorage.
   ========================================================= */

(function () {
  const STORAGE_KEY = 'paisajesonoro-lang';

  // Aplica el idioma a la página: muestra/oculta los elementos .es y .en,
  // marca el botón activo y actualiza el atributo lang del documento.
  function setLang(l) {
    const isEn = l === 'en';
    const btnEn = document.getElementById('btn-en');
    const btnEs = document.getElementById('btn-es');
    if (btnEn) btnEn.classList.toggle('active', isEn);
    if (btnEs) btnEs.classList.toggle('active', !isEn);

    document.documentElement.lang = l;

    document.querySelectorAll('.es').forEach(el => {
      el.style.display = isEn ? 'none' : (el.tagName === 'SPAN' ? 'inline' : 'block');
    });
    document.querySelectorAll('.en').forEach(el => {
      el.style.display = isEn ? (el.tagName === 'SPAN' ? 'inline' : 'block') : 'none';
    });

    // Actualiza la meta description si tiene un atributo data-en con la versión inglesa.
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      const esText = metaDesc.getAttribute('data-es');
      const enText = metaDesc.getAttribute('data-en');
      if (esText && enText) {
        metaDesc.setAttribute('content', isEn ? enText : esText);
      }
    }

    try { localStorage.setItem(STORAGE_KEY, l); } catch (e) { /* localStorage bloqueado */ }

    // Notifica a otros módulos (mapa, etc.) que el idioma ha cambiado,
    // para que puedan re-renderizar contenidos generados dinámicamente
    // (tooltips de Leaflet, por ejemplo).
    document.dispatchEvent(new CustomEvent('lang:changed', { detail: { lang: l } }));
  }

  // Expone setLang en el ámbito global para los onclick de los botones.
  window.setLang = setLang;

  // Al cargar la página, recupera el idioma guardado (o por defecto 'es').
  function init() {
    let saved = 'es';
    try { saved = localStorage.getItem(STORAGE_KEY) || 'es'; } catch (e) { /* ignorar */ }
    setLang(saved);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
