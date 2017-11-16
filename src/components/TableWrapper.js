import React, { Component }         from 'react';
import ReactTable                   from 'react-table';
import  momoent                     from 'moment';
import { Link }                     from 'react-router-dom'
import PropTypes                    from 'prop-types';

import 'react-table/react-table.css';


class TableWrapper extends Component {


    _handleClick(itemId){
        this.props.handleClick(itemId);
    }

    _getColumns(){
        return [
            {
                accessor: "trackName",
                Header: "Name",
                width: 400,
                Cell: row => {
                    return <Link to={`/${row.original.trackId}`}
                                 onClick={()=>this._handleClick(row.original.trackId)}>{row.value}</Link>
                }
            },
            {
                accessor: "kind",
                Header: "Type",
                width: 200
            },
            {
                accessor: "primaryGenreName",
                Header: "Genre",
                width: 200
            },
            {
                accessor: "releaseDate",
                Header: "Release Date",
                width: 200,
                Cell : row => {
                    return momoent(row.value).format('DD/MM/YYYY')
                }
            }
        ];
    }


    render() {
        if(this.props.data.length === 0){
          return null;
        }

        return (
            <ReactTable
                sortable={true}
                showPageSizeOptions={false}
                showPagination={false}
                columns={this._getColumns()}
                data={this.props.data}
                defaultPageSize={this.props.data.length}
                filterable={true}
                defaultFilterMethod={(filter, row) => {
                    const id = filter.id;
                    if( id === "releaseDate"){
                        let FormattedDateString = String(momoent(row[id]).format('DD/MM/YYYY'));
                        return row[id] !== undefined ? FormattedDateString.startsWith(filter.value) : true
                    }else {
                        return row[id] !== undefined ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase()) : true

                    }
                }}
            />
        )
    }
}

TableWrapper.PropTypes= {
    handleClick:PropTypes.func.isRequired,
    data:PropTypes.array.isRequired
}

export default TableWrapper;