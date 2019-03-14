import React from 'react'
import { Link } from 'react-router-dom'

export default function ProviderCard(props) {
    const { proveedor: { id, img, codigo, nombre, rtn } } = props
    return (
        <div className="card hoverable">
            <Link to={`/proveedores/${id}`}>
                <div className="card-image border-bottom card-product" >
                    <img src={img} alt="" />
                </div>
                <div className="card-content">
                    <span className="d-block">
                        ID: <span>{codigo}</span>
                    </span>
                    <span className="d-block">
                        Nombre: <span>{nombre}</span>
                    </span>
                    <span className="d-block">
                        RTN: <span>{rtn}</span>
                    </span>
                </div>
            </Link>
        </div>
    )
}
