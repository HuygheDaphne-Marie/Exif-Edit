document.querySelector('form').addEventListener('submit', e => {
  e.preventDefault();
  const $err = document.getElementById('err');
  let errors = false;
  errors = checkCheckboxes($err);

  if(errors) {
    $err.classList = 'alert alert-danger';
  } else {
    $err.classList = '';
    $err.innerHTML = '';
  }
});

function addError($err, text) {
  if($err.innerHTML.length <= 0) {
    $err.innerHTML = text;
  } else {
    $err.innerHTML = $err.innerHTML + ', ' + text;
  }
}

function checkCheckboxes($err) {
  const $checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
  if($checkboxes.length > 0) {
    return false; // No error encountered
  } else {
    addError($err, 'You to select atleast 1 image type (jpg, png)')
    return true; // Error encountered
  }
}
