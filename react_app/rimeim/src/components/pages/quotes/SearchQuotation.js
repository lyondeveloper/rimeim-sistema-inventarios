import React, { Component } from 'react'

import { SEARCH_QUOTATION } from "../../layout/NavTypes"
import Navbar from "../../layout/Navbar"

import {
    configMaterialComponents,
    removeMaterialComponents
} from "../../../utils/MaterialFunctions"

import "../../../public/css/cotizaciones.css"
import SearchQuotationModel from "../../layout/modals/SearchQuotationModel"
import { getCurrentDateToInput } from "../../../utils/dateFormat"

class SearchQuotation extends Component {

    state = {
        cotizaciones: [],
        cliente: "",
        rtn: "",
        productos: []
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
        const { cliente, rtn, productos } = this.state
        return (
            <React.Fragment >
                <Navbar navtype={SEARCH_QUOTATION} />
                <main>
                    <div className="row">
                        <div className="col s12">

                        </div>
                    </div>
                </main>

                <SearchQuotationModel
                    values={{ cliente, rtn, productos }}
                    onsearch={this.onSearch}
                    onchange={this.onChangeTextInput} />
            </React.Fragment>
        )
    }
}


export default SearchQuotation