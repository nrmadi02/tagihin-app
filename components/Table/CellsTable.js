import classNames from "classnames";
import { useRef } from 'react';
import { useFloating, shift } from "@floating-ui/react-dom";
import { useState } from "react";

export function StatusPill({ value }) {
  const status = value ? value.toLowerCase() : "unknown";

  return (
    <span
      className={classNames(
        "px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm",
        status.startsWith("paid") ? "bg-green-100 text-green-700" : null,
        status.startsWith("unpaid") ? "bg-yellow-100 text-yellow-700" : null
      )}
    >
      {status}
    </span>
  );
}

export function StatusPaymentPill({ value }) {
  const status = value ? value.toLowerCase() : "unknown";

  return (
    <span
      className="flex items-center gap-1"
    >
      {status.startsWith("success") && <div className="w-3 h-3 bg-success rounded-full"></div>}
      {status.startsWith("expired") && <div className="w-3 h-3 bg-error rounded-full"></div>}
      {status.startsWith("pending") && <div className="w-3 h-3 bg-warning rounded-full"></div>}
      {status.startsWith("failed") && <div className="w-3 h-3 bg-error rounded-full"></div>}
      {status}
    </span>
  );
}

export function ActionTableInvoice({ value }) {
  const id = value ? value : "unknown";
  const { x, y, reference, floating, strategy } = useFloating({
    placement: "left",
    middleware: [shift()],
  });
  const [loading, setLoading] = useState({
    type: "",
    status: false
  })
  return (
    <div className="dropdown dropdown-left">
      <button tabIndex="0" ref={reference} className="btn btn-ghost flex flex-col gap-1">
        <div className="w-1 h-1 rounded-full bg-primary"></div>
        <div className="w-1 h-1 rounded-full bg-primary"></div>
        <div className="w-1 h-1 rounded-full bg-primary"></div>
      </button>
      <div ref={floating}
        style={{
          position: strategy,
          top: y ?? "",
          left: x ?? "",
        }} tabIndex="0" className="dropdown-content menu p-2 shadow bg-base-300 rounded-box w-52">
        <button onClick={() => {
          setLoading({
            type: "delete",
            status: true
          })
          setTimeout(() => {
            console.log(id + " delete invoice")
            setLoading({
            type: "",
            status: false
          })
          }, 2000)
        }} className={`btn btn-ghost btn-sm !justify-start ${loading.status && loading.type=="delete" ? "loading" : ""}`}>
          {loading.type =="delete" ? "delete..." : (<span className="flex gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="text-red-600" viewBox="0 0 16 16">
              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
            </svg>
            <p>Delete</p>
          </span>)}
        </button>
        <button onClick={() => {
          setLoading({
            type: "send",
            status: true
          })
          setTimeout(() => {
            console.log(id + " send invoice")
            setLoading({
            type: "",
            status: false
          })
          }, 2000)
        }} className={`btn btn-ghost btn-sm !justify-start ${loading.status && loading.type=="send" ? "loading" : ""}`}>
          {loading.type == "send" ? "send..." : (<span className="flex gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="text-blue-600" viewBox="0 0 16 16">
              <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
            </svg>
            <p>Send Invoice</p>
          </span>)}
        </button>
      </div>
    </div>
  );
}
