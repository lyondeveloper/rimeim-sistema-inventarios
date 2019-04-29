import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  configMaterialComponents,
  removeMaterialComponents,
  configMaterialBoxedImages
} from '../../../utils/MaterialFunctions';

import { getClient, deleteClient } from '../../../actions/clientActions';

import Spinner from '../../common/Spinner';
import NewNavBar from '../../layout/NewNavbar';
import ConfirmationModal from '../../layout/modals/ConfirmationModal';

class Client extends Component {
  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
    this.props.getClient(this.props.match.params.id);
  }

  componentDidUpdate() {
    configMaterialBoxedImages();
  }

  onConfirmDeleteClient = () => {
    this.props.deleteClient(
      this.props.match.params.id,
      this.props.history,
      '/clientes'
    );
  };

  render() {
    const {
      loading,
      client: { id, nombre, rtn, correo, telefono, codigo, imagen, es_empresa }
    } = this.props.clients;

    let clientContent;

    if (loading) clientContent = <Spinner fullWidth />;
    else {
      clientContent = (
        <div className='row'>
          <div className='col s12'>
            <div className='card'>
              <div className='card-content'>
                {imagen && (
                  <div className='horizontal-scroll-container'>
                    <div className='img-item'>
                      <img
                        src={imagen.url}
                        className='materialboxed adjust'
                        alt=''
                      />
                    </div>
                  </div>
                )}
                <table className='striped table-bordered'>
                  <tbody>
                    <tr>
                      <td>ID</td>
                      <td>{id}</td>
                    </tr>
                    <tr>
                      <td>Nombre</td>
                      <td>{nombre}</td>
                    </tr>
                    <tr>
                      <td>RTN</td>
                      <td>{rtn}</td>
                    </tr>

                    <tr>
                      <td>Codigo</td>
                      <td>{codigo}</td>
                    </tr>

                    <tr>
                      <td>Telefono</td>
                      <td>{telefono}</td>
                    </tr>

                    <tr>
                      <td>Correo</td>
                      <td>{correo}</td>
                    </tr>
                    <tr>
                      <td>Es Empresa</td>
                      <td>{es_empresa ? true : false}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <button
              className='btn red darken-3 modal-trigger'
              data-target='modal_confirmar_evento'
            >
              Eliminar
            </button>
          </div>
        </div>
      );
    }

    return (
      <React.Fragment>
        <NewNavBar active_nav='CLIENTES'>
          <div className='nav-wrapper'>
            <a href='#!' className='brand-logo'>
              Cliente
            </a>
            <a href='#!' className='sidenav-trigger' data-target='nav_sidenav'>
              <i className='material-icons'>menu</i>
            </a>

            <ul className='right'>
              <li>
                <Link to={`/editar_cliente/${this.props.match.params.id}`}>
                  <i className='material-icons cursor-pointer'>edit</i>
                </Link>
              </li>
            </ul>
          </div>
        </NewNavBar>
        <main className='center'>{clientContent}</main>

        <ConfirmationModal
          title='Eliminar cliente'
          message='Esta seguro de que quiere eliminar este cliente? No se podra revertir la operacion'
          onAccept={this.onConfirmDeleteClient}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  clients: state.client
});

export default connect(
  mapStateToProps,
  { getClient, deleteClient }
)(withRouter(Client));
