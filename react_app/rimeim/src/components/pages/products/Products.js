import React, { Component } from 'react'
import { connect } from "react-redux"
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"

import NewNavbar from "../../layout/NewNavbar"

import {
    configMaterialComponents,
    removeMaterialComponents
} from "../../../utils/MaterialFunctions"

import {
    getProducts,
    searchProduct
} from "../../../actions/productActions"

import MapProducts from "../../common/MapProducts"
import SearchModal from "../../layout/modals/SearchModal"

class Products extends Component {

    componentWillMount() {
        removeMaterialComponents()
    }

    componentDidMount() {
        configMaterialComponents()
        const id_local = this.props.user.currentLocal.id
            ? this.props.user.currentLocal.id
            : 0;
        this.props.getProducts(id_local);
    }

    onSearchProduct = (termino_busqueda) => {
        const id_local = this.props.user.currentLocal.id
            ? this.props.user.currentLocal.id
            : 0;
        const searchProductData = {
            field: termino_busqueda,
            id_local
        }
        this.props.searchProduct(searchProductData)
    }

    render() {
        const { loading, products } = this.props.product
        return (
            <React.Fragment>
                <NewNavbar active_nav="PRODUCTOS" show_more_option={true}>
                    <ul id="dropdown_more" className="dropdown-content">
                        <li>
                            <Link to="/nuevo_producto">
                                <i className="material-icons">add</i>
                            </Link>
                        </li>
                        <li>
                            <a href="#modal_search" className="modal-trigger">
                                <i className="material-icons">search</i>
                            </a>
                        </li>
                    </ul>

                    <div className="nav-wrapper">
                        <a href="#!" className="brand-logo">
                            Inventario
                                    </a>
                        <a href="#!" className="sidenav-trigger" data-target="nav_sidenav">
                            <i className="material-icons">menu</i>
                        </a>
                        <ul className="right hide-on-small-only">
                            <li>
                                <Link to="/nuevo_producto">
                                    <i className="material-icons">add</i>
                                </Link>
                            </li>

                            <li>
                                <a href="#modal_search" className="modal-trigger">
                                    <i className="material-icons">search</i>
                                </a>
                            </li>
                        </ul>
                    </div>

                </NewNavbar>

                <main>
                    <MapProducts loading={loading} products={products} />
                </main >

                <SearchModal onSearchAction={this.onSearchProduct} />
            </React.Fragment >
        )
    }
}

Products.propTypes = {
    getProducts: PropTypes.func.isRequired,
    searchProduct: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    product: state.product,
    user: state.user
})

export default connect(mapStateToProps, { getProducts, searchProduct })(Products)