import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import { deleteProvider } from '../../actions/providerActions';

import LogoRimeim from '../../public/img/logo_rimeim.png';

import TextInputField from './TextInputField';

import Spinner from './Spinner';

class ProviderCard extends Component {
  onDeleteClientClick = e => {
    e.preventDefault();
    if (
      window.confirm('Estas seguro de esto? Esta acción NO se puede revertir.')
    )
      this.props.deleteProvider(this.props.provider.id);
  };

  render() {
    const {
      provider: { id, img, codigo, nombre, rtn }
    } = this.props;

    const { loading } = this.props.providers;

    if (loading) return <Spinner fullWidth />;

    return (
      <div className='card hoverable medium'>
        <div className='card-image waves-effect waves-block waves-light'>
          <img className='activator' src={LogoRimeim} />
        </div>
        <div className='card-content center p-1'>
          <span className='card-title grey-text text-darken-4'>{nombre}</span>
          <button className='btn blue white-text activator mt-1'>
            Mostrar Más
          </button>
          <div className='d-block mt-1 center'>
            <button
              className='btn red darken-1'
              onClick={this.onDeleteClientClick}
            >
              Borrar
            </button>
          </div>
        </div>
        <div className='card-reveal'>
          <span className='card-title'>
            <i className='material-icons right'>close</i>
            <span className='grey-text text-darken-4 center'>
              About {nombre}
            </span>
          </span>
          <div className='row mt-1'>
            <TextInputField
              id='nombre'
              label='Nombre'
              onchange={this.onChangeTextInput}
              value={nombre}
              disabled={true}
              active_label={true}
            />
          </div>
          <div className='row'>
            <TextInputField
              id='rtn'
              label='RTN'
              onchange={this.onChangeTextInput}
              value={rtn}
              disabled={true}
              active_label={true}
            />
          </div>

          <div className='row'>
            <TextInputField
              id='codigo'
              label='Codigo'
              onchange={this.onChangeTextInput}
              value={codigo}
              disabled={true}
              active_label={true}
            />
          </div>

          <div className='d-block center'>
            <button className='btn light-blue darken-3'>
              <Link className='text-white' to={`/editar_proveedor/${id}`}>
                Editar
              </Link>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  providers: state.provider
});

export default connect(
  mapStateToProps,
  { deleteProvider }
)(withRouter(ProviderCard));
