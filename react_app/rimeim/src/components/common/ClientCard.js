import React from 'react';
import { Link } from 'react-router-dom';

export default function ClientCard(props) {
    const {
        client: { id, img, codigo, nombre, rtn, es_empresa }
    } = props;
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
                        Es empresa: <span>{es_empresa ? 'si' : 'no'}</span>
                    </span>
                </div>
            </Link>
        </div>
    );
}
