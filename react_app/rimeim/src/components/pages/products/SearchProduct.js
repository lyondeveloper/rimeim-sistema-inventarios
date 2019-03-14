import React, { Component } from 'react'

import { SEARCH_PRODUCT } from "../../layout/NavTypes"
import Navbar from "../../layout/Navbar"

import {
    configMaterialComponents,
    removeMaterialComponents
} from "../../../utils/MaterialFunctions"

import SearchProductModel from "../../layout/modals/SearchProductModel"

class SearchProduct extends Component {

    state = {
        productos: [],
        termino: "",
        marca: "",
        tipo_vehiculo: "",
        ubicacion: ""
    }

    componentWillMount() {
        removeMaterialComponents()
    }

    componentDidMount() {
        configMaterialComponents()
    }

    onChangeTextInput = e => this.setState({ [e.target.name]: e.target.value });

    onSearch = () => {

    }

    render() {
        const { termino, marca, tipo_vehiculo, ubicacion } = this.state
        return (
            <React.Fragment>
                <Navbar navtype={SEARCH_PRODUCT} />

                <main>
                    <div className="row">
                        <div className="col s12">

                        </div>
                    </div>
                </main>

                <SearchProductModel values={{ termino, marca, tipo_vehiculo, ubicacion }}
                    onchange={this.onChangeTextInput}
                    onsearch={this.onSearch} />
            </React.Fragment>
        )
    }
}

export default SearchProduct