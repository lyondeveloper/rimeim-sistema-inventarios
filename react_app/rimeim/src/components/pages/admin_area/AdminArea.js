import React, { Component } from 'react'

import { ADMIN_DEFAULT } from "../../layout/NavTypes"
import NavbarAdmin from "../../layout/NavbarAdmin"

import {
    configMaterialComponents,
    removeMaterialComponents
} from "../../../utils/MaterialFunctions"

class AdminArea extends Component {

    componentWillMount() {
        removeMaterialComponents()
    }

    componentDidMount() {
        configMaterialComponents()
    }

    render() {
        return (
            <React.Fragment>
                <NavbarAdmin navtype={ADMIN_DEFAULT} />
                <main>
                    <div className="container">
                        <div className="row">
                            <div className="col s12">
                                <h4>Admin Area</h4>
                            </div>
                        </div>
                    </div>
                </main>
            </React.Fragment>
        )
    }
}

export default AdminArea