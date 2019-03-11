import React, { Component } from 'react'

import { QUOTATIONS } from "../../layout/NavTypes"
import Navbar from "../../layout/Navbar"

import QuotationCard from "../../common/QuotationCard"

import {
    configMaterialComponents,
    removeMaterialComponents
} from "../../../utils/MaterialFunctions"

import "../../../public/css/cotizaciones.css"

class Quotations extends Component {
    state = {
        cotizaciones: [
            {
                id: 1,
                codigo: '#0194',
                fecha: 'TOmowwor',
                total: 1200,
                cliente: {
                    nombre: 'Perez pereira'
                }
            },
            {
                id: 2,
                codigo: '#018472',
                fecha: 'Pasto',
                total: 9887,
                cliente: {
                    nombre: 'Marco solis'
                }
            },
            {
                id: 3,
                codigo: '#193723',
                fecha: 'Past',
                total: 34567,
                cliente: {
                    nombre: 'Mandin'
                }
            }
        ]
    }

    componentWillMount() {
        removeMaterialComponents()
    }

    componentDidMount() {
        configMaterialComponents()
    }

    render() {
        const { cotizaciones } = this.state
        return (
            <React.Fragment>
                <Navbar navtype={QUOTATIONS} />

                <main>
                    <div className="row">
                        <div className="col s12">
                            {cotizaciones.map((item, i) => {
                                return (
                                    <QuotationCard cotizacion={item} key={item.id} />
                                )
                            })}
                        </div>
                    </div>
                </main>
            </React.Fragment>
        )
    }
}

export default Quotations
