import React from 'react'
import { Link } from "react-router-dom"

export default function ProductCard(props) {
    const { product: {
        id, img, codigo, nombre, precio, inventario
    } } = props
    return (
        <div className="card hoverable">
            <Link to={`/productos/${id}`}>
                <div className="card-image border-bottom card-product">
                    <img src={img} alt="" />
                </div>
                <div className="card-content">
                    <span className="d-block">{codigo}</span>
                    <span className="d-block">{nombre}</span>
                    <span className="d-block">
                        Precio: Lps <span>{precio}</span>
                    </span>
                    <span className="d-block">
                        En Inventario: {inventario}
                    </span>
                </div>
            </Link>
        </div>
    )
}
