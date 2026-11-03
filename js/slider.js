document.addEventListener("DOMContentLoaded", function () {
  //fijar menu
  //navegacionFija();
  fetch("/components/slider.html", { cache: "no-cache" })
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("sliderPlaceholder").innerHTML = data;

      let items = document.querySelectorAll(".slider .list .item");
      let next = document.getElementById("next");
      let prev = document.getElementById("prev");
      let thumbnails = document.querySelectorAll(".thumbnail .item__thumbnail");

      let countItem = items.length;
      let itemActive = 0;
      //evento next click
      next.onclick = function () {
        itemActive = itemActive + 1;
        if (itemActive >= countItem) {
          itemActive = 0;
        }
        showSlider();
      };
      //evento prev click
      prev.onclick = function () {
        itemActive = itemActive - 1;
        if (itemActive < 0) {
          itemActive = countItem - 1;
        }
        showSlider();
      };
      //auto ruun slider
      let refreshInterval = setInterval(() => {
        next.click();
      }, 8000);
      function showSlider() {
        //remove item active old
        let itemActiveOld = document.querySelector(
          ".slider .list .item.active"
        );
        let thumbnailActiveOld = document.querySelector(
          ".thumbnail .item__thumbnail.active"
        );
        itemActiveOld.classList.remove("active");
        thumbnailActiveOld.classList.remove("active");

        //active new item
        items[itemActive].classList.add("active");
        thumbnails[itemActive].classList.add("active");

        //clear auto time run slider
        clearInterval(refreshInterval);
        refreshInterval = setInterval(() => {
          next.click();
        }, 8000);
      }
      //click thumbnail
      thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener("click", () => {
          itemActive = index;
          showSlider();
        });
      });
    });
});
/*
function navegacionFija(){
  const header = document.querySelector(".header");
  const sobreSlider = document.querySelector(".sliderPlaceholder");

  window.addEventListener('scroll', function(){
    console.log(sobreSlider.getBoundingClientRect().bottom);
  });

}
*/