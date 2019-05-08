import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import uuid from "uuid";

import isEmpty from "../../actions/isEmpty";
import { getNumberFormatted } from "../../utils/stringUtils";
import EmptyIcon from "./EmptyIcon";
import { getCurrentDateToInput } from "../../utils/dateFormat";
import Spinner from "./Spinner";

class ShowSellReports extends Component {
  getFooter = () => {
    return <span className="d-block">Fecha: {getCurrentDateToInput()}</span>;
  };

  getTotalSellHeader = report => {
    let total = 0;
    report.data.forEach(venta => (total += parseFloat(venta.total)));
    return (
      <div className="card">
        <div className="card-content">
          {report.local && (
            <h6>Local: {`${report.local.codigo} - ${report.local.nombre}`}</h6>
          )}
          <h6>
            Desde: {report.fecha_inicio} - Hasta: {report.fecha_final}
          </h6>
          <h6>Total vendido: Lps {getNumberFormatted(total)}</h6>
        </div>
      </div>
    );
  };
  getTotalSellsReport = report => {
    return (
      <React.Fragment>
        {this.getTotalSellHeader(report)}
        <div className="card">
          <div className="card-content">
            <table>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Local</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {report.data.map(venta => (
                  <tr key={uuid()}>
                    <td>{venta.fecha_creado}</td>
                    <td>{venta.local}</td>
                    <td>{venta.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {this.getFooter()}
      </React.Fragment>
    );
  };

  getSellDetailsReport = report => {
    return (
      <React.Fragment>
        {this.getTotalSellHeader(report)}
        {report.data.map(venta => (
          <div className="card" key={uuid()}>
            <div className="card-content">
              <h6>Venta: {venta.id}</h6>
              {venta.local && <h6>Local: {venta.local.nombre}</h6>}
              {venta.codigo && <h6>Codigo: {venta.codigo}</h6>}
              <span className="d-block">Fecha: {venta.fecha_creado}</span>

              {venta.cliente && (
                <span className="d-block">Cliente: {venta.cliente}</span>
              )}

              <span className="d-block">
                Sub total: Lps {getNumberFormatted(venta.sub_total)}
              </span>
              <span className="d-block">
                Impuesto: Lps {getNumberFormatted(venta.impuesto)}
              </span>
              <span className="d-block">
                Total: Lps {getNumberFormatted(venta.total)}
              </span>
              <table>
                <thead>
                  <tr>
                    <th>Codigo</th>
                    <th>Descripcion</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {venta.productos.map(producto => (
                    <tr key={uuid()}>
                      <td>{producto.codigo_barra}</td>
                      <td>{producto.nombre}</td>
                      <td>{producto.cantidad}</td>
                      <td>{getNumberFormatted(producto.precio)}</td>
                      <td>{getNumberFormatted(producto.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
        {this.getFooter()}
      </React.Fragment>
    );
  };

  render() {
    const { report, loading } = this.props.sell;
    let reportContent;

    if (loading) {
      reportContent = <Spinner fullWidth />;
    } else if (!isEmpty(report)) {
      if (report.type === "ventas_totales") {
        reportContent = this.getTotalSellsReport(report);
      } else if (report.type === "ventas_detalle") {
        reportContent = this.getSellDetailsReport(report);
      }
    } else {
      reportContent = (
        <EmptyIcon message="No hay informacion para este reporte" />
      );
    }
    return <div id={this.props.id}>{reportContent}</div>;
  }
}

ShowSellReports.propTypes = {
  sell: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired
};

ShowSellReports.defaultProps = {
  id: "report_sell"
};

const mapStateToProps = state => ({
  sell: state.sell
});

export default connect(mapStateToProps)(ShowSellReports);
