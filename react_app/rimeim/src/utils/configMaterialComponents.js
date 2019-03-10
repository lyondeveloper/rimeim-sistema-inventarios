import M from 'materialize-css'

const configMaterialComponents = () => {
    M.Sidenav.init(document.querySelectorAll('.sidenav'), []);
    M.Collapsible.init(document.querySelectorAll('.collapsible'), []);
    M.Modal.init(document.querySelectorAll('.modal'), []);
    M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'), []);
    M.FormSelect.init(document.querySelectorAll('select'), []);
    M.Tooltip.init(document.querySelectorAll('.tooltipped'), []);
    M.updateTextFields();
}

export default configMaterialComponents