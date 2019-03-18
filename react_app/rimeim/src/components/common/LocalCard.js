import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'


const LocalCard = (props) => {
    const { local: { id, img, codigo, nombre, es_bodega, color_hex } } = props
    return (
        <div className="card hoverable">
            <Link to={`/locales/${id}`}>
                <div className="card-image border-bottom card-product">
                    <img src={img} alt="" />
                </div>
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
