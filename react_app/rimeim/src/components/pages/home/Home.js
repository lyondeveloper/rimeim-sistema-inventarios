import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {
  configMaterialComponents,
  removeMaterialComponents
} from '../../../utils/MaterialFunctions';

class Home extends Component {
  componentWillMount() {
    removeMaterialComponents();
  }

  componentDidMount() {
    configMaterialComponents();
  }

  render() {
    return (
      <React.Fragment>
        <header className="normal-site">
          <nav className="red lighten-2">
            <div className="container">
              <div className="nav-wrapper">
                <a href="https://rimeim.com" className="brand-logo">
                  Rimeim
                </a>
                <a
                  href="#!"
                  className="sidenav-trigger"
                  data-target="nav_sidenav"
                >
                  <i className="material-icons">menu</i>
                </a>
                <ul className="right hide-on-small-only">
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <ul className="sidenav" id="nav_sidenav">
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </header>
        <div className="row normal-site">
          <div className="showcase" />
        </div>

        <main className="grey lighten-5 normal-site">
          <div className="container">
            <div className="row">
              <div className="col s12">
                <h4>Nuestros productos</h4>
                <div className="card">
                  <div className="card-content">
                    <p>
                      REPUESTOS ISUZU KB , DMAX , NPR , NKR , NHR , JMC
                      ,MAHINDRA SCORPIO 4JB1 , 4JA1 , 4JH1,4JJ1 4HF1 , 4HK1,
                      4HE1 , CREMALLERA HIDRAULICA , SECTORES , TRANSMISIONES
                      ,DIFERENCIALES, TAMBORES DE FRENOS.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col s12">
                <h4>Nuestras marcas</h4>
              </div>
              <div className="col s12 m4 l4">
                <div className="card hoverable bordered">
                  <div
                    style={{
                      height: '150px',
                      background:
                        "url('https://rimeim.com/files/icons/izuzu_logo.png') no-repeat center center / cover"
                    }}
                  />
                </div>
              </div>

              <div className="col s12 m4 l4">
                <div className="card hoverable bordered">
                  <div
                    className="bg-card-jmc"
                    style={{
                      height: '150px',
                      background:
                        "url('https://rimeim.com/files/icons/jmc_logo.png') no-repeat center center / cover"
                    }}
                  />
                </div>
              </div>

              <div className="col s12 m4 l4">
                <div className="card hoverable bordered">
                  <div
                    style={{
                      height: '150px',
                      background:
                        "url('https://rimeim.com/files/icons/mahindra_logo.png') no-repeat center center / cover"
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
        <footer className="grey darken-3 white-text normal-site">
          <div className="container">
            <div className="row mb-0">
              <div className="col s12">
                <div className="mt-1">
                  <a
                    href="https://www.facebook.com/pg/Rimeim-Autopartes-Especialidad-En-Repuestos-Isuzu-250893418452303"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="https://rimeim.com/files/icons/icono_facebook.png"
                      alt="Facebook icono"
                      style={{ height: '40px' }}
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="row mb-0">
              <div className="col s12">
                <h5>Contacto</h5>
                <h6>San Pedro Sula: +504 9481-4706</h6>
                <h6>Tegucigalpa +504 9751-2044</h6>
              </div>
            </div>
            <div className="row mb-0">
              <p className="col s12">
                Rimeim &copy; {new Date().getFullYear()} -
                ventasrimeim@gmail.com
              </p>
            </div>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}

export default Home;
