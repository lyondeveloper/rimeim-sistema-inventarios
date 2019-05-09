import React, { Component } from "react";
import PropTypes from "prop-types";
import uuid from "uuid";

import { getModalInstanceById } from "../../../utils/MaterialFunctions";
import { getNumberFormatted } from "../../../utils/stringUtils";
import { printQuotation } from "../../../utils/printPdf";
import { getCurrentDateToInput } from "../../../utils/dateFormat";
import getFilesFromInput from "../../../utils/getFilesFromInput";

import TextInputField from "../../common/TextInputField";

class PrintQuotation extends Component {
  state = {
    url_logo: "https://rimeim.com/files/icons/logo_rimeim.png",
    empresa_rtn: "05011982038618",
    empresa_nombre:
      "Representaciones Industriales, Mantenimiento, Exportaciones, Importaciones, Maquinaria",
    empresa_ubicacion: "",
    empresa_telefono: "SPS +504 9481-4706 | Tegus +504 9751-2044 Honduras C.A",
    empresa_email: "ventasrimeim@gmail.com",
    cliente_nombre: "",
    cliente_rtn: ""
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.cotizacion && nextProps.cotizacion.cliente) {
      const { nombre, rtn } = nextProps.cotizacion.cliente;
      if (nombre && rtn) {
        this.setState({
          cliente_nombre: nombre,
          cliente_rtn: rtn
        });
      }
    }

    if (nextProps.cotizacion && nextProps.cotizacion.local) {
      const { ubicacion } = nextProps.cotizacion.local;
      if (ubicacion) {
        this.setState({ empresa_ubicacion: ubicacion });
      }
    }
  }

  onChangeTextInput = e => this.setState({ [e.target.name]: e.target.value });

  onChangeFiles = e => {
    getFilesFromInput(e, files => {
      this.setState({ files });
    });
  };

  hideModal = () => {
    getModalInstanceById("modal_imprimir_cotizacion").close();
  };

  onCancelPrint = () => {
    this.hideModal();
    this.props.onCancel();
  };

  onPrintClick = () => {
    printQuotation("div_print_cotizacion", "rimeim_cotizacion", () => {
      this.onCancelPrint();
    });
  };

  getQuoteData = () => {
    const {
      cotizacion: { productos, values }
    } = this.props;
    const {
      cliente_nombre,
      cliente_rtn,
      empresa_nombre,
      empresa_ubicacion,
      empresa_telefono,
      empresa_email,
      empresa_rtn
    } = this.state;
    let clientContent, productsContent, localContent;

    clientContent = (
      <div>
        <span className="d-block">Cotizado a: {cliente_nombre}</span>
        <span className="d-block">RTN: {cliente_rtn}</span>
      </div>
    );
    if (productos.productos) {
      productsContent = productos.productos.map(producto => (
        <tr key={uuid()}>
          <td>{producto.nombre}</td>
          <td>{producto.cantidad}</td>
          <td>{getNumberFormatted(producto.precio)}</td>
          <td style={{ textAlign: "right" }}>
            {getNumberFormatted(producto.cantidad * producto.precio)}
          </td>
        </tr>
      ));
    }

    localContent = (
      <div className="row">
        <div className="cotizacion_header mt-1">
          <span className="d-block">{empresa_nombre}</span>
          <span className="d-block">{empresa_ubicacion}</span>
          <span className="d-block">TEL: {empresa_telefono}</span>
          <span className="d-block">E-mail: {empresa_email}</span>
          <span className="d-block">RTN: {empresa_rtn}</span>
        </div>
      </div>
    );

    return (
      <div id="div_print_cotizacion" className="div_reporte">
        {localContent}
        {clientContent}
        <table className="table-stripped table-bordered mt-1">
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
        <div
          className="w-100"
          style={{ textAlign: "right", marginRight: "5px" }}
        >
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
        <span className="d-block">Fecha: {getCurrentDateToInput()}</span>
      </div>
    );
  };

  render() {
    let quoteData = this.getQuoteData();
    return (
      <div
        className="modal no-padding"
        id="modal_imprimir_cotizacion"
        style={{
          width: "750px",
          height: "500px",
          maxHeight: "90%"
        }}
      >
        <div className="modal-content no-padding">
          <div
            className="card sticky-action"
            style={{
              width: "100%",
              height: "500px",
              margin: "0"
            }}
          >
            <div
              className="card-content"
              style={{
                height: "445px",
                overflowY: "scroll",
                overflowX: "hidden"
              }}
            >
              <div className="div_reporte">{quoteData}</div>
            </div>
            <div
              className="card-action"
              style={{ marginBottom: "0", height: "50px" }}
            >
              <a
                href="#!"
                className="btn-flat left"
                onClick={this.onCancelPrint}
              >
                Cerrar
              </a>

              <a href="#!" className="activator btn-flat">
                Editar informacion
              </a>

              <a href="#!" className="btn" onClick={this.onPrintClick}>
                Imprimir
              </a>
            </div>
            <div className="card-reveal">
              <span className="card-title grey-text text-darken-4">
                Editar informacion<i className="material-icons right">close</i>
              </span>

              <span className="d-block mt-1">Informacion de la empresa</span>

              <div className="row">
                <TextInputField
                  id="empresa_nombre"
                  label="Nombre de empresa"
                  onchange={this.onChangeTextInput}
                  value={this.state.empresa_nombre}
                />
              </div>

              <div className="row">
                <TextInputField
                  id="empresa_ubicacion"
                  label="Ubicacion"
                  onchange={this.onChangeTextInput}
                  value={this.state.empresa_ubicacion}
                />
              </div>

              <div className="row">
                <TextInputField
                  id="empresa_telefono"
                  label="Telefono"
                  onchange={this.onChangeTextInput}
                  value={this.state.empresa_telefono}
                />
              </div>

              <div className="row">
                <TextInputField
                  id="empresa_email"
                  type="email"
                  label="Email"
                  onchange={this.onChangeTextInput}
                  value={this.state.empresa_email}
                />
              </div>

              <div className="row">
                <TextInputField
                  id="empresa_rtn"
                  label="RTN"
                  onchange={this.onChangeTextInput}
                  value={this.state.empresa_rtn}
                />
              </div>

              <span className="d-block mt-1">Informacion del cliente</span>
              <div className="row">
                <TextInputField
                  id="cliente_nombre"
                  label="Nombre del cliente"
                  onchange={this.onChangeTextInput}
                  value={this.state.cliente_nombre}
                />
              </div>

              <div className="row">
                <TextInputField
                  id="cliente_rtn"
                  label="RTN del cliente"
                  onchange={this.onChangeTextInput}
                  value={this.state.cliente_rtn}
                />
              </div>
            </div>
          </div>
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
