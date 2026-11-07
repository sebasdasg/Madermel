//GOOGLE TAG MANAGER (Google Analytics): contenedor GTM-KJXHH2SW, medición G-PWDYYBKPWB
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
(function (w, d, s, l, i) {
  w[l] = w[l] || [];
  w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
  var f = d.getElementsByTagName(s)[0],
    j = d.createElement(s);
  j.async = true;
  j.src = "https://www.googletagmanager.com/gtm.js?id=" + i;
  f.parentNode.insertBefore(j, f);
})(window, document, "script", "dataLayer", "GTM-KJXHH2SW");

//Clic en los botones de cotizar (botón fijo y botón de la portada)
document.addEventListener("click", function (e) {
  const boton = e.target.closest(".cta-cotizar, .hero__actions a[href^='/contacto']");
  if (boton) gtag("event", "cotizar_click", { ubicacion: boton.classList.contains("cta-cotizar") ? "boton_fijo" : "portada" });
});

//CARGAR HEADER
document.addEventListener("DOMContentLoaded", function () {
  fetch("/components/header.html", { cache: "no-cache" })
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("headerPlaceholder").innerHTML = data;
      /* El botón fijo no tiene sentido dentro de la propia página de contacto */
      if (/^\/contacto/.test(location.pathname)) {
        const cta = document.getElementById("cta-cotizar");
        if (cta) cta.remove();
      }
      marcarEnlaceActivo();

      /*==================== MENÚ EN CELULARES ====================*/
      const navMenu = document.getElementById("nav-menu"),
        navToggle = document.getElementById("nav-toggle");

      function abrirMenu(abrir) {
        // El panel empieza justo debajo de la barra (cambia según si la barra superior está visible)
        if (abrir) navMenu.style.top = document.querySelector(".navbar").getBoundingClientRect().bottom + "px";
        navMenu.classList.toggle("show-menu", abrir);
        navToggle.setAttribute("aria-expanded", abrir);
        navToggle.setAttribute("aria-label", abrir ? "Cerrar menú" : "Abrir menú");
        document.body.classList.toggle("no-scroll", abrir);
        if (!abrir) cerrarSubmenuProyectos();
      }

      navToggle.addEventListener("click", () => {
        abrirMenu(!navMenu.classList.contains("show-menu"));
      });

      // Al elegir un enlace (por ejemplo "Cómo trabajamos" dentro del inicio) se cierra el menú
      navMenu.querySelectorAll("a").forEach((enlace) => {
        enlace.addEventListener("click", () => abrirMenu(false));
      });

      /*===== SUBMENÚ PROYECTOS =====*/
      const subToggleProyectos = document.getElementById("nav-sub-toggle-proyectos"),
        sublistProyectos = document.getElementById("nav-sublist-proyectos");

      function cerrarSubmenuProyectos() {
        sublistProyectos.classList.remove("nav__sublist--open");
        subToggleProyectos.setAttribute("aria-expanded", "false");
      }

      subToggleProyectos.addEventListener("click", (e) => {
        e.stopPropagation();
        const abierto = sublistProyectos.classList.toggle("nav__sublist--open");
        subToggleProyectos.setAttribute("aria-expanded", abierto);
      });

      /*===== CERRAR AL HACER CLIC AFUERA O CON ESCAPE =====*/
      document.addEventListener("click", (e) => {
        if (!e.target.closest(".nav__item--has-sub")) cerrarSubmenuProyectos();
      });
      document.addEventListener("keydown", (e) => {
        if (e.key !== "Escape") return;
        cerrarSubmenuProyectos();
        if (navMenu.classList.contains("show-menu")) abrirMenu(false);
      });
      // Si se agranda la ventana con el menú abierto, se libera el scroll
      window.matchMedia("(min-width: 980px)").addEventListener("change", (e) => {
        if (e.matches) abrirMenu(false);
      });
    });
});

/* Resalta en el menú la sección en la que está el visitante */
function marcarEnlaceActivo() {
  const ruta = location.pathname.replace(/\.html$/, "").replace(/\/$/, "") || "/";
  let seccion = null;
  if (ruta === "/servicios") seccion = "/servicios";
  else if (ruta === "/proyectos" || ruta.startsWith("/proyecto_")) seccion = "/proyectos";
  else if (ruta === "/nosotros") seccion = "/nosotros";
  if (!seccion) return;
  const enlace = document.querySelector('.nav__link[href="' + seccion + '"]');
  if (enlace) {
    enlace.classList.add("activo");
    enlace.setAttribute("aria-current", "page");
  }
}
