  /*=============== MIXITUP FILTER PROJECTS ===============*/
  let mixerProjects = mixitup('.proyecto__madermel', {
    selectors: {
      target: '.projects__card'
    },
    animation: {
      duration: 300
    }
  });
  /* Default filter projects */
  mixerProjects.filter('.cocina')
  
  /* Link active projects */
  const linkProjects = document.querySelectorAll('.projects__item');
  
  function activeProjects() {
    linkProjects.forEach(l => l.classList.remove('active-project'));
    this.classList.add('active-project')
  }
  
  linkProjects.forEach(l => l.addEventListener('click', activeProjects));

  /* GALERIA LIGHTBOX */

  const images = document.querySelectorAll('.projects__img');
  const conatainerImage = document.querySelector('.container-img');
  const imageContainer = document.querySelector('.img-show');

  images.forEach(Image =>{
    Image.addEventListener('click', ()=>{
      
      addImage(Image.getAttribute('src'));
  
    })
  })

  const addImage = (srcImage)=>{
    conatainerImage.classList.toggle('move');
    imageContainer.classList.toggle('show');
    imageContainer.src = srcImage;
  }

  conatainerImage.addEventListener('click', ()=>{
    conatainerImage.classList.toggle('move');
    imageContainer.classList.toggle('show');
  })

