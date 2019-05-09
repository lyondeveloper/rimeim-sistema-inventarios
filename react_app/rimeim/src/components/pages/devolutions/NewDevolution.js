import React, { Component } from "react";
import { connect } from "react-redux";
import uuid from "uuid";
import PropTypes from "prop-types";

import NewNavbar from "../../layout/NewNavbar";
import "../../../public/css/devoluciones.css";

import {
  configMaterialComponents,
  removeMaterialComponents,
  configSelectInputFields
} from "../../../utils/MaterialFunctions";
import isEmpty from "../../../actions/isEmpty";
import { getSellById, addDevolution } from "../../../actions/sellActions";

import { getNumberFormatted } from "../../../utils/stringUtils";

import Spinner from "../../common/Spinner";
import EmptyIcon from "../../common/EmptyIcon";

class NewDevolution extends Component {
  state = {
    productos_devueltos: []
  };

  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
    this.props.getSellById(this.props.match.params.id);
  }

  componentDidUpdate() {
    configSelectInputFields();
    this.state.productos_devueltos.forEach(prod => {
      let checkBox = document.getElementById(`check${prod.id}`);
      if (checkBox) {
        checkBox.checked = true;
      }
    });
  }

  onChangeTextInput = e => this.setState({ [e.target.name]: e.target.value });

  onClickInCheck = (producto, check) => {
    check.preventDefault();
    const { productos_devueltos } = this.state;
    const indexProducto = productos_devueltos.findIndex(
      prod => prod.id === producto.id
    );
    if (indexProducto >= 0) {
      this.setState({
        productos_devueltos: productos_devueltos.filter(
          prod => prod.id !== producto.id
        )
      });
    } else {
      const nuevo_producto_devuelto = JSON.parse(JSON.stringify(producto));
      productos_devueltos.push(nuevo_producto_devuelto);
      this.setState({ productos_devueltos });
    }
  };

  getTotalDevuelto = () => {
    let total = 0;
    this.state.productos_devueltos.forEach(
      prod => (total += parseFloat(prod.total))
    );
    return total;
  };

  getProductoDevueltoCantidad = id_producto => {
    let cantidad = 0;
    let producto_devuelto = this.state.productos_devueltos.find(
      prod => prod.id === id_producto
    );
    if (producto_devuelto) {
      cantidad = producto_devuelto.cantidad;
    }
    return `${cantidad}`;
  };

  getProductoDevueltoTotal = id_producto => {
    let total = 0;
    let producto_devuelto = this.state.productos_devueltos.find(
      prod => prod.id === id_producto
    );
    if (producto_devuelto) {
      total = producto_devuelto.cantidad * parseFloat(producto_devuelto.precio);
    }
    return `${total}`;
  };

  onKeyInputUp = (input_producto, e) => {
    if (e.keyCode !== 13) {
      return;
    }
    let currentInput = document.getElementById(`input${input_producto.id}`);
    if (currentInput) {
      let nueva_cantidad = parseInt(currentInput.value);
      const { productos_devueltos } = this.state;
      const producto_cantidad = this.props.sell.sell.productos.find(
        prod => prod.id === input_producto.id
      ).cantidad;
      let producto_devuelto = null;

      const index_producto_devuelto = productos_devueltos.findIndex(
        prod => prod.id === input_producto.id
      );

      if (index_producto_devuelto >= 0) {
        producto_devuelto = productos_devueltos[index_producto_devuelto];
      }
      if (!producto_devuelto) {
        return (currentInput.value = 0);
      } else if (
        producto_devuelto &&
        (nueva_cantidad === 0 ||
          isNaN(nueva_cantidad) ||
          nueva_cantidad > parseInt(producto_cantidad))
      ) {
        return (currentInput.value = producto_devuelto.cantidad);
      }

      producto_devuelto.cantidad = nueva_cantidad;
      producto_devuelto.total =
        nueva_cantidad * parseFloat(producto_devuelto.precio);
      productos_devueltos[index_producto_devuelto] = producto_devuelto;
      this.setState({
        productos_devueltos
      });
    }
  };

  onFinallyClick = () => {
    if (this.state.productos_devueltos.length > 0) {
      let total_devuelto = this.getTotalDevuelto();
      const devolutionData = {
        id_local: this.props.sell.sell.id_local,
        total_devuelto: total_devuelto + total_devuelto * 0.15,
        productos: this.state.productos_devueltos
      };
      console.log(devolutionData);
      //this.props.addDevolution(this.props.match.params.id, devolutionData, this.props.history)
    }
  };

  getPageContent = () => {
    const { sell, loading } = this.props.sell;
    if (loading) {
      return <Spinner fullWidth />;
    } else if (!isEmpty(sell)) {
      return this.getSellContent(sell);
    } else {
      return <EmptyIcon message="No hay informacion para mostrar" />;
    }
  };

  getSellContent = sell => {
    let rowsContent = this.props.sell.sell.productos.map(prod => (
      <tr key={uuid()}>
        <td className="checkbox-td">
          <label onClick={this.onClickInCheck.bind(this, prod)}>
            <input
              type="checkbox"
              className="filled-in"
              id={`check${prod.id}`}
            />
            <span />
          </label>
        </td>
        <td>{prod.codigo_barra}</td>
        <td>{prod.nombre}</td>
        <td>{prod.cantidad}</td>
        <td>
          <input
            type="text"
            id={`input${prod.id}`}
            className="special-input browser-default"
            style={{ maxWidth: "70px" }}
            defaultValue={this.getProductoDevueltoCantidad(prod.id)}
            onKeyUp={this.onKeyInputUp.bind(this, prod)}
          />
        </td>
        <td>{getNumberFormatted(prod.precio)}</td>
        <td>{getNumberFormatted(prod.total)}</td>
        <td>{getNumberFormatted(this.getProductoDevueltoTotal(prod.id))}</td>
      </tr>
    ));

    let total_devuelto = this.getTotalDevuelto();
    let impuesto_devuelto = total_devuelto * 0.15;
    return (
      <div className="col s12">
        <div className="card">
          <div className="card-content">
            {this.getSellHeader(sell)}
            <div className="w-100 mb-1 mt-1 border-bottom" />
            <span className="d-block">
              <span className="bold">SubTotal devuelto: Lps</span>
              <span className="ml-1">{getNumberFormatted(total_devuelto)}</span>
            </span>
            <span className="d-block">
              <span className="bold">Impuesto devuelto: Lps</span>
              <span className="ml-1">
                {getNumberFormatted(impuesto_devuelto)}
              </span>
            </span>
            <span className="d-block">
              <span className="bold">Total devuelto: Lps</span>
              <span className="ml-1">
                {getNumberFormatted(total_devuelto + impuesto_devuelto)}
              </span>
            </span>
          </div>
        </div>
        <div className="card">
          <div className="card-content">
            <div className="row">
              <div className="col s12">
                <h6>Seleccionar productos para devolver</h6>
                <table className="table-bordered">
                  <thead>
                    <tr>
                      <th className="header-th" />
                      <th>Codigo</th>
                      <th>Descripcion</th>
                      <th>Cantidad</th>
                      <th>Devuelto</th>
                      <th>Precio</th>
                      <th>Total Fac.</th>
                      <th>Total Dev.</th>
                    </tr>
                  </thead>
                  <tbody>{rowsContent}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  getSellHeader = sell => {
    const {
      codigo,
      cliente,
      usuario_creador,
      fecha_creado,
      sub_total,
      impuesto,
      total,
      id
    } = sell;
    return (
      <React.Fragment>
        <span className="d-block">
          <span className="bold">ID: </span>
          <span className="ml-1">{id}</span>
        </span>

        {codigo && (
          <span className="d-block">
            <span className="bold">Codigo: </span>
            <span className="ml-1">{codigo}</span>
          </span>
        )}
        {cliente && (
          <span className="d-block">
            <span className="bold">Cliente: </span>
            <span className="ml-1">{cliente.nombre}</span>
          </span>
        )}

        {cliente && cliente.rtn && (
          <span className="d-block">
            <span className="bold">RTN: </span>
            <span className="ml-1">{cliente.rtn}</span>
          </span>
        )}

        <span className="d-block">
          <span className="bold">Vendedor: </span>
          <span className="ml-1">
            {usuario_creador.id} - {usuario_creador.nombre}
          </span>
        </span>
        <span className="d-block">
          <span className="bold">Fecha: </span>
          <span className="ml-1">{fecha_creado}</span>
        </span>
        <span className="d-block">
          <span className="bold">Sub Total: </span>
          <span className="ml-1">Lps {getNumberFormatted(sub_total)}</span>
        </span>
        <span className="d-block">
          <span className="bold">ISV: </span>
          <span className="ml-1">Lps {getNumberFormatted(impuesto)}</span>
        </span>
        <span className="d-block">
          <span className="bold">Total:</span>
          <span className="ml-1">Lps {getNumberFormatted(total)}</span>
        </span>
      </React.Fragment>
    );
  };

  render() {
    let pageContent = this.getPageContent();
    return (
      <React.Fragment>
        <NewNavbar active_nav="DEVOLUCIONES">
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
              Nueva devolucion
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
                  data-tooltip="Finalizar"
                  onClick={this.onFinallyClick}
                >
                  <i className="material-icons">check</i>
                </a>
              </li>
            </ul>
          </div>
        </NewNavbar>

        <main>
          <div className="row">{pageContent}</div>
        </main>
      </React.Fragment>
    );
  }
}

NewDevolution.propTypes = {
  sell: PropTypes.object.isRequired,
  getSellById: PropTypes.func.isRequired,
  addDevolution: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  sell: state.sell
});

export default connect(
  mapStateToProps,
  { getSellById, addDevolution }
)(NewDevolution);
