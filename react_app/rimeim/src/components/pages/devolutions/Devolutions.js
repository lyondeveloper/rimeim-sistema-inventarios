import React, { Component } from 'react'

import { DEVOLUTIONS } from "../../layout/NavTypes"
import Navbar from "../../layout/Navbar"

import {
    configMaterialComponents,
    removeMaterialComponents
} from "../../../utils/MaterialFunctions"

import DevolutionCard from "../../common/DevolutionCard"

class Devolutions extends Component {

    state = {
        devoluciones: [
            {
                id: 1,
                codigo: "#1256",
                fecha: "Hoy",
                cliente: {
                    nombre: "Marcos"
                },
                vendedor: {
                    id: 12,
                    nombre: "Magostino"
                },
                total: 1122
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
        const { devoluciones } = this.state
        return (
            <React.Fragment>
                <Navbar navtype={DEVOLUTIONS} />

                <main>
                    <div className="row">
                        <div className="col s12">
                            {devoluciones.map((devolucion, i) => {
                                return (
                                    <DevolutionCard devolucion={devolucion} key={devolucion.id} />
                                )
                            })}
                        </div>
                    </div>
                </main>
            </React.Fragment>
        )
    }
}

export default Devolutions