import React, { Component } from 'react';

import NavbarAdmin from '../../layout/NewNavbarAdmin';

import {
  configMaterialComponents,
  removeMaterialComponents
} from '../../../utils/MaterialFunctions';

import logo_rimeim from '../../../public/img/logo_rimeim.png';

class AdminArea extends Component {
  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
  }

  render() {
    return (
      <React.Fragment>
        <NavbarAdmin>
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
              Area de administrador
            </a>
            <a href="#!" className="sidenav-trigger" data-target="nav_sidenav">
              <i className="material-icons">menu</i>
            </a>
          </div>
        </NavbarAdmin>
        <main>
          <div className="container">
            <div className="row">
              <div className="col s12" style={{ height: '500px' }}>
                <center>
                  <img src={logo_rimeim} alt="Logo rimeim" className="mt-1" />
                </center>
              </div>
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default AdminArea;
