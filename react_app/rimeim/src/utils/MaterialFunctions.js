import M from 'materialize-css';

export const configMaterialComponents = () => {
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

  const sidenav_overlay = document.getElementsByClassName('sidenav-overlay')[0];
  if (sidenav_overlay) {
    sidenav_overlay.setAttribute('style', 'display: none; opacity: 0;');
  }
};

export const onOpenEndImage = e => {
  if (e.parentElement.parentElement.classList.contains('img-item')) {
    if (e.classList.contains('adjust')) {
      e.classList.remove('adjust');
    }
  }
};

export const onCloseEndImage = e => {
  if (e.parentElement.parentElement.classList.contains('img-item')) {
    if (!e.classList.contains('adjust')) {
      e.classList.add('adjust');
    }
  }
};

export const removeMaterialComponents = () => {
  const sidenav_overlays = document.getElementsByClassName('sidenav-overlay');
  const drag_targets = document.getElementsByClassName('drag-target');
  const tooltips = document.getElementsByClassName('material-tooltip');
  const hidden_divs = document.getElementsByClassName('hiddendiv');

  if (sidenav_overlays && sidenav_overlays.length > 0) {
    for (let index = 0; index < sidenav_overlays.length; index++) {
      sidenav_overlays[index].parentNode.removeChild(sidenav_overlays[index]);
    }
  }

  if (drag_targets && drag_targets.length > 0) {
    for (let index = 0; index < drag_targets.length; index++) {
      drag_targets[index].parentNode.removeChild(drag_targets[index]);
    }
  }

  if (tooltips && tooltips.length > 0) {
    for (let index = 0; index < tooltips.length; index++) {
      tooltips[index].parentNode.removeChild(tooltips[index]);
    }
  }

  if (hidden_divs && hidden_divs.length > 0) {
    for (let index = 0; index < hidden_divs.length; index++) {
      hidden_divs[index].parentNode.removeChild(hidden_divs[index]);
    }
  }
};

export const updateTextFields = () => {
  M.updateTextFields();
};

export const configSelectInputFields = () => {
  M.FormSelect.init(document.querySelectorAll('select'), []);
};

export const getModalInstanceById = id => {
  const elem = document.getElementById(id);
  return M.Modal.getInstance(elem);
};

export const notificationError = message => {
  M.toast({ html: message, classes: 'rounded  red darken-3' });
};
