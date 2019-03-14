import React, { Component } from 'react'

import Navbar from "../../layout/Navbar"
import { SEARCH_SELL } from "../../layout/NavTypes"

// Functions
import {
    configMaterialComponents,
    removeMaterialComponents
} from "../../../utils/MaterialFunctions"

import { getCurrentDateToInput } from "../../../utils/dateFormat"
import SearchSellModel from "../../layout/modals/SearchSellModel"

class SearchSell extends Component {

    state = {
        ventas: [],
        cliente: "",
        vendedor: "",
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
        const { cliente, vendedor, fecha_inicio, fecha_fin } = this.state
        return (
            <React.Fragment >
                <Navbar navtype={SEARCH_SELL} />

                <main>
                    <div className="row">
                        <div className="col s12">

                        </div>
                    </div>
                </main>

                <SearchSellModel onchange={this.onChangeTextInput}
                    values={{ cliente, vendedor, fecha_inicio, fecha_fin }}
                    onsearch={this.onSearch} />
            </React.Fragment>
        )
    }
}

export default SearchSell