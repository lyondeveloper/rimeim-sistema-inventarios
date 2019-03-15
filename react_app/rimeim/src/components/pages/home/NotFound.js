import React, { Component } from 'react'

import {
    configMaterialComponents,
    removeMaterialComponents
} from "../../../utils/MaterialFunctions"

class NotFound extends Component {

    componentWillMount() {
        removeMaterialComponents()
    }

    componentDidMount() {
        configMaterialComponents()
    }

    render() {
        return (
            <div className="container">
                Not Found
            </div>
        )
    }
}

export default NotFound