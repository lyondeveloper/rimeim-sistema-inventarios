import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import { deleteClient } from '../../actions/clientActions';

import LogoRimeim from '../../public/img/logo_rimeim.png';

class ClientCard extends Component {
    onDeleteClientClick = e => {
        e.preventDefault();
        this.props.deleteClient(this.props.client.id);
    };

    render() {
        const {
            client: {
                id,
                img,
                codigo,
                nombre,
                rtn,
                es_empresa,
                correo,
                telefono
            }
        } = this.props;

        return (
            <div className='card hoverable'>
                <div className='card-content'>
                    <Link to={`/clientes/${id}`}>
                        <div className='card-image border-bottom card-product'>
                            <img src={LogoRimeim} alt='' />
                        </div>
                        <span className='d-block'>
                            Codigo: <span>{codigo}</span>
                        </span>
                        <span className='d-block'>
                            Nombre: <span>{nombre}</span>
                        </span>
                        <span className='d-block'>
                            RTN: <span>{rtn}</span>
                        </span>
                        <span className='d-block'>
                            Correo: <span>{correo}</span>
                        </span>
                        <span className='d-block'>
                            Telefono: <span>{telefono}</span>
                        </span>
                        <span className='d-block'>
                            Es empresa: <span>{es_empresa ? 'si' : 'no'}</span>
                        </span>
                    </Link>
                    <div className='d-block mt-1'>
                        <button className='btn light-blue darken-3'>
                            <Link
                                className='text-white'
                                to={`editar_cliente/${id}`}
                            >
                                Editar
                            </Link>
                        </button>
                    </div>
                    <div className='d-block mt-1'>
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

export default connect(
    null,
    { deleteClient }
)(withRouter(ClientCard));
