import React from "react";
import PropTypes from "prop-types";

import Spinner from "./Spinner";
import EmptyIcon from "./EmptyIcon";
import SellCard from "./SellCard";
import uuid from "uuid";

const ShowSells = props => {
  const { sells, loading, is_admin, es_cotizacion } = props;
  let sellsContent;

  if (loading) {
    sellsContent = <Spinner fullWidth />;
  } else if (sells.length > 0) {
    sellsContent = sells.map(sell => (
      <SellCard
        key={uuid()}
        sell={sell}
        is_admin={is_admin}
        es_cotizacion={es_cotizacion}
      />
    ));
  } else {
    sellsContent = <EmptyIcon message="No hay informacion para mostrar" />;
  }

  return sellsContent;
};

ShowSells.propTypes = {
  sells: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  is_admin: PropTypes.bool.isRequired,
  es_cotizacion: PropTypes.bool.isRequired
};

ShowSells.defaultProps = {
  is_admin: false,
  es_cotizacion: false
};

export default ShowSells;
