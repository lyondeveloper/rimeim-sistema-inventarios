import React, { Component } from "react";

import { ADMIN_DEFAULT } from "../../layout/NavTypes";
import NavbarAdmin from "../../layout/NavbarAdmin";

import {
  configMaterialComponents,
  removeMaterialComponents
} from "../../../utils/MaterialFunctions";

import logo_rimeim from "../../../public/img/logo_rimeim.png";

class AdminArea extends Component {
  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
  }

  render() {
    return (
      <React.Fragment>
        <NavbarAdmin navtype={ADMIN_DEFAULT} />
        <main>
          <div className="container">
            <div className="row">
              <div className="col s12" style={{ height: "500px" }}>
                <center>
                  <img src={logo_rimeim} alt="Logo rimeim" className="mt-1" />
                </center>
              </div>
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default AdminArea;
