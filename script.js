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