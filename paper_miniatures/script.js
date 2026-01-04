const toggle = document.getElementById('printColorToggle');
const base = document.getElementsByClassName('print-color')[0];
const params = new URLSearchParams(window.location.search);

toggle.addEventListener('change', e => {
  if (e.target.checked) {
    base.classList.add('print-color');
  } else {
    base.classList.remove('print-color');
  }
});

if (params.has('color')) {
  base.classList.add('print-color');
  toggle.checked = true;
}

if (params.has('no_color')) {
  base.classList.remove('print-color');
  toggle.checked = false;
}