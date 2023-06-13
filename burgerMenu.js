const burgerBtn = document.getElementById('header__burger');
const burgerMenu = document.getElementById('burger-menu');
const burgerClose = document.getElementById('burger-close-btn');
console.log(burgerBtn);

burgerBtn.addEventListener('click', function () {
  burgerMenu.style.opacity = '1';
  burgerMenu.style.pointerEvents = 'auto';
});

burgerClose.addEventListener('click', function () {
  burgerMenu.style.opacity = '0';
  burgerMenu.style.pointerEvents = 'none';
});
