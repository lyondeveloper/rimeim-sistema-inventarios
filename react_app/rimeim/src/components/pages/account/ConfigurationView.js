import React, { Component } from 'react';

import Navbar from '../../layout/NewNavbar';

import {
  configMaterialComponents,
  removeMaterialComponents
} from '../../../utils/MaterialFunctions';

import Configuration from './Configuration';

class AdminConfiguration extends Component {
  state = {
    is_editing: false
  };
  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
  }

  onClickEditing = () => {
    this.setState({
      is_editing: !this.state.is_editing
    });
  };

  render() {
    return (
      <React.Fragment>
        <Navbar active_nav="CUENTA">
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
              Configuracion
            </a>
            <a href="#!" className="sidenav-trigger" data-target="nav_sidenav">
              <i className="material-icons">menu</i>
            </a>
            <ul className="right">
              <li>
                <a href="#!" onClick={this.onClickEditing}>
                  <i className="material-icons">edit</i>
                </a>
              </li>
            </ul>
          </div>
        </Navbar>

        <main>
          <Configuration is_editing={this.state.is_editing} />
        </main>
      </React.Fragment>
    );
  }
}

export default AdminConfiguration;
