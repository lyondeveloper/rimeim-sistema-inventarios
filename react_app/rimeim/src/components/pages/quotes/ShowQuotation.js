import React, { Component } from "react";
import { connect } from "react-redux";
import NewNavbar from "../../layout/NewNavbar";
import PropTypes from "prop-types";

import "../../../public/css/ventas.css";

// Functions
import {
  configMaterialComponents,
  removeMaterialComponents,
  getModalInstanceById
} from "../../../utils/MaterialFunctions";

import {
  getQuotationById,
  deleteQuotation
} from "../../../actions/sellActions";
import ShowSaleCard from "../../common/ShowSale";
import ConfirmationModal from "../../layout/modals/ConfirmationModal";

class ShowQuotation extends Component {
  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
    this.props.getQuotationById(this.props.match.params.id);
  }

  onDelete = () => {
    getModalInstanceById("modal_confirmar_evento").open();
  };

  onConfirmDelete = () => {
    const { match, history } = this.props;
    this.props.deleteQuotation(match.params.id, history, "/cotizaciones");
  };

  render() {
    const { loading, sell } = this.props.sell;
    return (
      <React.Fragment>
        <NewNavbar active_nav="VENTAS">
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
              Cotizacion
            </a>
            <a href="#!" className="sidenav-trigger" data-target="nav_sidenav">
              <i className="material-icons">menu</i>
            </a>
          </div>
        </NewNavbar>

        <main>
          <div className="row">
            <div className="col s12">
              <ShowSaleCard
                loading={loading}
                sale={sell}
                es_cotizacion={true}
                onDelete={this.onDelete}
              />
            </div>
          </div>
        </main>

        <ConfirmationModal
          title="Borrar devolucion"
          message="Esta seguro de borrar esta devolucion? No se podra deshacer la accion"
          onAccept={this.onConfirmDelete}
        />
      </React.Fragment>
    );
  }
}

ShowQuotation.propTypes = {
  sell: PropTypes.object.isRequired,
  getQuotationById: PropTypes.func.isRequired,
  deleteQuotation: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  sell: state.sell
});

export default connect(
  mapStateToProps,
  { getQuotationById, deleteQuotation }
)(ShowQuotation);
