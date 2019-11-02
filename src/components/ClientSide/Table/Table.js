import React from 'react';
import { useTable, useFilters, useSortBy, usePagination } from 'react-table';

import Pagination from '../Pagination/Pagination';

const DefaultColumnFilter = ({
  column: { filterValue, preFilteredRows, setFilter },
}) => {
  const count = preFilteredRows.length;
  return (
    <input
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value || undefined); //  Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
};

//  This component contains table UI & structure
const Table = ({
  columns,
  data,
}) => {
  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    [],
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page, //  Replaces 'row' for pagination
    prepareRow,
    //  Pagination related hooks below
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state = { pageIndex: 0, pageSize: 5 },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: { pageSize: 5 },
    },
    useFilters,
    useSortBy,
    usePagination,
  );

  const getSortingIcon = (column) => {
    if (column.isSorted) {
      return column.isSortedDesc ? ' ↓' : ' ↑';
    } return '';
  };
  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                  <span>
                    {getSortingIcon(column)}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(
            (row) => prepareRow(row) || (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            ),
          )}
        </tbody>
      </table>
      <Pagination
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        pageOptions={pageOptions}
        pageCount={pageCount}
        gotoPage={gotoPage}
        nextPage={nextPage}
        previousPage={previousPage}
        setPageSize={setPageSize}
        state={state}
      />
    </>
  );
};

export default Table;
