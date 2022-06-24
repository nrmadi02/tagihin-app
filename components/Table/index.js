import { useFilters, useGlobalFilter, usePagination, useSortBy, useTable } from "react-table";
import { SortDownIcon, SortIcon, SortUpIcon } from "../../assets/icons/Icons";
import GlobalFilter from "./GlobalFilter";

export default function Table({ data, columns }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,

    state,
    preGlobalFilteredRows,
    setGlobalFilter
  } =
    useTable({
      columns,
      data,
      initialState: {
        pageSize: 5
      }
    }, useFilters, useGlobalFilter, useSortBy, usePagination);

  return (
    <>
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <div className="overflow-x-auto rounded-lg">
        <table {...getTableProps()} border="1" className="table w-full">
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th className="group" {...column.getHeaderProps(column.getSortByToggleProps())}>
                    <div className="flex items-center justify-between">
                      {column.render('Header')}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? <SortDownIcon className="w-4 h-4 text-gray-400" />
                            : <SortUpIcon className="w-4 h-4 text-gray-400" />
                          : (
                            <SortIcon className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100" />
                          )}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <div className="btn-group sm:hidden grid grid-cols-2">
          <button onClick={() => previousPage()} disabled={!canPreviousPage} className="btn btn-outline">Previous</button>
          <button onClick={() => nextPage()} disabled={!canNextPage} className="btn btn-outline">Next</button>
        </div>
        <div className="hidden sm:block">
          <div className="flex justify-between">
            <div className="flex gap-x-2 items-center">
              <span className="text-sm">
                Page <span className="font-medium">{state.pageIndex + 1}</span> of <span className="font-medium">{pageOptions.length}</span>
              </span>
              <select
                className="select select-primary"
                value={state.pageSize}
                onChange={e => {
                  setPageSize(Number(e.target.value))
                }}
              >
                {[5, 10, 20].map(pageSize => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </div>
            <div className="btn-group">
              <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className="btn">«</button>
              <button onClick={() => previousPage()} disabled={!canPreviousPage} className="btn">{'<'}</button>
              <button onClick={() => nextPage()} disabled={!canNextPage} className="btn">{'>'}</button>
              <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className="btn">»</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}