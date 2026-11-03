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
window.addEventListener("scroll", function(){
  const header = this.document.querySelector(".header");
  const logo = this.document.querySelector(".contenedor-header");
  
  header.classList.toggle("sticky", this.window.scrollY > 0);
  logo.classList.toggle("sticky", this.window.scrollY > 0);
 
});