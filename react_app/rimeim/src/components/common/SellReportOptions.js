import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { configSelectInputFields } from '../../utils/MaterialFunctions';
import { getLocals, localsToSelectOptions } from '../../actions/LocalActions';
import {
  getClients,
  clientsToSelectOptions
} from '../../actions/clientActions';
import { getSellReport } from '../../actions/sellActions';
import InputField from './TextInputField';
import SelectInputField from './SelectInputField';

import { getCurrentDateToInput } from '../../utils/dateFormat';

class SellReportOptions extends Component {
  state = {
    fecha_inicio: '',
    fecha_fin: '',
    id_cliente: '0',
    id_local: '0',
    tipo_reporte: '0',
    config_selects: false,
    tipos_reporte: [
      {
        value: '1',
        label: 'Valores totales'
      },
      {
        value: '2',
        label: 'Ventas detalladas'
      }
    ],
    op_locales: [],
    op_clientes: []
  };

  componentDidMount() {
    const fecha = getCurrentDateToInput();
    this.setState({
      fecha_fin: fecha,
      fecha_inicio: fecha
    });
    if (this.props.is_admin) {
      this.props.getLocals();
    }
    this.props.getClients();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.is_admin && nextProps.local.locals) {
      this.setState({
        op_locales: localsToSelectOptions(nextProps.local.locals),
        config_selects: true
      });
    }

    if (nextProps.client.clients) {
      this.setState({
        op_clientes: clientsToSelectOptions(nextProps.client.clients),
        config_selects: true
      });
    }
  }

  componentDidUpdate() {
    if (this.state.config_selects) {
      configSelectInputFields();
      this.setState({
        config_selects: false
      });
    }
  }

  onChangeTextInput = e => this.setState({ [e.target.name]: e.target.value });

  onGetReportClick = () => {
    let {
      fecha_inicio,
      fecha_fin,
      id_cliente,
      id_local,
      tipo_reporte
    } = this.state;
    if (tipo_reporte === '0') {
      return document.getElementById('tipo_reporte').focus();
    }
    if (id_cliente === '0') {
      id_cliente = null;
    }
    if (id_local === '0') {
      id_local = null;
    }
    const reportJson = {
      fecha_inicio,
      fecha_fin,
      id_cliente,
      id_local,
      tipo_reporte
    };
    this.props.getSellReport(reportJson);
  };

  render() {
    const {
      fecha_fin,
      fecha_inicio,
      id_local,
      id_cliente,
      tipo_reporte,
      tipos_reporte,
      op_clientes,
      op_locales
    } = this.state;
    return (
      <div className="card">
        <div className="card-content">
          <div className="row">
            <InputField
              id="fecha_inicio"
              input_size="s12 m6"
              label="Fecha de inicio"
              type="date"
              value={fecha_inicio}
              onchange={this.onChangeTextInput}
            />

            <InputField
              id="fecha_fin"
              input_size="s12 m6"
              label="Fecha fin"
              type="date"
              value={fecha_fin}
              onchange={this.onChangeTextInput}
            />
          </div>

          <div className="row">
            {this.props.is_admin && (
              <SelectInputField
                input_size="s12 m6"
                id="id_local"
                label="Local"
                options={op_locales}
                value={id_local}
                onchange={this.onChangeTextInput}
              />
            )}

            <SelectInputField
              input_size="s12 m6"
              id="id_cliente"
              label="Cliente"
              options={op_clientes}
              value={id_cliente}
              onchange={this.onChangeTextInput}
            />
          </div>
          <div className="row">
            <SelectInputField
              input_size="s12 m6"
              id="tipo_reporte"
              label="Tipo de reporte"
              options={tipos_reporte}
              value={tipo_reporte}
              onchange={this.onChangeTextInput}
            />
          </div>
          <div className="row">
            <div className="col s12">
              <button className="btn" onClick={this.onGetReportClick}>
                Generar reporte
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SellReportOptions.propTypes = {
  local: PropTypes.object.isRequired,
  is_admin: PropTypes.bool.isRequired,
  client: PropTypes.object.isRequired,
  getLocals: PropTypes.func.isRequired,
  getClients: PropTypes.func.isRequired,
  getSellReport: PropTypes.func.isRequired
};

SellReportOptions.defaultProps = {
  is_admin: false
};

const mapStateToProps = state => ({
  local: state.local,
  client: state.client
});

export default connect(
  mapStateToProps,
  { getLocals, getClients, getSellReport }
)(SellReportOptions);
