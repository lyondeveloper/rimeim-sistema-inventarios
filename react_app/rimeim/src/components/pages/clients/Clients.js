import React, { Component } from 'react'

import { CLIENTS } from "../../layout/NavTypes"
import Navbar from "../../layout/Navbar"

import {
    configMaterialComponents,
    removeMaterialComponents
} from "../../../utils/MaterialFunctions"

import ClientCard from "../../common/ClientCard"

class Clients extends Component {

    state = {
        clientes: []
    }

    componentWillMount() {
        removeMaterialComponents()
    }

    componentDidMount() {
        configMaterialComponents()
    }

    render() {
        const { clientes } = this.state
        return (
            <React.Fragment>
                <Navbar navtype={CLIENTS} />

                <main>
                    <div className="row">
                        {clientes.map((cliente, i) => {
                            return (
                                <div className="col s12 m6 l4">
                                    <ClientCard cliente={cliente} key={cliente.id} />
                                </div>
                            )
                        })}

                    </div>
                </main>
            </React.Fragment>
        )
    }
}

export default Clients