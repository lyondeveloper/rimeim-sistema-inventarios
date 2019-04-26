import React from 'react'
import Spinner from "./Spinner"
import PropTypes from 'prop-types'
import ProductCard from "./ProductCard"

const MapProducts = (props) => {
    const { loading, products, admin } = props
    return (
        <div className="row">
            {loading ? (
                <Spinner fullWidth />
            ) : (
                    products.map(product => (
                        <div className="col s12 m6 l4" key={`prod${product.id}`}>
                            <ProductCard
                                product={product}
                                key={product.id}
                                admin={admin}
                            />
                        </div>
                    ))
                )}
        </div>
    )
}

MapProducts.propTypes = {
    loading: PropTypes.bool.isRequired,
    products: PropTypes.array.isRequired,
    admin: PropTypes.bool.isRequired
}

MapProducts.defaultProps = {
    admin: false
}

export default MapProducts