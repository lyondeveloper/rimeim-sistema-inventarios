import React, { Component } from "react";
import NewNavbar from "../../layout/NewNavbar";

// Functions
import {
  configMaterialComponents,
  removeMaterialComponents
} from "../../../utils/MaterialFunctions";

import { getCurrentDateToInput } from "../../../utils/dateFormat";
import InputField from "../../common/TextInputField";

class SellReports extends Component {
  state = {
    fecha_inicio: "",
    fecha_fin: "",
    id_cliente: ""
  };

  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
    const fecha = getCurrentDateToInput();
    this.setState({
      fecha_fin: fecha,
      fecha_inicio: fecha
    });
  }

  onChangeTextInput = e => this.setState({ [e.target.name]: e.target.value });

  onSearch = () => {};

  render() {
    const { fecha_inicio, fecha_fin } = this.state;
    return (
      <React.Fragment>
        <NewNavbar active_nav="VENTAS">
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
              Reporte de ventas
            </a>
            <a href="#!" className="sidenav-trigger" data-target="nav_sidenav">
              <i className="material-icons">menu</i>
            </a>
          </div>
        </NewNavbar>

        <main>
          <div className="row">
            <div className="col s12">
              <div className="card bordered">
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
                </div>
              </div>
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default SellReports;
