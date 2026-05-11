document.addEventListener("DOMContentLoaded", () => {

  /* ===== IMAGENES FLOTANTES ===== */

  const images = [
    "enfermera.png",
    "enfermero.png",
    "EME.png"
  ];

  for(let i = 0; i < 18; i++){

    const img = document.createElement("img");

    img.className = "floating";

    img.src =
      images[
        Math.floor(
          Math.random() * images.length
        )
      ];

    img.style.left =
      Math.random() * 90 + "vw";

    img.style.animationDuration =
      (5 + Math.random() * 8) + "s";

    img.style.animationDelay =
      (Math.random() * 8) + "s";

    const size =
      98 + Math.random() * 70;

    img.style.width = size + "px";
    img.style.height = size + "px";

    document.body.appendChild(img);
  }

  /* ===== MUSICA ===== */

  const audio =
    document.getElementById("audio");

  audio.play().catch(() => {

    document.body.addEventListener(
      "click",
      () => {
        audio.play();
      },
      { once:true }
    );

  });

  /* ===== CARRUSEL ===== */

  const carousel =
    document.getElementById("carousel");

  let currentSlide = 0;

  setInterval(() => {

    const slides =
      carousel.querySelectorAll("img");

    if(slides.length === 0) return;

    currentSlide++;

    if(currentSlide >= slides.length){
      currentSlide = 0;
    }

    carousel.style.transform =
      `translateX(-${currentSlide * 100}%)`;

  }, 3000);

});