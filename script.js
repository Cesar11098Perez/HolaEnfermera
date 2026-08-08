/* SPLASH */

const splash = document.getElementById('splash');

/* MUSICA */

const btn = document.getElementById('musicBtn');

const music = document.getElementById('bgMusic');

/* AUTOPLAY */

window.addEventListener('load', () => {

  music.volume = 0.7;

  const playPromise = music.play();

  if(playPromise !== undefined){

    playPromise.then(() => {

      btn.innerHTML = `
        <span class="note">🎵</span>
        Pausar música
      `;

    }).catch(() => {

      console.log('Autoplay bloqueado');

    });

  }

});

/* SPLASH */

splash.addEventListener('click', () => {

  splash.classList.add('hidden');

  createConfetti();

  music.play();

  btn.innerHTML = `
    <span class="note">🎵</span>
    Pausar música
  `;

});

/* BOTON MUSICA */

btn.addEventListener('click', () => {

  if(music.paused){

    music.play();

    btn.innerHTML = `
      <span class="note">🎵</span>
      Pausar música
    `;

  }else{

    music.pause();

    btn.innerHTML = `
      <span class="note">🎵</span>
      Reproducir música
    `;

  }

});

/* REVEAL */

const reveals = document.querySelectorAll('.reveal');

function revealOnScroll(){

  reveals.forEach(el => {

    const top = el.getBoundingClientRect().top;

    if(top < window.innerHeight - 100){

      el.classList.add('visible');

    }

  });

}

window.addEventListener('scroll', revealOnScroll);

revealOnScroll();

/* CONFETTI */

function createConfetti(){

  for(let i = 0; i < 120; i++){

    const conf = document.createElement('div');

    conf.className = 'confetti-piece';

    conf.style.left = Math.random() * 100 + 'vw';

    conf.style.background =
      `hsl(${Math.random()*360},100%,60%)`;

    conf.style.animationDuration =
      (Math.random()*3 + 2) + 's';

    document.body.appendChild(conf);

    setTimeout(() => {

      conf.remove();

    },5000);

  }

}

/* PARTICULAS */

const canvas = document.getElementById('bg');

const ctx = canvas.getContext('2d');

function resizeCanvas(){

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener('resize', resizeCanvas);

let particles = [];

for(let i = 0; i < 80; i++){

  particles.push({

    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    r:Math.random()*2+1,
    dx:(Math.random()-0.5)*0.5,
    dy:(Math.random()-0.5)*0.5

  });

}

function animate(){

  ctx.clearRect(0,0,canvas.width,canvas.height);

  ctx.fillStyle = 'rgba(255,111,216,0.7)';

  particles.forEach(p => {

    p.x += p.dx;
    p.y += p.dy;

    if(p.x < 0 || p.x > canvas.width){

      p.dx *= -1;

    }

    if(p.y < 0 || p.y > canvas.height){

      p.dy *= -1;

    }

    ctx.beginPath();

    ctx.arc(
      p.x,
      p.y,
      p.r,
      0,
      Math.PI * 2
    );

    ctx.fill();

  });

  requestAnimationFrame(animate);

}

animate();

/* VIDEOS */

const videos = document.querySelectorAll('.birthday-video');

/* pausar musica al reproducir video */

videos.forEach(video => {

  /* reproducir video */

  video.addEventListener('play', () => {

    music.pause();

    btn.innerHTML = `
      <span class="note">🎵</span>
      Reproducir música
    `;

    /* pausar otros videos */

    videos.forEach(v => {

      if(v !== video){

        v.pause();

      }

    });

  });

  /* cuando pausa */

  video.addEventListener('pause', () => {

    const allPaused = [...videos].every(v => v.paused);

    if(allPaused){

      music.play();

      btn.innerHTML = `
        <span class="note">🎵</span>
        Pausar música
      `;

    }

  });

  /* cuando termina */

  video.addEventListener('ended', () => {

    music.play();

    btn.innerHTML = `
      <span class="note">🎵</span>
      Pausar música
    `;

  });

  /* fullscreen */

  video.addEventListener('fullscreenchange', () => {

    if(!document.fullscreenElement){

      const allPaused = [...videos].every(v => v.paused);

      if(allPaused){

        music.play();

        btn.innerHTML = `
          <span class="note">🎵</span>
          Pausar música
        `;

      }

    }

  });

});

/* SLIDER AUTOMATICO */

const slides = document.querySelectorAll('.slide');

/* detecta cual imagen tiene la clase "active" en el HTML */
/* y arranca el carrusel desde ahi */

let currentSlide = [...slides].findIndex(s => s.classList.contains('active'));

if(currentSlide === -1){

  currentSlide = 0;

}

function showSlide(index){

  slides.forEach(slide => {

    slide.classList.remove('active');

  });

  slides[index].classList.add('active');

}

setInterval(() => {

  currentSlide++;

  if(currentSlide >= slides.length){

    currentSlide = 0;

  }

  showSlide(currentSlide);

},3500);
