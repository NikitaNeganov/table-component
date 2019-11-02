import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import './TableStyles.module.scss';

import Table from './Table/Table';

const ClientSide = ({
  transList,
  fetchList,
}) => {
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

  return <Table data={transList} columns={columns} />;
};

const mapStateToProps = (state) => ({
  transList: state.transList,
});

const mapDispatchToProps = (dispatch) => ({
  fetchList: () => dispatch(actions.fetchList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientSide);
