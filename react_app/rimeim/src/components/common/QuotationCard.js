import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const QuotationCard = (props) => {
    const {
        cotizacion: {
            id,
            codigo,
            fecha,
            total,
            cliente
        }
    } = props
    return (
        <div className="card">
            <Link to={`/cotizaciones/${id}`}>
                <div className="card-content">
                    <div className="d-block">
                        <span>
                            Cotizacion: <span>{codigo}</span>
                        </span>
                        <span className="right">
                            {fecha}
                        </span>
                    </div>
                    <div className="d-block">
                        <span>
                            Cliente: <span>{cliente.nombre}</span>
                        </span>
                        <span className="right">
                            Total:
                            <span>{total}</span>
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    )
}

QuotationCard.propTypes = {
    cotizacion: PropTypes.object.isRequired
}

export default QuotationCard