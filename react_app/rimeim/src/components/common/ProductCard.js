import React from 'react'
import PropTypes from "prop-types"

import { Link } from "react-router-dom"

const ProductCard = (props) => {
    const { venta: {
        id,
        codigo,
        fecha,
        con_factura,
        total,
        vendedor
    } } = props
    return (
        <div className="card">
            <Link to={`/ventas/${id}`}>
                <div className="card-content">
                    <div className="d-block">
                        <span>Venta: {codigo}</span>
                        <span className="right">{fecha}</span>
                    </div>
                    <div className="d-block">
                        <span>Vendedor: {vendedor.id} - <span> {vendedor.nombre}</span></span>
                    </div>
                    <div className="d-block">
                        <span>{con_factura ? ('C/F') : ('S/F')}</span>
                        <span className="right">Total: Lps {total}</span>
                    </div>
                </div>
            </Link>
        </div>
    )
}

ProductCard.propTypes = {
    venta: PropTypes.object.isRequired
}

export default ProductCard