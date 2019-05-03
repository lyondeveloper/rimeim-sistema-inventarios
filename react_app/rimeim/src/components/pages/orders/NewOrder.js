import React, { Component } from "react";
import { connect } from "react-redux";

import NewNavbar from "../../layout/NewNavbar";

import {
  configMaterialComponents,
  removeMaterialComponents,
  configSelectInputFields,
  configModals
} from "../../../utils/MaterialFunctions";

import TextInputField from "../../common/TextInputField";
import SelectInputField from "../../common/SelectInputField";
import SearchProductLocal from "./SearchProductLocal";
import SearchProductProvider from "./SearchProductProvider";

import { getLocals } from "../../../actions/LocalActions";
import { getProviders } from "../../../actions/providerActions";
import { createOrder } from "../../../actions/orderActions";

class NewOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codigo: "",
      fecha_entrega: "",
      id_local: "",
      id_proveedor: "",
      proveedor_actual: {},
      productos: [],
      es_compra: false,
      providerMode: false,
      needs_config_selects: false,
      needs_config_modals: false,
      errors: {}
    };

    this.onChangeTextInput = this.onChangeTextInput.bind(this);
    this.onProviderModeChange = this.onProviderModeChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
    if (this.state.providerMode) this.props.getProviders();
    else this.props.getLocals();
  }

  componentDidUpdate() {
    if (this.state.needs_config_selects) {
      configSelectInputFields();
      this.setState({
        needs_config_selects: false
      });
    }
    if (this.state.needs_config_modals) {
      configModals();
      this.setState({
        needs_config_modals: false
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }

    if (this.state.providerMode) {
      if (nextProps.locals.locals) {
        const { locals } = nextProps.locals;
        locals.forEach(local => (local.disabled = false));
        this.setState({
          needs_config_selects: true,
          searching: false
        });
      }
    } else {
      if (nextProps.providers.providers) {
        const { providers } = nextProps.providers;
        providers.forEach(local => (local.disabled = false));
        this.setState({
          needs_config_selects: true,
          searching: false
        });
      }
    }
  }

  onProviderModeChange() {
    this.setState({
      providerMode: !this.state.providerMode,
      needs_config_modals: true
    });
  }

  onChangeTextInput(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onReceiveProductData(productos) {
    this.setState({
      productos
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const { codigo, fecha_entrega, productos, local, es_compra } = this.state;

    const orderData = {
      id_local_solicitado: local,
      codigo,
      fecha_entrega,
      productos,
      es_compra
    };

    this.props.createOrder(orderData, this.props.history);
  }

  render() {
    const { codigo, providerMode, fecha_entrega, id_local } = this.state;

    const { locals } = this.props;
    const { providers } = this.props.providers;

    const localOptions = [];
    const providerOptions = [];

    if (providerMode) {
      providers.map(provider => {
        providerOptions.push({
          value: provider.id,
          label: provider.nombre
        });
      });
    } else {
      locals.locals.map(local => {
        localOptions.push({
          value: local.id,
          label: local.nombre
        });
      });
    }

    return (
      <React.Fragment>
        <NewNavbar active_nav={"PEDIDOS"}>
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
              Nuevo Pedido
            </a>
            <a href="#!" className="sidenav-trigger" data-target="nav_sidenav">
              <i className="material-icons">menu</i>
            </a>
            <ul className="right">
              <li>
                <a
                  href="#!"
                  className="tooltipped"
                  data-position="left"
                  data-tooltip="Ver Todos"
                >
                  <i className="material-icons">group</i>
                </a>
              </li>

              <li>
                <a
                  href="#!"
                  className="tooltipped"
                  data-position="left"
                  data-tooltip="Buscar"
                >
                  <i className="material-icons">search</i>
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
                    <div className="d-block right">
                      <button
                        className="btn"
                        onClick={this.onProviderModeChange}
                      >
                        Pedido a {providerMode ? "Local" : "Proveedor"}
                      </button>
                    </div>
                  </div>
                  <form onSubmit={this.onSubmit}>
                    <div className="row">
                      {providerMode ? (
                        <React.Fragment>
                          <SearchProductProvider
                            onPassProductsData={this.onReceiveProductData.bind(
                              this
                            )}
                          />
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <div className="row">
                            <SelectInputField
                              input_size="s12"
                              id="id_local"
                              label="Local"
                              onchange={this.onChangeTextInput}
                              value={id_local}
                              options={localOptions}
                            />
                          </div>
                          <SearchProductLocal
                            onPassProductsData={this.onReceiveProductData.bind(
                              this
                            )}
                          />
                        </React.Fragment>
                      )}
                    </div>

                    <div className="row">
                      <TextInputField
                        input_size="s12"
                        id="codigo"
                        label="Codigo de pedido"
                        onchange={this.onChangeTextInput}
                        value={codigo}
                      />
                    </div>

                    <div className="row">
                      <TextInputField
                        type="date"
                        input_size="s12"
                        id="fecha_entrega"
                        label="Fecha de Entrega de Pedido"
                        onchange={this.onChangeTextInput}
                        value={fecha_entrega}
                      />
                    </div>

                    <div className="d-block center mt-1">
                      <button className="btn" type="submit">
                        Guardar{" "}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  locals: state.local,
  orders: state.order,
  providers: state.provider
});

export default connect(
  mapStateToProps,
  { getLocals, createOrder, getProviders }
)(NewOrder);
