import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Navbar from "../../layout/Navbar"

import { NEW_SELL } from "../../layout/NavTypes"

// Custom components
import SellColumnsDetails from "../../common/SellColumnsDetails"

// Functions
// Functions
import {
    configMaterialComponents,
    removeMaterialComponents
} from "../../../utils/MaterialFunctions"

// Custom css
import "../../../public/css/ventas.css"

class NewSell extends Component {
    state = {
        errors: {},
        products: []
    }

    componentWillMount() {
        removeMaterialComponents()
    }

    componentDidMount() {
        configMaterialComponents()
    }

    render() {
        var subtotal, impuesto = 0
        return (
            <React.Fragment>
                <Navbar navtype={NEW_SELL} />

                <main>
                    <div className="row venta-productos">
                        <div className="col s12 no-padding">
                            <table className="table-bordered header-fixed striped highlight">
                                <thead>
                                    <tr>
                                        <th className="center">Codigo</th>
                                        <th className="center">Descripcion</th>
                                        <th className="center">Cantidad</th>
                                        <th className="center">Precio</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="row col-bordered venta-total">
                        <SellColumnsDetails title="Sub total" value={subtotal} />
                        <SellColumnsDetails title="Impuesto" value={impuesto} />
                        <SellColumnsDetails title="Total" value={0} />
                    </div>
                </main>
            </React.Fragment>
        )
    }
}

NewSell.propTypes = {
    errors: PropTypes.object.isRequired,
    products: PropTypes.array.isRequired
}

NewSell.defaultProps = {
    products: []
}

const mapStateToProps = (state) => ({
    errors: state.errors
})

export default connect(mapStateToProps, {})(NewSell)
