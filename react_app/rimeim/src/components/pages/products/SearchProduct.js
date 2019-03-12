import React, { Component } from 'react'

import { SEARCH_PRODUCT } from "../../layout/NavTypes"
import Navbar from "../../layout/Navbar"

import {
    configMaterialComponents,
    removeMaterialComponents
} from "../../../utils/MaterialFunctions"

class SearchProduct extends Component {

    componentWillMount() {
        removeMaterialComponents()
    }

    componentDidMount() {
        configMaterialComponents()
    }

    render() {
        return (
            <React.Fragment>
                <Navbar navtype={SEARCH_PRODUCT} />

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

export default SearchProduct