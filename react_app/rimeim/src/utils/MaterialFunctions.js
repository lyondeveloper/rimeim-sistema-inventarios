import M from 'materialize-css'

export const configMaterialComponents = () => {
    M.Sidenav.init(document.querySelectorAll('.sidenav'), []);
    M.Collapsible.init(document.querySelectorAll('.collapsible'), []);
    M.Modal.init(document.querySelectorAll('.modal'), []);
    M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'), []);
    M.FormSelect.init(document.querySelectorAll('select'), []);
    M.Tooltip.init(document.querySelectorAll('.tooltipped'), []);
    M.updateTextFields();

    const sidenav_overlay = document.getElementsByClassName('sidenav-overlay')[0]
    if (sidenav_overlay) {
        sidenav_overlay.setAttribute('style', 'display: none; opacity: 0;')
    }
}

export const removeMaterialComponents = () => {
    const sidenav_overlays = document.getElementsByClassName('sidenav-overlay')
    const drag_targets = document.getElementsByClassName('drag-target')
    const tooltips = document.getElementsByClassName('material-tooltip')

    if (sidenav_overlays && sidenav_overlays.length > 0) {
        for (let index = 0; index < sidenav_overlays.length; index++) {
            sidenav_overlays[index].parentNode.removeChild(sidenav_overlays[index])
        }
    }

    if (drag_targets && drag_targets.length > 0) {
        for (let index = 0; index < drag_targets.length; index++) {
            drag_targets[index].parentNode.removeChild(drag_targets[index])
        }
    }

    if (tooltips && tooltips.length > 0) {
        for (let index = 0; index < tooltips.length; index++) {
            tooltips[index].parentNode.removeChild(tooltips[index])
        }
    }
}