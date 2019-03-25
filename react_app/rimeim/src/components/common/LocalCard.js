import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'


const LocalCard = (props) => {
    const { local: { id, codigo, nombre, es_bodega, color_hex } } = props
    return (
        <div className="card hoverable">
            <Link to={`/admin/locales/${id}`}>
                <div className="card-content">
                    <span className="d-block">
                        <div className="circle-local left" style={{ backgroundColor: color_hex }}></div>
                        <span className="ml-1">
                            {codigo} | {nombre}
                        </span>
                    </span>

                    {es_bodega && (
                        <span className="d-block">
                            Bodega
                        </span>
                    )}

                </div>
            </Link>
        </div>
    )
}

LocalCard.propTypes = {
    local: PropTypes.object.isRequired
}

export default LocalCard
