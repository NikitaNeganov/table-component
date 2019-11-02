import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import './TableStyles.module.scss';

import Table from './Table/Table';
import Search from './Search/Search';

const ClientSide = ({
  transList,
  fetchList,
  filteredList,
}) => {
  let data = [];

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
        accessor: 'linked_account.name',
      },
    ],
    [],
  );
  if (filteredList.length !== 0) {
    console.log('filtered list used');
    data = filteredList;
  } else {
    console.log('trans list used');
    data = transList;
  }
  return (
    <>
      <Search />
      <Table data={data} columns={columns} />
    </>
  );
};

const mapStateToProps = (state) => ({
  transList: state.transList,
  filteredList: state.filteredList,
});

const mapDispatchToProps = (dispatch) => ({
  fetchList: () => dispatch(actions.fetchList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientSide);
