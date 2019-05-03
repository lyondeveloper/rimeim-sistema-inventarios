import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "../../../actions/isEmpty";

import { getModalInstanceById } from "../../../utils/MaterialFunctions";
import { getNumberFormatted } from "../../../utils/stringUtils";

import SelectInputField from "../../common/SelectInputField";
import TextInputField from "../../common/TextInputField";
import CheckInputField from "../../common/CheckInputField";

import Spinner from "../../common/Spinner";

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
        value: "2",
        label: "Efectivo"
      }
    ],
    custom_errors: {}
  };

  onChangeTextInput = e => this.setState({ [e.target.name]: e.target.value });

  onChangeCheckField = e => {
    const current_value = this.state[e.target.name];
    this.setState({ [e.target.name]: !current_value });
  };

  hideModal = () => {
    getModalInstanceById("modal_sell_checkout").close();
  };

  onHideClick = () => {
    if (this.props.loading) {
      return;
    }
    this.hideModal();
    if (this.props.onHide) {
      this.props.onHide();
    }
  };

  onAcceptClick = () => {
    if (this.props.loading) {
      return;
    }
    const { custom_errors } = this.state;
    if (this.state.metodo_pago === "0") {
      custom_errors.metodo_pago_error = "Seleccione un metodo de pago";
    } else {
      delete custom_errors.metodo_pago_error;
    }
    this.setState({ custom_errors });
    if (!isEmpty(custom_errors)) {
      return;
    }

    if (this.props.onAccept) {
      const { codigo, con_factura, metodo_pago, metodos_pago } = this.state;
      const {
        currentClient,
        sumValues: { subtotal, impuesto, total }
      } = this.props;
      const obj_metodo_pago = metodos_pago.find(m => m.value === metodo_pago);

      let saleData = {
        sub_total: subtotal,
        impuesto,
        total,
        codigo,
        con_factura,
        metodo_pago: obj_metodo_pago.label.toLowerCase()
      };
      if (currentClient.id) {
        saleData.id_cliente = currentClient.id;
      }
      this.props.onAccept(saleData);
    }
  };

  render() {
    const {
      codigo,
      metodos_pago,
      metodo_pago,
      con_factura,
      custom_errors: { metodo_pago_error }
    } = this.state;
    const {
      currentClient,
      loading,
      errors: { codigo_error },
      sumValues: { subtotal, impuesto, total }
    } = this.props;
    let currentClientContent;
    if (currentClient && !isEmpty(currentClient)) {
      currentClientContent = (
        <div className="row">
          <div className="col s12">
            <h6>
              Cliente: {currentClient.nombre} {currentClient.rtn}
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
            <div className="col s12">
              <h6>Sub total: Lps {getNumberFormatted(subtotal)}</h6>
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <h6>Impuesto: Lps {getNumberFormatted(impuesto)}</h6>
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <h6>Total: Lps {getNumberFormatted(total)}</h6>
            </div>
          </div>
          <div className="row">
            <TextInputField
              id="codigo"
              label="Codigo (opcional)"
              value={codigo}
              onchange={this.onChangeTextInput}
              error={codigo_error}
              disabled={loading}
            />
          </div>
          <div className="row">
            <SelectInputField
              id="metodo_pago"
              label="Metodo de pago"
              value={metodo_pago}
              options={metodos_pago}
              onchange={this.onChangeTextInput}
              error={metodo_pago_error}
            />
          </div>
          <div className="row">
            <CheckInputField
              id="con_factura"
              label="Con factura"
              checked={con_factura}
              onchange={this.onChangeCheckField}
              disabled={loading}
            />
          </div>

          {loading && <Spinner fullWidth />}
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            className={`btn-flat left ${loading ? "disabled" : ""} `}
            onClick={this.onHideClick}
          >
            Cerrar
          </a>
          <a
            href="#!"
            className={`btn ${loading ? "disabled" : ""}`}
            onClick={this.onAcceptClick}
          >
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
  errors: PropTypes.object.isRequired,
  sumValues: PropTypes.object.isRequired,
  onAccept: PropTypes.func,
  onHide: PropTypes.func
};

export default SellCheckout;
