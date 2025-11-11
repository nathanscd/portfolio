const menuBtn = document.getElementById('menu');
const menu = document.getElementById('btn');

menuBtn.addEventListener('click', () => {
  menu.classList.toggle('active');
});
