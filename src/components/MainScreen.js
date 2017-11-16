import React, { Component }         from 'react';
import ReactDOM                     from 'react-dom';
import autoBind                     from 'react-autobind';
import Button                       from './Button';
import Header                       from './Header';
import TableWrapper                 from './TableWrapper';
import {connect}                    from 'react-redux';
import * as ItemActions             from '../actions/itemActions';
import {bindActionCreators}         from 'redux';


import 'isomorphic-fetch';

const BASE_URL = 'https://itunes.apple.com/search?term=';
const URL_SEARCH_MEDIA = '&media=';
const URL_SEARCH_LIMIT = '&limit=200';
const mediaTypeArray = ["movie", "tvShow"];


class MainScreen extends Component{

    constructor(){
        super();
        autoBind(this);
        this.promises = [];
        this.state = {
            error: null
        }
    }


    _handleKeyPress(e) {
        if (e.key === 'Enter') {
            this._handleSearch();
        }
    }

    _handleClear() {
        ReactDOM.findDOMNode(this.refs.search).value = '';

        this.setState({
            error: null
        });

        if(this.props.itemData.itemsList.length !== 0){
            this.props.itemActions.setItemsList([]);
        }
    }


    _handleSearch() {

        let searchField = ReactDOM.findDOMNode(this.refs.search).value;

        if (searchField !== '') {

            mediaTypeArray.forEach(mediaType => {

                let URL = BASE_URL + searchField + URL_SEARCH_MEDIA + mediaType + URL_SEARCH_LIMIT;

                let promise = fetch(URL)
                    .then((response) => {
                        if (response.status !== 200) {
                            return Promise.reject("Bad response");
                        } else {
                            return Promise.resolve(response.json());
                        }
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    })

                this.promises.push(promise);
            })

            Promise.all(this.promises)
                .then(
                    data => {
                        let results = [];

                        for (let i = 1; i <= mediaTypeArray.length; i++) {
                            results.push(...data[data.length - i].results)
                        }

                        this.setState({
                            error: results.length === 0 ? "No results found." : "",
                        })

                        this.props.itemActions.setItemsList(results);
                    },
                    error => {
                        console.error(error);
                    }
                );
        }
    }


    render(){
        return(
            <div className="main-screen-container">

                <Header text="WELCOME!"/>

                <div className="search-section">
                    <div className="section">
                        <input autoFocus type="text" ref="search" maxLength="50"
                               onKeyPress={this._handleKeyPress}
                               placeholder="Search movies / TV shows..."/>
                    </div>

                    <div className="error">{this.state.error}</div>

                    <div className="section button-section">
                        <Button handleClick={this._handleSearch} title="Search"/>
                        <Button handleClick={this._handleClear} title="Clear"/>
                    </div>
                </div>

                <div className="result-section">
                    <TableWrapper data={this.props.itemData.itemsList}
                                  handleClick={this.props.itemActions.setCurrentItem} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const itemData = state.itemReducer;
    return {
        itemData
    }
}


const mapDispatchToProps = (dispatch) => ({
    itemActions: bindActionCreators(ItemActions, dispatch)
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainScreen);
