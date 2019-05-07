import React, { Component } from 'react';
import NewNavbar from '../../layout/NewNavbar';

// Functions
import {
  configMaterialComponents,
  removeMaterialComponents
} from '../../../utils/MaterialFunctions';

import SellReportOptionsCard from '../../common/SellReportOptions';
import ShowSellReports from '../../common/ShowSellReports';

class SellReports extends Component {
  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
  }

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
