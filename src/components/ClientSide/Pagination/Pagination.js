import React from 'react';
//  This component contains pagination UI
const Pagination = ({
  canPreviousPage,
  canNextPage,
  pageOptions,
  pageCount,
  gotoPage,
  nextPage,
  previousPage,
  setPageSize,
  state: { pageIndex, pageSize },
}) => (
  <div className="pagination">
    <button type="button" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
      ⇤
    </button>
    <button type="button" onClick={() => previousPage()} disabled={!canPreviousPage}>
      ←
    </button>
    {' '}
    <button type="button" onClick={() => nextPage()} disabled={!canNextPage}>
      →
    </button>
    <button type="button" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
      ⇥
    </button>
    <span>
      Page{' '}
      <strong>
        {pageIndex + 1} of {pageOptions.length}
      </strong>{' '}
    </span>
    <span>
      | Go to page:{' '}
      <input
        type="number"
        value={pageIndex + 1}
        onChange={(e) => {
          const page = e.target.value ? Number(e.target.value) - 1 : 0;
          gotoPage(page);
        }}
        style={{ width: '100px' }}
      />
    </span>{' '}
    <select
      value={pageSize}
      onChange={(e) => {
        setPageSize(Number(e.target.value));
      }}
    >
      {[5, 10, 20, 30, 40, 50].map((currentPageSize) => (
        <option key={currentPageSize} value={currentPageSize}>
          Show {currentPageSize}
        </option>
      ))}
    </select>
  </div>
);

export default Pagination;
