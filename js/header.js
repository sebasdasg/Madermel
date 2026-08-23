//CARGAR HEADER
document.addEventListener("DOMContentLoaded", function () {
  fetch("/components/header.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("headerPlaceholder").innerHTML = data;
      /*==================== SHOW MENU ====================*/
      const navMenu = document.getElementById("nav-menu"),
        navToggle = document.getElementById("nav-toggle"),
        navClose = document.getElementById("nav-close");

      /*===== MENU SHOW =====*/
      /* Validate if constant exists */
      if (navToggle) {
        navToggle.addEventListener("click", () => {
          navMenu.classList.add("show-menu");
          document.body.classList.add("no-scroll");
        });
      }
      /*===== MENU HIDDEN =====*/
      /* Validate if constant exists */
      if (navClose) {
        navClose.addEventListener("click", () => {
          navMenu.classList.remove("show-menu");
          document.body.classList.remove("no-scroll");
          cerrarSubmenuProyectos();
        });
      }
      /*===== SUBMENU PROYECTOS =====*/
      const subToggleProyectos = document.getElementById("nav-sub-toggle-proyectos"),
        sublistProyectos = document.getElementById("nav-sublist-proyectos");

      function cerrarSubmenuProyectos() {
        if (subToggleProyectos && sublistProyectos) {
          sublistProyectos.classList.remove("nav__sublist--open");
          subToggleProyectos.setAttribute("aria-expanded", "false");
        }
      }

      if (subToggleProyectos && sublistProyectos) {
        subToggleProyectos.addEventListener("click", (e) => {
          e.stopPropagation();
          const abierto = sublistProyectos.classList.toggle("nav__sublist--open");
          subToggleProyectos.setAttribute("aria-expanded", abierto);
        });
      }
      /*==========DHOW MENU INFO============*/
      const navInfo = document.getElementById('nav-info'),
        infoIcon = document.getElementById('nav-info-icon'),
        infoClose = document.getElementById('nav-close-info');
        /*===MENU INFO===*/
        if(infoIcon) {
          infoIcon.addEventListener("click", () => {
            navInfo.classList.add("show-menu-info");
            document.body.classList.add("no-scroll");
          });
        }
        /*===MENU INFO - CLOSE===*/
        if(infoClose){
          infoClose.addEventListener("click", () => {
            navInfo.classList.remove("show-menu-info");
            document.body.classList.remove("no-scroll");
          });
        }
        /*===== CERRAR AL HACER CLIC AFUERA =====*/
        document.addEventListener("click", (e) => {
          if (
            navMenu.classList.contains("show-menu") &&
            !navMenu.contains(e.target) &&
            e.target !== navToggle &&
            !navToggle.contains(e.target)
          ) {
            navMenu.classList.remove("show-menu");
            document.body.classList.remove("no-scroll");
            cerrarSubmenuProyectos();
          }
          if (
            navInfo.classList.contains("show-menu-info") &&
            !navInfo.contains(e.target) &&
            e.target !== infoIcon &&
            !infoIcon.contains(e.target)
          ) {
            navInfo.classList.remove("show-menu-info");
            document.body.classList.remove("no-scroll");
          }
        });
        //aqui iba slider

    });
});

