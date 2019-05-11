import React, { Component } from 'react';

import {
  configMaterialComponents,
  removeMaterialComponents
} from '../../../../utils/MaterialFunctions';

import Navbar from '../../../layout/NewNavbarAdmin';
import ShowNotifications from '../../../common/ShowNotifications';

class Notifications extends Component {
  componentWillMount() {
    removeMaterialComponents();
  }
  componentDidMount() {
    configMaterialComponents();
  }

  render() {
    return (
      <React.Fragment>
        <Navbar active_nav="CUENTA">
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
              Notificaciones
            </a>
            <a href="#!" className="sidenav-trigger" data-target="nav_sidenav">
              <i className="material-icons">menu</i>
            </a>
          </div>
        </Navbar>
        <ShowNotifications />
      </React.Fragment>
    );
  }
}

export default Notifications;
