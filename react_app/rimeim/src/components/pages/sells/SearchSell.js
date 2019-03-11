import React, { Component } from 'react'

import Navbar from "../../layout/Navbar"
import { SEARCH_SELL } from "../../layout/NavTypes"

// Functions
// Functions
import {
    configMaterialComponents,
    removeMaterialComponents
} from "../../../utils/MaterialFunctions"

class SearchSell extends Component {

    componentWillMount() {
        removeMaterialComponents()
    }

    componentDidMount() {
        configMaterialComponents()
    }

    render() {
        return (
            <React.Fragment >
                <Navbar navtype={SEARCH_SELL} />

                <div className="row">
                    <div className="col s12">

                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default SearchSell