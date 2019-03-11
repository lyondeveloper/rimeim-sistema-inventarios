import React, { Component } from 'react'

import { SEARCH_DEVOLUTION } from "../../layout/NavTypes"
import Navbar from "../../layout/Navbar"

import {
    configMaterialComponents,
    removeMaterialComponents
} from "../../../utils/MaterialFunctions"

class SearchDevolution extends Component {

    componentWillMount() {
        removeMaterialComponents()
    }

    componentDidMount() {
        configMaterialComponents()
    }

    render() {
        return (
            <React.Fragment>
                <Navbar navtype={SEARCH_DEVOLUTION} />

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

export default SearchDevolution