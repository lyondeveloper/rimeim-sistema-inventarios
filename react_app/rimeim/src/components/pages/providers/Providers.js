import React, { Component } from 'react'

import { PROVIDERS } from "../../layout/NavTypes"
import Navbar from "../../layout/Navbar"

import {
    configMaterialComponents,
    removeMaterialComponents
} from "../../../utils/MaterialFunctions"

import ProviderCard from "../../common/ProviderCard"

class Providers extends Component {

    state = {
        proveedores: []
    }

    componentWillMount() {
        removeMaterialComponents()
    }

    componentDidMount() {
        configMaterialComponents()
    }

    render() {
        const { proveedores } = this.state
        return (
            <React.Fragment>
                <Navbar navtype={PROVIDERS} />

                <main>
                    <div className="row">
                        {proveedores.map((proveedor, i) => {
                            return (
                                <div className="col s12 m6 l4" key={proveedor.id}>
                                    <ProviderCard proveedor={proveedor} />
                                </div>
                            )
                        })}
                    </div>
                </main>
            </React.Fragment>
        )
    }
}

export default Providers