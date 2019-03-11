import React, { Component } from 'react'

import { SEARCH_QUOTATION } from "../../layout/NavTypes"
import Navbar from "../../layout/Navbar"

import {
    configMaterialComponents,
    removeMaterialComponents
} from "../../../utils/MaterialFunctions"

import "../../../public/css/cotizaciones.css"

class SearchQuotation extends Component {

    componentWillMount() {
        removeMaterialComponents()
    }

    componentDidMount() {
        configMaterialComponents()
    }

    render() {
        return (
            <React.Fragment >
                <Navbar navtype={SEARCH_QUOTATION} />
                <main>
                    <div className="row">
                        <div className="col s12">

                        </div>
                    </div>
                </main>
            </React.Fragment>
        )
    }
}


export default SearchQuotation