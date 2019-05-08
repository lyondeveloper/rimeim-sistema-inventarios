import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

import { getModalInstanceById } from '../../../utils/MaterialFunctions';
import { getNumberFormatted } from '../../../utils/stringUtils';
import { printQuotation } from '../../../utils/printPdf';
import { getCurrentDateToInput } from '../../../utils/dateFormat';

class PrintQuotation extends Component {
  state = {
    url_logo: 'https://rimeim.com/files/icons/logo_rimeim.png',
    empresa_rtn: '',
    empresa_nombre:
      'Representaciones Industriales, Mantenimiento, Exportaciones, Importaciones, Maquinaria',
    empresa_ubicacion: '',
    empresa_de: 'Marco Antonio Martinez Zuniga',
    empresa_telefono: '192812912',
    empresa_email: 'ventas@rimeim.com'
  };
  hideModal = () => {
    getModalInstanceById('modal_imprimir_cotizacion').close();
  };

  onCancelPrint = () => {
    this.hideModal();
    this.props.onCancel();
  };

  onPrintClick = () => {
    printQuotation('div_print_cotizacion', 'rimeim_cotizacion', () => {
      this.onCancelPrint();
    });
  };

  getQuoteData = () => {
    const {
      cotizacion: { cliente, productos, values, local }
    } = this.props;
    let clientContent, productsContent, localContent;

    if (cliente) {
      clientContent = (
        <div className="row">
          <div className="col s12">
            <h6>Cotizado a:</h6>
            <span className="d-block">{cliente.nombre}</span>
            <span className="d-block">RTN: {cliente.rtn}</span>
          </div>
        </div>
      );
    }
    if (productos.productos) {
      productsContent = productos.productos.map(producto => (
        <tr key={uuid()}>
          <td>{producto.nombre}</td>
          <td>{producto.cantidad}</td>
          <td>{getNumberFormatted(producto.precio)}</td>
          <td>{getNumberFormatted(producto.cantidad * producto.precio)}</td>
        </tr>
      ));
    }
    if (local) {
      const {
        url_logo,
        empresa_nombre,
        empresa_de,
        empresa_ubicacion,
        empresa_telefono,
        empresa_email,
        empresa_rtn
      } = this.state;
      localContent = (
        <div className="row">
          <div className="col s12">
            <div
              className="cotizacion_header mt-1"
              style={{
                background: `url('${url_logo}') no-repeat
    left top`
              }}
            >
              <span className="d-block">{empresa_nombre}</span>
              <span className="d-block">De: {empresa_de}</span>
              <span className="d-block">{empresa_ubicacion}</span>
              <span className="d-block">TEL: {empresa_telefono}</span>
              <span className="d-block">E-mail: {empresa_email}</span>
              <span className="d-block">RTN: {empresa_rtn}</span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div id="div_print_cotizacion">
        {localContent}
        {clientContent}
        <table className="table-stripped table-bordered">
          <thead>
            <tr>
              <th>PRODUCTO</th>
              <th>CANTIDAD</th>
              <th>PRECIO UNIT.</th>
              <th>SUBTOTAL. LPS</th>
            </tr>
          </thead>
          <tbody>{productsContent}</tbody>
        </table>
        <div className="row">
          <div className="col s6" />
          <div className="col s6" style={{ textAlign: 'right' }}>
            <span className="d-block">
              Sub total: Lps {getNumberFormatted(values.subtotal)}
            </span>
            <span className="d-block">
              Impuesto: Lps {getNumberFormatted(values.impuesto)}
            </span>
            <span className="d-block">
              Total: Lps {getNumberFormatted(values.total)}
            </span>
          </div>
        </div>
        {getCurrentDateToInput()}
      </div>
    );
  };

  render() {
    let quoteData = this.getQuoteData();
    return (
      <div
        className="modal modal-fixed-footer"
        id="modal_imprimir_cotizacion"
        style={{ width: '650px' }}
      >
        <div className="modal-content div_reporte" style={{ width: '650px' }}>
          {quoteData}
        </div>

        <div className="modal-footer">
          <a href="#!" className="btn-flat left" onClick={this.onCancelPrint}>
            Cerrar
          </a>

          <a href="#!" className="btn" onClick={this.onPrintClick}>
            Imprimir
          </a>
        </div>
      </div>
    );
  }
}

PrintQuotation.propTypes = {
  cotizacion: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default PrintQuotation;
