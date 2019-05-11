import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import uuid from "uuid";

import Spinner from "./Spinner";
import EmptyIcon from "./EmptyIcon";
import isEmpty from "../../actions/isEmpty";

class ShowProductReports extends Component {
  getPageContent = () => {
    const { loading, product } = this.props.product;
    if (loading) {
      return <Spinner fullWidth />;
    } else if (!isEmpty(product)) {
      return (
        <React.Fragment>
          {this.getReportHeader(product)}
          {this.getProductsReport(product.productos)}
        </React.Fragment>
      );
    } else {
      return <EmptyIcon message="No hay reportes disponibles" />;
    }
  };

  getReportHeader = report => {
    return (
      <div className="card">
        <div className="card-content">
          <h6>Reporte de productos</h6>
          <span className="d-block">Tipo: {report.tipo_reporte}</span>
          {report.local && (
            <span className="d-block">Local: {report.local.nombre}</span>
          )}
          <span className="d-block">
            Desde: {report.fecha_inicio} - Hasta: {report.fecha_final}
          </span>
        </div>
      </div>
    );
  };

  getProductsReport = products => {
    return (
      <div className="card">
        <div className="card-content">
          <table className="striped">
            <thead>
              <tr>
                <th>Codigo</th>
                <th>Descripcion</th>
                <th>Cantidad vendida</th>
              </tr>
            </thead>
            <tbody>
              {products.map(prod => (
                <tr key={uuid()}>
                  <td>{prod.codigo_barra}</td>
                  <td>{prod.nombre}</td>
                  <td>{prod.cantidad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div id={this.props.id}>
        <div className="col s12">{this.getPageContent()}</div>
      </div>
    );
  }
}

ShowProductReports.propTypes = {
  id: PropTypes.string.isRequired
};

ShowProductReports.defaultProps = {
  id: "report_products"
};

const mapStateToProps = state => ({
  product: state.product
});

export default connect(mapStateToProps)(ShowProductReports);
