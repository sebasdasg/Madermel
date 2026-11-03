document.addEventListener('DOMContentLoaded', function(){

  //CARGAR FOOTER
cargarFragmento("footerPlaceholder", "/components/footer.html");

})

function cargarFragmento(idContenedor, rutaHTML) {
  fetch(rutaHTML, { cache: "no-cache" })
    .then((response) => response.text())
    .then((html) => {
      document.getElementById(idContenedor).innerHTML = html;
    });
}
// Sombra en la cabecera cuando la página ya se desplazó
window.addEventListener("scroll", function(){
  const header = document.querySelector(".header");
  if (header) header.classList.toggle("sticky", window.scrollY > 40);
}, { passive: true });
