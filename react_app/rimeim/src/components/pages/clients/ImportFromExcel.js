import React, { Component } from "react";
import { connect } from "react-redux";
import uuid from "uuid";
import NewNavbar from "../../layout/NewNavbar";
import PropTypes from "prop-types";

import {
  configMaterialComponents,
  removeMaterialComponents,
  getModalInstanceById
} from "../../../utils/MaterialFunctions";
import { addMultipleClients } from "../../../actions/clientActions";
import isEmpty from "../../../actions/isEmpty";
import { getJsonFromExcel } from "../../../utils/jsonExcel";

import Spinner from "../../common/Spinner";
import InputFile from "../../common/InputFile";
import EmptyIcon from "../../common/EmptyIcon";
import ConfirmationModal from "../../layout/modals/ConfirmationModal";

class ImportFromExcel extends Component {
  state = {
    error: false,
    show_confirmation_modal: false,
    message: "",
    loading_json: false,
    sending_data: false,
    clientes: []
  };

  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.client.loading && this.state.sending_data) {
      if (nextProps.errors && !isEmpty(nextProps.errors)) {
        this.setState({
          message:
            "Algo no ha salido bien en el proceso, verifique el archivo e intente en un momento",
          error: true,
          show_confirmation_modal: true,
          sending_data: false
        });
      } else {
        this.setState({
          message: "Los clientes fueron guardados con exito",
          error: false,
          show_confirmation_modal: true,
          sending_data: false
        });
      }
    }
  }

  componentDidUpdate() {
    if (this.state.show_confirmation_modal) {
      this.setState({
        show_confirmation_modal: false
      });
      getModalInstanceById("modal_confirmar_evento").open();
    }
  }

  onSaveClick = () => {
    this.props.addMultipleClients({
      clientes: this.state.clientes
    });
    this.setState({ sending_data: true });
  };

  onAcceptClick = () => {
    if (!this.state.error) {
      this.setState({
        clientes: []
      });
    }
  };

  onChangeFile = e => {
    this.setState({
      loading_json: true
    });
    getJsonFromExcel(e.target.files[0], json => {
      const clientes = this.getParsedClients(json);
      document.getElementById("excel_clientes").value = null;
      this.setState({
        clientes,
        loading_json: false
      });
    });
  };

  getParsedClients = json => {
    const newClients = [];
    json.forEach(client => {
      let { nombre, codigo, rtn, telefono, correo, es_empresa } = client;
      if (rtn && nombre) {
        if (!codigo) {
          codigo = null;
        }
        if (!telefono) {
          telefono = null;
        }
        if (!correo) {
          correo = null;
        }
        if (!es_empresa) {
          es_empresa = false;
        }

        if (!newClients.find(c => c.rtn === rtn)) {
          newClients.push({
            nombre,
            rtn,
            codigo,
            telefono,
            correo,
            es_empresa
          });
        }
      }
    });
    return newClients;
  };

  getClientsContent = () => {
    const { loading_json, clientes } = this.state;
    if (loading_json) {
      return <Spinner fullWidth />;
    } else if (clientes.length > 0) {
      let clientsContent = (
        <React.Fragment>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>RTN</th>
                <th>Codigo</th>
                <th>Telefono</th>
                <th>Correo</th>
                <th>Empresa</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map(cliente => (
                <tr key={uuid()}>
                  <td>{cliente.nombre}</td>
                  <td>{cliente.rtn}</td>
                  <td>{cliente.codigo}</td>
                  <td>{cliente.telefono}</td>
                  <td>{cliente.correo}</td>
                  <td>{cliente.es_empresa ? "Si" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h6>Total: {clientes.length}</h6>
        </React.Fragment>
      );
      return clientsContent;
    } else {
      return <EmptyIcon message="No hay informacion disponible" />;
    }
  };

  render() {
    let clientsContent = this.getClientsContent();
    return (
      <React.Fragment>
        <NewNavbar active_nav="CLIENTES">
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
              Importar clientes
            </a>
            <a href="#!" className="sidenav-trigger" data-target="nav_sidenav">
              <i className="material-icons">menu</i>
            </a>

            <ul className="right">
              <li>
                <a href="#!" onClick={this.onSaveClick}>
                  <i className="material-icons">save</i>
                </a>
              </li>
            </ul>
          </div>
        </NewNavbar>
        <main>
          <div className="row">
            <div className="col s12">
              <div className="card">
                <div className="card-content">
                  <div className="row">
                    <InputFile
                      id="excel_clientes"
                      label="Seleccionar archivo"
                      onchange={this.onChangeFile}
                      mutliple={false}
                    />
                  </div>
                  {this.props.client.loading && <Spinner fullWidth />}
                  <div className="row">
                    <div className="col s12">{clientsContent}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <ConfirmationModal
          title="Aviso"
          message={this.state.message}
          onAccept={this.onAcceptClick}
        />
      </React.Fragment>
    );
  }
}

ImportFromExcel.propTypes = {
  client: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addMultipleClients: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  client: state.client,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addMultipleClients }
)(ImportFromExcel);
