import React, { Component } from 'react'

import { SELLS } from "../../layout/NavTypes"

// Custom components
import Navbar from "../../layout/Navbar"
import SellCard from "../../common/SellCard"

// Functions
import {
    configMaterialComponents,
    removeMaterialComponents
} from "../../../utils/MaterialFunctions"

class Sells extends Component {
    state = {
        ventas: [
            {
                id: 1,
                codigo: '#1212',
                fecha: 'ayer',
                con_factura: false,
                total: 2000,
                vendedor: {
                    id: 12,
                    nombre: 'Hernesto'
                }
            },
            {
                id: 2,
                codigo: '#86452',
                fecha: 'hoy',
                con_factura: true,
                total: 12000,
                vendedor: {
                    id: 14,
                    nombre: 'Manolino'
                }
            },
            {
                id: 3,
                codigo: '#09135',
                fecha: 'manana',
                con_factura: false,
                total: 7890,
                vendedor: {
                    id: 15,
                    nombre: 'Prancracio'
                }
            }
        ]
    }

    componentWillMount() {
        removeMaterialComponents()
    }

    componentDidMount() {
        configMaterialComponents()
    }

    render() {
        const { ventas } = this.state
        return (
            <React.Fragment>
                <Navbar navtype={SELLS} />
                <main>
                    <div className="row">
                        <div className="col s12">
                            {ventas.map((item, i) => {
                                return (
                                    <SellCard venta={item} key={item.id} />
                                )
                            })}
                        </div>
                    </div>
                </main>
            </React.Fragment>
        )
    }
}

Sells.propTypes = {

}

export default Sells