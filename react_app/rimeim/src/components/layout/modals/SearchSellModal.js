import React, { Component } from "react";
import PropTypes from "prop-types";

import TextInputField from "../../common/TextInputField";
import SelectInputField from "../../common/SelectInputField";
import CheckInputField from "../../common/CheckInputField";

class SearchSellModal extends Component {
  state = {
    field: "",
    cliente: "0",
    productos: "",
    metodo_pago: "0",
    metodos_pago: [
      {
        value: "1",
        label: "Efectivo"
      },
      {
        value: "2",
        label: "Tarjeta"
      }
    ],
    con_factura: false
  };

  onChangeTextInput = e => this.setState({ [e.target.name]: e.target.value });

  onChangeCheckField = e => {
    const current_value = this.state[e.target.name];
    this.setState({ [e.target.name]: !current_value });
  };

  onSearchClick = () => {
    const {
      field,
      cliente,
      con_factura,
      productos,
      metodo_pago,
      metodos_pago
    } = this.state;
    let metodo_pago_str = null;
    let metodo_pago_encontrado = metodos_pago.find(
      m => m.value === metodo_pago
    );
    if (metodo_pago_encontrado) {
      metodo_pago_str = metodo_pago_encontrado.label;
    }
    this.props.onSearch({
      field,
      id_cliente: cliente !== "0" ? cliente : null,
      con_factura,
      productos: productos.split(","),
      metodo_pago: metodo_pago_str
    });
  };

  onGetAllClick = () => {
    if (this.props.onGetAll) {
      this.props.onGetAll();
    }
  };

  render() {
    const {
      field,
      con_factura,
      cliente,
      productos,
      metodos_pago,
      metodo_pago
    } = this.state;
    const { es_cotizacion } = this.props;
    return (
      <div className="modal" id="modal_search">
        <div className="modal-content">
          <div className="row">
            <TextInputField
              id="field"
              label="Codigo o id"
              value={field}
              onchange={this.onChangeTextInput}
            />
          </div>

          <div className="row">
            <SelectInputField
              id="cliente"
              label="Cliente"
              value={cliente}
              options={this.props.clientes}
              onchange={this.onChangeTextInput}
            />
          </div>

          <div className="row">
            <TextInputField
              id="productos"
              label="Productos"
              placeholder="00192, 911201, 12212"
              value={productos}
              onchange={this.onChangeTextInput}
            />
          </div>

          {!es_cotizacion && (
            <div className="row">
              <SelectInputField
                id="metodo_pago"
                label="Metodo de pago"
                value={metodo_pago}
                options={metodos_pago}
                onchange={this.onChangeTextInput}
              />
            </div>
          )}

          {!es_cotizacion && (
            <div className="row">
              <CheckInputField
                id="con_factura"
                label="Con factura"
                checked={con_factura}
                onchange={this.onChangeCheckField}
              />
            </div>
          )}
        </div>
        <div className="modal-footer">
          <a href="#!" className="btn btn-flat modal-close left">
            Cerrar
          </a>
          <a
            href="#!"
            className="btn modal-close"
            onClick={this.onGetAllClick}
            style={{ marginRight: "20px" }}
          >
            Obtener todo
          </a>
          <a href="#!" className="btn modal-close" onClick={this.onSearchClick}>
            Buscar
          </a>
        </div>
      </div>
    );
  }
}

SearchSellModal.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onGetAll: PropTypes.func.isRequired,
  clientes: PropTypes.array.isRequired,
  es_cotizacion: PropTypes.bool.isRequired
};

SearchSellModal.defaultProps = {
  es_cotizacion: false
};

export default SearchSellModal;
