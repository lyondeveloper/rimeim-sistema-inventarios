import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { configSelectInputFields } from "../../utils/MaterialFunctions";
import { getProductsReport } from "../../actions/productActions";
import { getLocals, localsToSelectOptions } from "../../actions/LocalActions";
import { getCurrentDateToInput } from "../../utils/dateFormat";
import TextInputField from "./TextInputField";
import SelectInputField from "./SelectInputField";

class ProductReportOptions extends Component {
  state = {
    id_local: "0",
    limite_productos: "20",
    fecha_inicio: "",
    fecha_final: "",
    tipo_reporte: "1",
    tipos_reporte: [
      { value: "1", label: "Mas vendidos", tipo: "mas_vendidos" },
      { value: "2", label: "Menos vendidos", tipo: "menos_vendidos" }
    ],
    need_config_selects: false
  };

  componentDidMount() {
    let fecha_actual = getCurrentDateToInput();
    this.setState({
      fecha_final: fecha_actual,
      fecha_inicio: fecha_actual
    });
    if (this.props.is_admin) {
      this.props.getLocals();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.local.locals.length > 0) {
      this.setState({ need_config_selects: true });
    }
  }

  componentDidUpdate() {
    if (this.state.need_config_selects) {
      configSelectInputFields();
      this.setState({
        need_config_selects: false
      });
    }
  }

  onChangeTextInput = e => this.setState({ [e.target.name]: e.target.value });

  onGetReport = () => {
    let {
      id_local,
      limite_productos,
      fecha_inicio,
      fecha_final,
      tipo_reporte,
      tipos_reporte
    } = this.state;
    if (id_local === "0") {
      id_local = null;
    }
    tipo_reporte = tipos_reporte.find(tipo => tipo.value === tipo_reporte).tipo;
    this.props.getProductsReport({
      id_local,
      limite: limite_productos,
      fecha_inicio,
      fecha_final,
      tipo_reporte
    });
  };

  render() {
    const { is_admin } = this.props;
    let localOptions = [];
    const {
      id_local,
      limite_productos,
      fecha_final,
      fecha_inicio,
      tipo_reporte,
      tipos_reporte
    } = this.state;

    if (is_admin) {
      localOptions = localsToSelectOptions(this.props.local.locals);
    }
    return (
      <div className="card">
        <div className="card-content">
          {is_admin && (
            <SelectInputField
              id="id_local"
              label="Local"
              input_size="s12 m6"
              value={id_local}
              onchange={this.onChangeTextInput}
              options={localOptions}
            />
          )}
          <div className="row">
            <SelectInputField
              id="tipo_reporte"
              input_size="s12 m6"
              label="Tipo de reporte"
              value={tipo_reporte}
              options={tipos_reporte}
              onchange={this.onChangeTextInput}
            />
          </div>
          <div className="row">
            <TextInputField
              id="limite_productos"
              input_size="s12 m6"
              label="Numero de resultados"
              type="number"
              value={limite_productos}
              onchange={this.onChangeTextInput}
            />
          </div>
          <div className="row">
            <TextInputField
              id="fecha_inicio"
              type="date"
              input_size="s12 m6"
              label="Fecha de inicio"
              value={fecha_inicio}
              onchange={this.onChangeTextInput}
            />

            <TextInputField
              id="fecha_final"
              type="date"
              input_size="s12 m6"
              label="Fecha final"
              value={fecha_final}
              onchange={this.onChangeTextInput}
            />
          </div>
          <div className="row">
            <div className="col s12">
              <button className="btn" onClick={this.onGetReport}>
                Obtener reporte
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProductReportOptions.propTypes = {
  local: PropTypes.object.isRequired,
  is_admin: PropTypes.bool.isRequired,
  getLocals: PropTypes.func.isRequired,
  getProductsReport: PropTypes.func.isRequired
};

ProductReportOptions.defaultProps = {
  is_admin: false
};

const mapStateToProps = state => ({
  local: state.local
});

export default connect(
  mapStateToProps,
  { getLocals, getProductsReport }
)(ProductReportOptions);
