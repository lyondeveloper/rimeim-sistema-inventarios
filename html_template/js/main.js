document.addEventListener('DOMContentLoaded', function () {
    M.Sidenav.init(document.querySelectorAll('.sidenav'), []);
    M.Collapsible.init(document.querySelectorAll('.collapsible'), []);
    M.Modal.init(document.querySelectorAll('.modal'), []);
    M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'), []);
    M.FormSelect.init(document.querySelectorAll('select'), []);
    M.updateTextFields();
});