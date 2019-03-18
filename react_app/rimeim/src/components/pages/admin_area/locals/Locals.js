import React, { Component } from 'react'

import { ADMIN_LOCALS } from "../../../layout/NavTypes"
import NavbarAdmin from "../../../layout/NavbarAdmin"

import {
    configMaterialComponents,
    removeMaterialComponents
} from "../../../../utils/MaterialFunctions"

import LocalCard from "../../../common/LocalCard"

class Locals extends Component {

    state = {
        locals: []
    }

    componentWillMount() {
        removeMaterialComponents()
    }

    componentDidMount() {
        configMaterialComponents()
    }

    render() {
        const { locals } = this.state
        return (
            <React.Fragment>
                <NavbarAdmin navtype={ADMIN_LOCALS} />

                <main>
                    <div className="row">
                        {locals.map((local, i) => {
                            return (
                                <div className="col s12 m6 l4" key={local.id}>
                                    <LocalCard local={local} />
                                </div>
                            )
                        })}
                    </div>
                </main>
            </React.Fragment>
        )
    }
}

export default Locals