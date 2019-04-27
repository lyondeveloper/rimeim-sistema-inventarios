import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import { deleteProvider } from '../../actions/providerActions';

import LogoRimeim from '../../public/img/logo_rimeim.png';

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
      provider: { id, imagen, nombre }
    } = this.props;

    const { loading } = this.props.providers;

    if (loading) return <Spinner fullWidth />;

    return (
      <div className='card hoverable medium'>
        <div className='card-image waves-effect waves-block waves-light'>
          <img src={imagen ? imagen.url : ''} alt={'Logo'} />
        </div>
        <div className='card-content center p-1'>
          <span className='card-title grey-text text-darken-4'>{nombre}</span>
          <button className='btn blue white-text mt-1'>
            <Link className='text-white' to={`/editar_proveedor/${id}`}>
              Editar
            </Link>
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
