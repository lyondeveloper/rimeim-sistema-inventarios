import React, { Component } from 'react'

import { SEARCH_ORDER } from "../../layout/NavTypes"
import Navbar from "../../layout/Navbar"

import {
    configMaterialComponents,
    removeMaterialComponents
} from "../../../utils/MaterialFunctions"

import SearchOrderModel from "../../layout/modals/SearchOrderModel"
import { getCurrentDateToInput } from "../../../utils/dateFormat"

class SearchOrder extends Component {

    state = {
        pedidos: [],
        codigo: "",
        proveedor: "",
        local: "",
        fecha_inicio: "",
        fecha_fin: ""
    }

    componentWillMount() {
        removeMaterialComponents()
    }

    componentDidMount() {
        configMaterialComponents()
        const current_date = getCurrentDateToInput()
        this.setState({
            fecha_inicio: current_date,
            fecha_fin: current_date
        })
    }

    onChangeTextInput = e => this.setState({ [e.target.name]: e.target.value });

    onSearch = () => {

    }

    render() {
        const { codigo, proveedor, local, fecha_inicio, fecha_fin } = this.state
        return (
            <React.Fragment>
                <Navbar navtype={SEARCH_ORDER} />

                <main>
                    <div className="row">
                        <div className="col s12">

                        </div>
                    </div>
                </main>

                <SearchOrderModel values={{ codigo, proveedor, local, fecha_inicio, fecha_fin }}
                    onchange={this.onChangeTextInput}
                    onsearch={this.onSearch} />
            </React.Fragment>
        )
    }
}

export default SearchOrder