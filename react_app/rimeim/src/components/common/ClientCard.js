import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import { deleteClient } from '../../actions/clientActions';

import LogoRimeim from '../../public/img/logo_rimeim.png';

import TextInputField from './TextInputField';
import CheckInputField from './CheckInputField';

import Spinner from './Spinner';

class ClientCard extends Component {

    onDeleteClientClick = e => {
        e.preventDefault();
        if (
            window.confirm(
                'Estas seguro de esto? Esta acción NO se puede revertir.'
            )
        )
            this.props.deleteClient(this.props.client.id);
    };

    render() {
        const {
            client: {
                id,
                img,
                codigo,
                nombre,
                rtn,
                es_empresa,
                correo,
                telefono,
                contacto
            }
        } = this.props;

        const { loading } = this.props.clients;

        if (loading) {
            return <Spinner fullWidth />;
        }

        return (
            <div className='card hoverable medium'>
                <div class='card-image waves-effect waves-block waves-light'>
                    <img class='activator' src={LogoRimeim} />
                </div>
                <div className='card-content center p-1'>
                    <span className='card-title grey-text text-darken-4'>
                        {nombre}
                    </span>
                    <button className='btn blue white-text activator mt-1'>
                        Mostrar Más
                    </button>
                    <div className='d-block mt-1 center'>
                        <button
                            className='btn red darken-1'
                            onClick={this.onDeleteClientClick}
                        >
                            Borrar
                        </button>
                    </div>
                </div>
                <div className='card-reveal'>
                    <span className='card-title'>
                        <i class='material-icons right'>close</i>
                        <span className='grey-text text-darken-4 center'>
                            About {nombre}
                        </span>
                    </span>
                    <div className='row mt-1'>
                        <TextInputField
                            id='nombre'
                            label='Nombre'
                            onchange={this.onChangeTextInput}
                            value={nombre}
                            disabled={true}
                            active_label={true}
                        />
                    </div>
                    <div className='row'>
                        <TextInputField
                            id='rtn'
                            label='RTN'
                            onchange={this.onChangeTextInput}
                            value={rtn}
                            disabled={true}
                            active_label={true}
                        />
                    </div>
                    <div className='row'>
                        <TextInputField
                            id='correo'
                            type='email'
                            label='Correo'
                            onchange={this.onChangeTextInput}
                            value={correo}
                            disabled={true}
                            active_label={true}
                        />
                    </div>
                    <div className='row'>
                        <TextInputField
                            id='contacto'
                            label='Contacto'
                            onchange={this.onChangeTextInput}
                            value={contacto}
                            disabled={true}
                            active_label={true}
                        />
                    </div>
                    <div className='row'>
                        <TextInputField
                            id='telefono'
                            label='Telefono'
                            onchange={this.onChangeTextInput}
                            value={telefono}
                            disabled={true}
                            active_label={true}
                        />
                    </div>
                    <div className='row'>
                        <TextInputField
                            id='codigo'
                            label='Codigo'
                            onchange={this.onChangeTextInput}
                            value={codigo}
                            disabled={true}
                            active_label={true}
                        />
                    </div>
                    <div className='row'>
                        <CheckInputField
                            id='es_empresa'
                            checked={es_empresa}
                            onchange={this.onChangeTextInput}
                            label='Es empresa'
                            active_label={true}
                        />
                    </div>
                    <div className='d-block center'>
                        <button className='btn light-blue darken-3'>
                            <Link
                                className='text-white'
                                to={`/editar_cliente/${id}`}
                            >
                                Editar
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    clients: state.client
});

export default connect(
    mapStateToProps,
    { deleteClient }
)(withRouter(ClientCard));
