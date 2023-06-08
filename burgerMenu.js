const burgerBtn = document.getElementById('header__burger');
const burgerMenu = document.getElementById('burger-menu');
const burgerClose = document.getElementById('burger-close-btn');
console.log(burgerBtn);

burgerBtn.addEventListener('click', function () {
  burgerMenu.style.transform = 'opacity: 1';
});

burgerClose.addEventListener('click', function () {
  burgerMenu.style.transform = 'opacity: 0';
});
