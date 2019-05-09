import React, { Component } from 'react';
import uuid from 'uuid';
import NewNavbar from '../../layout/NewNavbar';

import '../../../public/css/devoluciones.css';

import {
  configMaterialComponents,
  removeMaterialComponents
} from '../../../utils/MaterialFunctions';

import SellColumnsDetails from '../../common/SellColumnsDetails';

class NewDevolution extends Component {
  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
  }

  render() {
    let rowsContent;
    return (
      <React.Fragment>
        <NewNavbar active_nav="DEVOLUCIONES">
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
              Nueva devolucion
            </a>
            <a href="#!" className="sidenav-trigger" data-target="nav_sidenav">
              <i className="material-icons">menu</i>
            </a>
            <ul className="right">
              <li>
                <a
                  href="#!"
                  className="tooltipped"
                  data-position="left"
                  data-tooltip="Finalizar"
                >
                  <i className="material-icons">check</i>
                </a>
              </li>
            </ul>
          </div>
        </NewNavbar>

        <main>
          <div className="row mb-0 mt-1">
            <div className="col s12 m5 l4">
              <div className="input-field">
                <select>
                  <option value="" disabled defaultValue>
                    Seleccionar
                  </option>
                  <option value="1">Remover</option>
                  <option value="2">Deshacer cambios</option>
                </select>
                <label>Acciones en lote</label>
              </div>
            </div>
          </div>
          <div className="row devolucion">
            <div className="col s12">
              <table className="table-bordered striped highlight header-fixed">
                <thead>
                  <tr>
                    <th className="header-th" />
                    <th>Codigo</th>
                    <th>Descripcion</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                  </tr>
                </thead>
                <tbody>{rowsContent}</tbody>
              </table>
            </div>
          </div>
          <div className="row col-bordered devolucion-total">
            <SellColumnsDetails colsize="s6" title="Total inicial" value="0" />
            <SellColumnsDetails colsize="s6" title="Total devuelto" value="0" />
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default NewDevolution;
