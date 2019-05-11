import React, { Component } from "react";
import NewNavbar from "../../../layout/NewNavbarAdmin";

// Functions
import {
  configMaterialComponents,
  removeMaterialComponents
} from "../../../../utils/MaterialFunctions";

import { printDivToPDF } from "../../../../utils/printPdf";
import ProductReportOptions from "../../../common/ProductReportOptions";
import ShowProductReports from "../../../common/ShowProductReports";

class SellReports extends Component {
  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
  }

  onPrintPDFClick = () => {
    printDivToPDF("report_products", "rimeim_reporte_productos");
  };

  render() {
    return (
      <React.Fragment>
        <NewNavbar active_nav="VENTAS">
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
              Reporte de productos
            </a>
            <a href="#!" className="sidenav-trigger" data-target="nav_sidenav">
              <i className="material-icons">menu</i>
            </a>

            <ul className="right">
              <li>
                <a href="#!" onClick={this.onPrintPDFClick}>
                  <i className="material-icons">print</i>
                </a>
              </li>
            </ul>
          </div>
        </NewNavbar>

        <main>
          <div className="row">
            <div className="col s12">
              <ProductReportOptions is_admin={true} />
            </div>
          </div>
          <div className="row">
            <ShowProductReports />
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default SellReports;
