import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import './TableStyles.module.scss';

import Table from './Table/Table';


const SEARCH_PARAMS = ['id', 'creationDate', 'type', 'name', 'amount'];

const ClientSide = ({
  transList,
  fetchList,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [data, setData] = useState(transList);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    if (searchValue) {
      const filteredData = data.filter((transaction) => {
        const values = SEARCH_PARAMS.map((param) => transaction[param]).join(' ');
        return values.toLowerCase().includes(searchValue.toLowerCase());
      });

      setData(filteredData);
    } else {
      setData(transList);
    }
  }, [searchValue]);

  useEffect(() => {
    if (transList.length) {
      setData(transList);
    }
  }, [transList]);

  useEffect(() => {
    fetchList();
  }, []);

  //  Table column structure and props
  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
        disableFilters: true,
      },
      {
        Header: 'Date and Time',
        accessor: 'creationDate',
        disableFilters: true,
      },
      {
        Header: 'Amount',
        accessor: 'amount',
      },
      {
        Header: 'Currency',
        accessor: 'currency.symbol',
      },
      {
        Header: 'Type',
        accessor: 'type',
      },
      {
        Header: 'Linked account',
        accessor: 'name',
      },
    ],
    [],
  );

  return (
    <>
      <input
        type="text"
        name="searchInput"
        value={searchValue || ''}
        onChange={handleSearch}
      />
      <Table data={data} columns={columns} />
    </>
  );
};

const mapStateToProps = (state) => ({
  transList: state.transList,
});

const mapDispatchToProps = (dispatch) => ({
  fetchList: () => dispatch(actions.fetchList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientSide);
