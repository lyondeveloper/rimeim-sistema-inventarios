import React, { Component } from 'react'

import {
    configMaterialComponents,
    removeMaterialComponents
} from "../../../utils/MaterialFunctions"

class Home extends Component {

    componentWillMount() {
        removeMaterialComponents()
    }

    componentDidMount() {
        configMaterialComponents()
    }

    render() {
        return (
            <div className="container">
                Rimeim
            </div>
        )
    }
}

export default Home