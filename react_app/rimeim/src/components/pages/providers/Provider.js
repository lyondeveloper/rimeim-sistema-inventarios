import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  configMaterialComponents,
  removeMaterialComponents,
  configMaterialBoxedImages
} from '../../../utils/MaterialFunctions';

import { getProvider, deleteProvider } from '../../../actions/providerActions';

import Spinner from '../../common/Spinner';
import NewNavBar from '../../layout/NewNavbar';
import ConfirmationModal from '../../layout/modals/ConfirmationModal';

class Provider extends Component {
  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
    this.props.getProvider(this.props.match.params.id);
  }

  componentDidUpdate() {
    configMaterialBoxedImages();
  }

  onConfirmDeleteProvider = () => {
    this.props.deleteProvider(this.props.match.params.id, this.props.history);
  };

  render() {
    const {
      loading,
      provider: { id, nombre, rtn, correo, telefono, codigo, imagen }
    } = this.props.providers;

    let providerContent;

    if (loading) providerContent = <Spinner fullWidth />;
    else {
      providerContent = (
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
                  </tbody>
                </table>
              </div>
            </div>

            <Link to='/realizar_pedido' className='text-white'>
              <button className='btn blue darken-3 ml-1'>
                Realizar Pedido
              </button>
            </Link>

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
        <NewNavBar active_nav='PROVEEDOR'>
          <div className='nav-wrapper'>
            <a href='#!' className='brand-logo'>
              Proveedor
            </a>
            <a href='#!' className='sidenav-trigger' data-target='nav_sidenav'>
              <i className='material-icons'>menu</i>
            </a>

            <ul className='right'>
              <li>
                <Link to={`/editar_proveedor/${this.props.match.params.id}`}>
                  <i className='material-icons cursor-pointer'>edit</i>
                </Link>
              </li>
            </ul>
          </div>
        </NewNavBar>
        <main className='center'>{providerContent}</main>

        <ConfirmationModal
          title='Eliminar proveedor'
          message='Esta seguro de que quiere eliminar este proveedor? No se podra revertir la operacion'
          onAccept={this.onConfirmDeleteProvider}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  providers: state.provider
});

export default connect(
  mapStateToProps,
  { getProvider, deleteProvider }
)(withRouter(Provider));
