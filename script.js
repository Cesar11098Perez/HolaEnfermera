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

  /* tonos dentro de la paleta vino / oro / crema */

  const hues = [350, 355, 40, 45, 48];

  for(let i = 0; i < 120; i++){

    const conf = document.createElement('div');

    conf.className = 'confetti-piece';

    conf.style.left = Math.random() * 100 + 'vw';

    const hue = hues[Math.floor(Math.random() * hues.length)];

    conf.style.background =
      `hsl(${hue},70%,${55 + Math.random()*15}%)`;

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

  ctx.fillStyle = 'rgba(201,169,97,0.55)';

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

/* GALERIA: foto principal + miniaturas */

const mainImgs = document.querySelectorAll('.main-img');

const thumbs = document.querySelectorAll('.thumb');

/* arranca en la imagen marcada como "active" en el HTML, si existe */

let currentSlide = [...mainImgs].findIndex(img => img.classList.contains('active'));

if(currentSlide === -1){

  currentSlide = 0;

}

function showSlide(index){

  mainImgs.forEach(img => {

    img.classList.remove('active');

  });

  thumbs.forEach(t => {

    t.classList.remove('active');

  });

  mainImgs[index].classList.add('active');

  if(thumbs[index]){

    thumbs[index].classList.add('active');

  }

  currentSlide = index;

}

/* click en una miniatura muestra esa foto */

thumbs.forEach((thumb, index) => {

  thumb.addEventListener('click', () => {

    showSlide(index);

  });

});

/* autoplay cada 3.5s */

setInterval(() => {

  let next = currentSlide + 1;

  if(next >= mainImgs.length){

    next = 0;

  }

  showSlide(next);

},3500);
