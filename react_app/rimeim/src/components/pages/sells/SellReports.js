import React, { Component } from 'react';
import NewNavbar from '../../layout/NewNavbar';

// Functions
import {
  configMaterialComponents,
  removeMaterialComponents
} from '../../../utils/MaterialFunctions';
import { printDivToPDF } from '../../../utils/printPdf';

import SellReportOptionsCard from '../../common/SellReportOptions';
import ShowSellReports from '../../common/ShowSellReports';

class SellReports extends Component {
  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
  }

  onPrintClick = () => {
    this.printDivToPDF('report_sell', 'rimeim_reporte_ventas');
  };

  render() {
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

            <ul className="right">
              <li>
                <a href="#!" onClick={this.onPrintClick}>
                  <i className="material-icons">print</i>
                </a>
              </li>
            </ul>
          </div>
        </NewNavbar>

        <main>
          <div className="row">
            <div className="col s12">
              <SellReportOptionsCard />
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <ShowSellReports />
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default SellReports;
