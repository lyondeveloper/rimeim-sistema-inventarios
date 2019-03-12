import React, { Component } from 'react'

import { SEARCH_CLIENT } from "../../layout/NavTypes"
import Navbar from "../../layout/Navbar"

import {
    configMaterialComponents,
    removeMaterialComponents
} from "../../../utils/MaterialFunctions"

class SearchClient extends Component {

    componentWillMount() {
        removeMaterialComponents()
    }

    componentDidMount() {
        configMaterialComponents()
    }

    render() {
        return (
            <React.Fragment>
                <Navbar navtype={SEARCH_CLIENT} />

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

export default SearchClient