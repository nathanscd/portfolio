const menuBtn = document.getElementById('menu');
const menu = document.getElementById('btn');
const close = document.getElementById('close');

close.addEventListener('click', () => {
  menu.classList.remove('active');
});

menuBtn.addEventListener('click', () => {
  menu.classList.toggle('active');
});

const slides = document.querySelectorAll('.slide');
let currentIndex = 0;

function showNextSlide() {
  slides[currentIndex].classList.remove('active');
  currentIndex = (currentIndex + 1) % slides.length;
  slides[currentIndex].classList.add('active');
}

setInterval(showNextSlide, 5000);

const lenis = new Lenis({
  duration: 1.2, // control how smooth it feels
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // nice easing
  smoothWheel: true,
  smoothTouch: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);