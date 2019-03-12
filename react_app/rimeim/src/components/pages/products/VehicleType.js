import React, { Component } from 'react'

import { VEHICLE_TYPE } from "../../layout/NavTypes"
import Navbar from "../../layout/Navbar"

import {
    configMaterialComponents,
    removeMaterialComponents
} from "../../../utils/MaterialFunctions"

import VehicleTypeCard from "../../common/VehicleTypeCard"

class VehicleType extends Component {

    state = {
        vehiculos: []
    }

    componentWillMount() {
        removeMaterialComponents()
    }

    componentDidMount() {
        configMaterialComponents()
    }

    render() {
        const { vehiculos } = this.state
        return (
            <React.Fragment>
                <Navbar navtype={VEHICLE_TYPE} />

                <main>
                    <div className="row">
                        {vehiculos.map((vehiculo, i) => {
                            return (
                                <div className="col s12 m6 l4">
                                    <VehicleTypeCard vehiculo={vehiculo} key={vehiculo.id} />
                                </div>
                            )
                        })}
                    </div>
                </main>
            </React.Fragment>
        )
    }
}

export default VehicleType