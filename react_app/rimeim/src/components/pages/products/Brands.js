import React, { Component } from 'react'

import { BRANDS } from "../../layout/NavTypes"
import Navbar from "../../layout/Navbar"

import {
    configMaterialComponents,
    removeMaterialComponents
} from "../../../utils/MaterialFunctions"

import BrandCard from "../../common/BrandCard"

class Brands extends Component {

    state = {
        marcas: []
    }

    componentWillMount() {
        removeMaterialComponents()
    }

    componentDidMount() {
        configMaterialComponents()
    }

    render() {
        const { marcas } = this.state
        return (
            <React.Fragment>
                <Navbar navtype={BRANDS} />

                <main>
                    <div className="row">
                        {marcas.map((item, i) => {
                            return (
                                <div className="col s12 m6 l4">
                                    <BrandCard marca={item} key={item.id} />
                                </div>
                            )
                        })}

                    </div>
                </main>
            </React.Fragment>
        )
    }
}

export default Brands