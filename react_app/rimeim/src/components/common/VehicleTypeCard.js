import React from 'react'
import { Link } from 'react-router-dom'

export default function VehicleTypeCard(props) {
    const { vehiculo: { id, img, nombre, descripcion } } = props
    return (
        <div class="card hoverable">
            <Link to={`/vehiculos/${id}`}>
                <div class="card-image border-bottom card-product">
                    <img src={img} alt="" />
                </div>
                <div class="card-content">
                    <span class="d-block">{nombre}</span>
                    <span class="d-block">
                        {descripcion}
                    </span>
                </div>
            </Link>
        </div>
    )
}
