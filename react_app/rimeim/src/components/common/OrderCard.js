import React from 'react'
import { Link } from 'react-router-dom'

export default function OrderCard(props) {
    const { pedido: {
        id,
        codigo,
        fecha,
        productos,
        creador,
        ubicacion
    } } = props
    return (
        <div className="card">
            <Link to={`/pedidos/${id}`}>
                <div className="card-content">
                    <div className="d-block">
                        <span>
                            Pedido: <span>{codigo}</span>
                        </span>

                        <span className="right">
                            {fecha}
                        </span>
                    </div>
                    <div className="d-block">
                        Productos: <span>{productos}</span>
                    </div>
                    <div className="d-block">
                        Creado por: <span>{creador}</span>
                    </div>
                    <div className="d-block">
                        Pedido desde: <span>{ubicacion}</span>
                    </div>
                </div>
            </Link>
        </div>
    )
}
