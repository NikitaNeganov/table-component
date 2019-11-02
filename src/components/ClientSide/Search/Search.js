import React, { useState } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions';

const Search = ({
  transList,
  filterList,
}) => {
  const [filteredData, updateFilteredData] = useState([]);
  const [searchInput, updateSearchInput] = useState('');

  const globalSearch = (e) => {
    updateSearchInput(e.target.value);
    updateFilteredData(transList.filter((value) => (
      //  List of columns to search in is below
      value.id.toLowerCase().includes(searchInput.toLowerCase())
      || value.creationDate.toLowerCase().includes(searchInput.toLowerCase())
      || value.amount
        .toString()
        .toLowerCase()
        .includes(searchInput.toLowerCase())
    )));
    filterList(
      (filteredData.length > 0 && filteredData) && (searchInput !== '')
        ? filteredData
        : [],
    );
  };

  return (
    <>
      <input
        type="text"
        name="searchInput"
        value={searchInput || ''}
        onChange={globalSearch}
      />
      <br />
      <br />
    </>
  );
};

const mapStateToProps = (state) => ({
  transList: state.transList,
});

const mapDispatchToProps = (dispatch) => ({
  filterList: (newList) => dispatch(actions.filterList(newList)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
