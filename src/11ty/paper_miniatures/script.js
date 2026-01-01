const toggle = document.getElementById('printColorToggle');
const base = document.getElementsByClassName('print-color')[0];
toggle.addEventListener('change', e => {
  if (e.target.checked) {
    base.classList.add('print-color');
  } else {
    base.classList.remove('print-color');
  }
});