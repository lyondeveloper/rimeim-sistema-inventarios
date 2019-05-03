import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextInputField from '../../common/TextInputField';
import SelectInputField from '../../common/SelectInputField';
import CheckInputField from '../../common/CheckInputField';

class SearchSellModal extends Component {
  state = {
    field: '',
    cliente: '0',
    productos: '',
    con_factura: false
  };

  onChangeTextInput = e => this.setState({ [e.target.name]: e.target.value });

  onChangeCheckField = e => {
    const current_value = this.state[e.target.name];
    this.setState({ [e.target.name]: !current_value });
  };

  onSearchClick = () => {
    const { field, cliente, con_factura, productos } = this.state;
    this.props.onSearch({
      field,
      id_cliente: cliente,
      con_factura,
      productos: productos.split(',')
    });
  };

  render() {
    const { field, con_factura, cliente, productos } = this.state;
    return (
      <div className="modal" id="modal_search">
        <div className="modal-content">
          <div className="row">
            <TextInputField
              id="field"
              label="Codigo, rtn o id de venta"
              value={field}
              onchange={this.onChangeTextInput}
            />
          </div>

          <div className="row">
            <SelectInputField
              id="cliente"
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
          <a href="#!" className="btn btn-flat modal-close left">
            Cerrar
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
  clientes: PropTypes.array.isRequired
};

export default SearchSellModal;
