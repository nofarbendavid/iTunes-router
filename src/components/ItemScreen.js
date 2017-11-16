import React, { Component }         from 'react';
import Header                       from './Header';
import { Link }                     from 'react-router-dom'
import {connect}                    from 'react-redux';
import * as ItemActions             from '../actions/itemActions';
import {bindActionCreators}         from 'redux';


const itemDisplayProperties = ["kind", "collectionName", "primaryGenreName", "contentAdvisoryRating",
                                "releaseDate", "country", "longDescription"];


class ItemScreen extends Component {


    _displayItemInfo(currentItem) {
        let itemInfo = [];

        itemDisplayProperties.forEach(property => {
            itemInfo.push(
                <div className="property" key={property}>
                    <span className="property-key">{this._getDisplayTitle(property)}: </span>
                    <span className="property-value">{currentItem[property]}</span>
                </div>)
        })
        return itemInfo;
    }

    _getDisplayTitle(str){
        return str.replace(/([a-z](?=[A-Z]))/g, '$1 ') ;
    }

    render() {
        let currentItem = this.props.itemData.itemsList.find(item => item.trackId === this.props.itemData.currentItemId);

        return (
            <div className="item-screen-container">
                <Header text={currentItem.trackName} />
                <div className="item-additional-info">
                    {this._displayItemInfo(currentItem)}
                </div>
                <div className="section button-section">
                    <Link to='/'>
                        <button>Back</button>
                    </Link>
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
)(ItemScreen);
