const menuBtn = document.getElementById('menu');
const menu = document.getElementById('btn');
const close = document.getElementById('close');

close.addEventListener('click', () => {
  menu.classList.remove('active');
});

menuBtn.addEventListener('click', () => {
  menu.classList.toggle('active');
});
