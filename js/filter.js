  /*=============== MIXITUP FILTER PROJECTS ===============*/
  let mixerProjects = mixitup('.proyecto__madermel', {
    selectors: {
      target: '.projects__card'
    },
    animation: {
      duration: 300
    }
  });
  /* Default filter projects: la categoría marcada como "active-project" (o .cocina si no hay filtros) */
  const filtroInicial = document.querySelector('.projects__item.active-project');
  mixerProjects.filter(filtroInicial ? filtroInicial.dataset.filter : '.cocina')
  
  /* Link active projects */
  const linkProjects = document.querySelectorAll('.projects__item');
  
  function activeProjects() {
    linkProjects.forEach(l => l.classList.remove('active-project'));
    this.classList.add('active-project');
    document.querySelectorAll('.projects__video').forEach(v => v.pause());
  }
  
  linkProjects.forEach(l => l.addEventListener('click', activeProjects));

  /* GALERIA LIGHTBOX: flechas, teclado, deslizar con el dedo y contador */

  const conatainerImage = document.querySelector('.container-img');
  const imageContainer = document.querySelector('.img-show');
  let listaFotos = [];
  let indiceActual = 0;

  /* Controles creados desde aquí para no repetir el HTML en cada proyecto */
  function crearControl(etiqueta, clase, contenido, aria) {
    const el = document.createElement(etiqueta);
    el.className = clase;
    el.innerHTML = contenido;
    if (aria) el.setAttribute('aria-label', aria);
    if (etiqueta === 'button') el.type = 'button';
    conatainerImage.appendChild(el);
    return el;
  }
  const flecha = '<svg class="icon-svg"><use href="#fa-chevron-down"></use></svg>';
  const btnPrev = crearControl('button', 'lightbox__nav lightbox__nav--prev', flecha, 'Foto anterior');
  const btnNext = crearControl('button', 'lightbox__nav lightbox__nav--next', flecha, 'Foto siguiente');
  const contador = crearControl('div', 'lightbox__count', '');

  function mostrarFoto() {
    const foto = listaFotos[indiceActual];
    imageContainer.style.opacity = 0;
    imageContainer.onload = () => (imageContainer.style.opacity = 1);
    imageContainer.src = foto.getAttribute('src');
    imageContainer.alt = foto.alt || '';
    const varias = listaFotos.length > 1;
    btnPrev.hidden = !varias;
    btnNext.hidden = !varias;
    contador.hidden = !varias;
    contador.textContent = (indiceActual + 1) + ' / ' + listaFotos.length;
    // Precarga las vecinas para que el cambio sea inmediato
    [indiceActual - 1, indiceActual + 1].forEach((i) => {
      if (listaFotos[i]) new Image().src = listaFotos[i].getAttribute('src');
    });
  }

  function abrirLightbox(foto) {
    // Solo las fotos de la categoría que se está viendo
    const filtroActivo = document.querySelector('.projects__item.active-project');
    listaFotos = [...document.querySelectorAll('.projects__card')]
      .filter((card) => !filtroActivo || card.matches(filtroActivo.dataset.filter))
      .map((card) => card.querySelector('.projects__img'))
      .filter(Boolean);
    indiceActual = listaFotos.indexOf(foto);
    if (indiceActual === -1) {
      listaFotos = [foto];
      indiceActual = 0;
    }
    mostrarFoto();
    conatainerImage.classList.add('move');
    imageContainer.classList.add('show');
    document.body.classList.add('no-scroll');
  }

  function cerrarLightbox() {
    conatainerImage.classList.remove('move');
    imageContainer.classList.remove('show');
    document.body.classList.remove('no-scroll');
  }

  function cambiarFoto(paso) {
    indiceActual = (indiceActual + paso + listaFotos.length) % listaFotos.length;
    mostrarFoto();
  }

  document.querySelectorAll('.projects__img').forEach((foto) => {
    foto.addEventListener('click', () => abrirLightbox(foto));
  });

  btnPrev.addEventListener('click', (e) => { e.stopPropagation(); cambiarFoto(-1); });
  btnNext.addEventListener('click', (e) => { e.stopPropagation(); cambiarFoto(1); });

  // Cierra al tocar el fondo o la X (no al tocar la foto ni las flechas)
  conatainerImage.addEventListener('click', (e) => {
    if (e.target === conatainerImage || e.target.closest('.x-lightBox')) cerrarLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!conatainerImage.classList.contains('move')) return;
    if (e.key === 'Escape') cerrarLightbox();
    if (e.key === 'ArrowLeft') cambiarFoto(-1);
    if (e.key === 'ArrowRight') cambiarFoto(1);
  });

  // Deslizar con el dedo en el celular
  let toqueInicioX = null;
  conatainerImage.addEventListener('touchstart', (e) => { toqueInicioX = e.changedTouches[0].clientX; }, { passive: true });
  conatainerImage.addEventListener('touchend', (e) => {
    if (toqueInicioX === null || listaFotos.length < 2) return;
    const dx = e.changedTouches[0].clientX - toqueInicioX;
    toqueInicioX = null;
    if (Math.abs(dx) > 50) cambiarFoto(dx < 0 ? 1 : -1);
  }, { passive: true });
