var acc = document.getElementsByClassName('accordion');
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener('click', function () {
    var isActive = this.classList.contains('accordion-active');

    // Remove "accordion-active" class from all accordions
    for (var j = 0; j < acc.length; j++) {
      acc[j].classList.remove('accordion-active');
      acc[j].nextElementSibling.style.maxHeight = null;
    }

    // If the clicked accordion was not active, add "accordion-active" class and expand the panel
    if (!isActive) {
      this.classList.add('accordion-active');
      var panel = this.nextElementSibling;
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  });
}
