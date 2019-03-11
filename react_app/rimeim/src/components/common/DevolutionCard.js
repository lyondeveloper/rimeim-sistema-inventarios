import React from 'react'
import { Link } from "react-router-dom"

export default function DevolutionCard(props) {
    const { devolucion:
        { id, codigo, fecha, cliente, vendedor, total }
    } = props
    return (
        <div className="card">
            <Link to={`/devoluciones/${id}`}>
                <div className="card-content">
                    <div className="d-block">
                        <span>
                            Factura: <span>{codigo}</span>
                        </span>
                        <span className="right">
                            {fecha}
                        </span>
                    </div>
                    <div className="d-block">
                        <span>
                            Cliente: <span>{cliente.nombre}</span>
                        </span>
                    </div>
                    <div className="d-block">
                        <span>
                            Vendedor: <span>{`${vendedor.id} - ${vendedor.nombre}`}</span>
                        </span>
                        <span className="right">
                            Total: Lps {total}
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    )
}
