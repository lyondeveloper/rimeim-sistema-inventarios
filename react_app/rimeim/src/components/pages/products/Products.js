import React, { Component } from 'react'

import { PRODUCTS } from "../../layout/NavTypes"
import Navbar from "../../layout/Navbar"

import {
    configMaterialComponents,
    removeMaterialComponents
} from "../../../utils/MaterialFunctions"

import ProductCard from "../../common/ProductCard"

class Products extends Component {

    state = {
        productos: []
    }

    componentWillMount() {
        removeMaterialComponents()
    }

    componentDidMount() {
        configMaterialComponents()
    }

    render() {
        const { productos } = this.state
        return (
            <React.Fragment>
                <Navbar navtype={PRODUCTS} />

                <main>
                    <div className="row">
                        {productos.map((product, i) => {
                            return (
                                <div className="col s12 m6 l4">
                                    <ProductCard producto={product} key={product.id} />
                                </div>
                            )
                        })}
                    </div>
                </main >
            </React.Fragment >
        )
    }
}

export default Products