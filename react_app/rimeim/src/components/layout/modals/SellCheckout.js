import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "../../../actions/isEmpty";

import SelectInputField from "../../common/SelectInputField";
import TextInputField from "../../common/TextInputField";
import CheckInputField from "../../common/CheckInputField";

class SellCheckout extends Component {
  state = {
    codigo: "",
    con_factura: false,
    metodo_pago: "0",
    metodos_pago: [
      {
        value: "1",
        label: "Tarjeta"
      },
      {
        value: "1",
        label: "Efectivo"
      }
    ]
  };

  onChangeTextInput = e => this.setState({ [e.target.name]: e.target.value });

  onChangeCheckField = e => {
    const current_value = this.state[e.target.name];
    this.setState({ [e.target.name]: !current_value });
  };

  render() {
    const { codigo, metodos_pago, metodo_pago, con_factura } = this.state;
    const {
      currentClient,
      errors: { codigo_error }
    } = this.props;
    let currentClientContent;
    if (currentClient && !isEmpty(currentClient)) {
      currentClientContent = (
        <div className="row">
          <h5>Cliente</h5>
          <div className="col s12">
            <h6>
              {currentClient.nombre} {currentClient.rtn}
            </h6>
          </div>
        </div>
      );
    }

    return (
      <div className="modal" id="modal_sell_checkout">
        <div className="modal-content">
          {currentClientContent}
          <div className="row">
            <TextInputField
              id="codigo"
              label="Codigo (opcional)"
              value={codigo}
              onchange={this.onChangeTextInput}
              error={codigo_error}
            />
          </div>
          <div className="row">
            <SelectInputField
              id="metodo_pago"
              label="Metodo de pago"
              value={metodo_pago}
              options={metodos_pago}
              onchange={this.onChangeTextInput}
            />
          </div>
          <div className="row">
            <CheckInputField
              id="con_factura"
              label="Con factura"
              checked={con_factura}
              onchange={this.onChangeCheckField}
            />
          </div>
        </div>
        <div className="modal-footer">
          <a href="#!" className="btn-flat modal-close left">
            Cerrar
          </a>
          <a href="#!" className="btn">
            Aceptar
          </a>
        </div>
      </div>
    );
  }
}

SellCheckout.proptTypes = {
  currentClient: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired
};

export default SellCheckout;
