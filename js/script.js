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

/*=============== HORARIO DE ATENCIÓN (siempre en hora de Lima) ===============*/
// Horas de apertura y cierre por día (0 = domingo). Domingos y feriados: cerrado.
const HORARIO_ATENCION = { 1: [8, 17], 2: [8, 17], 3: [8, 17], 4: [8, 17], 5: [8, 17], 6: [8, 12] };
const DIAS_SEMANA = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
// Feriados nacionales de fecha fija (mes-día). Jueves y Viernes Santo se calculan aparte.
const FERIADOS_FIJOS = ["01-01", "05-01", "06-07", "06-29", "07-23", "07-28", "07-29", "08-06", "08-30", "10-08", "11-01", "12-08", "12-09", "12-25"];

function fechaPascua(anio) {
  // Algoritmo de Meeus/Jones/Butcher (calendario gregoriano)
  const a = anio % 19, b = Math.floor(anio / 100), c = anio % 100;
  const d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const mes = Math.floor((h + l - 7 * m + 114) / 31), dia = ((h + l - 7 * m + 114) % 31) + 1;
  return Date.UTC(anio, mes - 1, dia);
}

function esFeriado(fechaUTC) {
  const f = new Date(fechaUTC);
  const clave = String(f.getUTCMonth() + 1).padStart(2, "0") + "-" + String(f.getUTCDate()).padStart(2, "0");
  if (FERIADOS_FIJOS.includes(clave)) return true;
  const pascua = fechaPascua(f.getUTCFullYear());
  const dia = 86400000;
  return fechaUTC === pascua - 3 * dia || fechaUTC === pascua - 2 * dia; // jueves y viernes santo
}

function horaTexto(h) {
  return (h % 12 === 0 ? 12 : h % 12) + ":00 " + (h < 12 ? "a. m." : "p. m.");
}

// Devuelve { abierto, texto } para el instante dado
function estadoHorario(ahora) {
  const partes = {};
  new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Lima", year: "numeric", month: "numeric", day: "numeric",
    hour: "numeric", minute: "numeric", hourCycle: "h23",
  }).formatToParts(ahora).forEach((p) => (partes[p.type] = parseInt(p.value, 10)));
  const hoyUTC = Date.UTC(partes.year, partes.month - 1, partes.day);
  const minutos = partes.hour * 60 + partes.minute;

  const horarioHoy = esFeriado(hoyUTC) ? null : HORARIO_ATENCION[new Date(hoyUTC).getUTCDay()];
  if (horarioHoy && minutos >= horarioHoy[0] * 60 && minutos < horarioHoy[1] * 60) {
    return { abierto: true, texto: "Atendiendo ahora · hasta las " + horaTexto(horarioHoy[1]) };
  }
  // Próxima apertura
  for (let i = 0; i < 9; i++) {
    const diaUTC = hoyUTC + i * 86400000;
    const h = esFeriado(diaUTC) ? null : HORARIO_ATENCION[new Date(diaUTC).getUTCDay()];
    if (!h || (i === 0 && minutos >= h[0] * 60)) continue;
    const cuando = i === 0 ? "hoy" : i === 1 ? "mañana" : "el " + DIAS_SEMANA[new Date(diaUTC).getUTCDay()];
    return { abierto: false, texto: "Fuera de horario · Retomamos " + cuando + " a las " + horaTexto(h[0]) };
  }
  return { abierto: false, texto: "Fuera de horario" };
}

function mostrarEstadoHorario() {
  document.querySelectorAll("[data-horario-estado]").forEach((el) => {
    const estado = estadoHorario(new Date());
    el.querySelector(".horario__texto").textContent = estado.texto;
    el.classList.toggle("horario__estado--abierto", estado.abierto);
    el.hidden = false;
  });
}
document.addEventListener("DOMContentLoaded", mostrarEstadoHorario);
