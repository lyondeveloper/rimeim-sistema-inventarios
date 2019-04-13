import React, { Component } from 'react';

import { SEARCH_CLIENT } from '../../layout/NavTypes';
import Navbar from '../../layout/Navbar';

import {
    configMaterialComponents,
    removeMaterialComponents
} from '../../../utils/MaterialFunctions';

import SearchClientModel from '../../layout/modals/SearchClientModel';

class SearchClient extends Component {
    state = {
        clientes: [],
        field: ''
    };

    componentWillMount() {
        removeMaterialComponents();
    }

    componentDidMount() {
        configMaterialComponents();
    }

    onChangeTextInput = e => this.setState({ [e.target.name]: e.target.value });

    onSearch = () => {};

    render() {
        const { field } = this.state;
        return (
            <React.Fragment>
                <Navbar navtype={SEARCH_CLIENT} />

                <main>
                    {/* <div className='row'>
                        <div className='col s12' />
                    </div> */}
                    <SearchClientModel
                        onsearch={this.onSearch}
                        onchange={this.onChangeTextInput}
                        values={{ field }}
                    />
                </main>
            </React.Fragment>
        );
    }
}

export default SearchClient;
