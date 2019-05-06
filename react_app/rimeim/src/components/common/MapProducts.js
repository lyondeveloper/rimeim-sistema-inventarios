import React from "react";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import ProductCard from "./ProductCard";
import EmptyIcon from "./EmptyIcon";

const MapProducts = props => {
  const { loading, products, admin } = props;
  let productsContent;

  if (loading) {
    productsContent = <Spinner fullWidth />;
  } else if (products.length > 0) {
    productsContent = products.map(product => (
      <div className="col s12 m6 l4" key={`prod${product.id}`}>
        <ProductCard product={product} key={product.id} admin={admin} />
      </div>
    ));
  } else {
    productsContent = <EmptyIcon message="No hay informacion para mostrar" />;
  }
  return <div className="row">{productsContent}</div>;
};

MapProducts.propTypes = {
  loading: PropTypes.bool.isRequired,
  products: PropTypes.array.isRequired,
  admin: PropTypes.bool.isRequired
};

MapProducts.defaultProps = {
  admin: false
};

export default MapProducts;
