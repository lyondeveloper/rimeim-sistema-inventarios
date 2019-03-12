import React, { Component } from 'react'

import { SEARCH_ORDER } from "../../layout/NavTypes"
import Navbar from "../../layout/Navbar"

import {
    configMaterialComponents,
    removeMaterialComponents
} from "../../../utils/MaterialFunctions"

class SearchOrder extends Component {

    componentWillMount() {
        removeMaterialComponents()
    }

    componentDidMount() {
        configMaterialComponents()
    }

    render() {
        return (
            <React.Fragment>
                <Navbar navtype={SEARCH_ORDER} />

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

export default SearchOrder