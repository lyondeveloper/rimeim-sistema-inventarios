document.addEventListener('DOMContentLoaded', function() {
  M.Sidenav.init(document.querySelectorAll('.sidenav'), []);
  M.Collapsible.init(document.querySelectorAll('.collapsible'), []);
  M.Modal.init(document.querySelectorAll('.modal'), []);
  M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'), []);
  M.FormSelect.init(document.querySelectorAll('select'), []);
  M.Tooltip.init(document.querySelectorAll('.tooltipped'), []);
  M.Materialbox.init(document.querySelectorAll('.materialboxed'), {
    onOpenEnd: onOpenEndImage,
    onCloseEnd: onCloseEndImage
  });
  M.updateTextFields();
});

function onOpenEndImage(e) {
  if (e.parentElement.parentElement.classList.contains('img-item')) {
    if (e.classList.contains('adjust')) {
      e.classList.remove('adjust');
    }
  }
}

function onCloseEndImage(e) {
  if (e.parentElement.parentElement.classList.contains('img-item')) {
    if (!e.classList.contains('adjust')) {
      e.classList.add('adjust');
    }
  }
}

function onChangeInputFileImage(input, id) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      document.getElementById(id).setAttribute('src', e.target.result);
    };

    reader.readAsDataURL(input.files[0]);
  }
}
