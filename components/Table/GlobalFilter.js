import { useState } from 'react'
import { useTable, useGlobalFilter, useAsyncDebounce } from 'react-table'  // new

export default function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <>
      <div className="form-control sm:hidden">
        <input value={value || ""}
          onChange={e => {
            setValue(e.target.value);
            onChange(e.target.value);
          }} type="text" placeholder="search" className=" input input-bordered input-primary w-full max-w-xs" />
      </div>
      <div className="form-control hidden sm:block">
        <input type="text" placeholder="search" className="sm:hidden input input-bordered input-primary w-full max-w-xs" />
        <label className="input-group">
          <span>Search</span>
          <input value={value || ""}
            onChange={e => {
              setValue(e.target.value);
              onChange(e.target.value);
            }} type="text" placeholder="search..." className="input input-primary input-bordered w-full max-w-xs" />
        </label>
      </div>
    </>
  )
}