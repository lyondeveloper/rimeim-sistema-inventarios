import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ClientCard extends Component {
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
                <Link to={`/clientes/${id}`}>
                    <div className='card-image border-bottom card-product'>
                        <img src={img} alt='' />
                    </div>
                    <div className='card-content'>
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
                    </div>
                </Link>
                <div className='d-block mt-1'>
                    <button className='btn yellow'>
                        <Link to={`editar_cliente/${id}`}>Editar</Link>
                    </button>
                </div>
                <div className='d-block mt-1'>
                    <button className='btn red darken-1'>Borrar</button>
                </div>
            </div>
        );
    }
}

export default ClientCard;
