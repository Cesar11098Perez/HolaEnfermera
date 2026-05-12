document.addEventListener("DOMContentLoaded", () => {

  /* ===== IMAGENES FLOTANTES ===== */

const images = [
  "enfermera.png",
  "enfermero.png",
  "EME.png"
];

const isMobile = window.innerWidth < 768;

for(let i = 0; i < 18; i++){

  const img = document.createElement("img");

  img.className = "floating";

  img.src =
    images[
      Math.floor(
        Math.random() * images.length
      )
    ];

  /* posiciones aleatorias */

  img.style.left =
    Math.random() * 100 + "vw";

  img.style.top =
    Math.random() * 100 + "vh";

  /* duración random */

  img.style.animationDuration =
    (6 + Math.random() * 10) + "s";

  img.style.animationDelay =
    (Math.random() * 5) + "s";

  /* tamaños responsive */

  const size = isMobile
    ? 55 + Math.random() * 35
    : 95 + Math.random() * 70;

  img.style.width = size + "px";
  img.style.height = "auto";

  /* movimiento random */

  const moveX =
    (Math.random() * 400 - 200) + "px";

  const moveY =
    (Math.random() * 400 - 200) + "px";

  img.style.setProperty("--moveX", moveX);
  img.style.setProperty("--moveY", moveY);

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