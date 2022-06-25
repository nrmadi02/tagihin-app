import { useMemo, useState } from "react";
import Head from "next/head"
import Link from "next/link";
import { useSelector } from "react-redux";
import LayoutDashboard from "../../../components/Layout/LayoutDashboard";
import Table from "../../../components/Table";
import { SelectColumnFilter } from "../../../components/Table/ColumnFilter";
import { useEffect } from "react";
import useSWR from "swr";
import axios from "axios";
import moment from "moment"
import { ActionTableInvoice, StatusPaymentPill, StatusPill } from "../../../components/Table/CellsTable";
import TablePulseLoading from "../../../components/PulseLoading/TablePulseLoading";

const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR"
  }).format(number);
}

const fetchInvoice = async (url, token) =>
  await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  }).then((res) => res.data)

export default function Invoice() {
  const { user } = useSelector(state => state.auth);
  const { data: invoicePaid, mutate: mutatePaid } = useSWR(["https://api-tagihin.herokuapp.com/api/v1/invoices/status?status=paid", user?.token], fetchInvoice)
  const { data: invoiceAll, mutate: mutateAll } = useSWR(["https://api-tagihin.herokuapp.com/api/v1/invoices/user?userid=" + user?.id, user?.token], fetchInvoice)
  const { data: invoiceUnpaid, mutate: mutateUnpaid } = useSWR(["https://api-tagihin.herokuapp.com/api/v1/invoices/status?status=unpaid", user?.token], fetchInvoice)

  const [dataInvoicePaid, setDataInvoicePaid] = useState([])
  const [dataInvoiceUnpaid, setDataInvoiceUnpaid] = useState([])
  const [dataInvoiceAll, setDataInvoiceAll] = useState([])

  const [dataInvoice, setDataInvoice] = useState([])

  const [typeMenu, setTypeMenu] = useState("all")

  const getData = (dataInvoice) => {
    const data = dataInvoice
    return [...data]
  };

  const columns = useMemo(
    () => [
      {
        Header: "Invoice Number",
        accessor: d => {
          return (<Link href={`/dashboard/invoice/${d.invoice_number}`}>
            <p className="hover:font-black hover:cursor-pointer">{d.invoice_number}</p>
          </Link>)
        },
      },
      {
        Header: "Invoice Date",
        accessor: d => {
          return moment(d.date).local().format("MMMM DD, YYYY")
        },
      },
      {
        Header: "Invoice To",
        accessor: d => {
          return d.client.first_name + " " + d.client.last_name
        },
      },
      {
        Header: "Amount",
        accessor: d => {
          return rupiah(d.total)
        },
      },
      {
        Header: "Invoice Date Due",
        accessor: d => {
          return moment(d.date_due).local().format("MMMM DD, YYYY")
        },
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: StatusPill,
      },
      {
        Header: "Status Payment",
        accessor: "status_payment",
        Cell: StatusPaymentPill,
      },
      {
        Header: "Action",
        accessor: "id",
        Cell: ActionTableInvoice,
      },
    ],
    []
  );

  useEffect(() => {
    invoicePaid && setDataInvoicePaid(invoicePaid.data)
    invoiceAll && setDataInvoiceAll(invoiceAll.data)
    invoiceUnpaid && setDataInvoiceUnpaid(invoiceUnpaid.data)
  }, [invoicePaid, invoiceAll, invoiceUnpaid])

  const data = useMemo(() => getData(dataInvoice), [dataInvoice]);

  useEffect(() => {
    typeMenu == "all" && setDataInvoice(dataInvoiceAll)
  }, [dataInvoiceAll])

  return (
    <div className="bg-base-100">
      <Head>
        <title>Tagihin App - Invoice</title>
      </Head>
      <LayoutDashboard>
        <div className="pt-3 h-full px-5 pb-5 overflow-auto">
          <div className="text-sm breadcrumbs">
            <ul>
              <li><Link href="/dashboard">Home</Link></li>
              <li className="font-bold text-white">Invoice</li>
            </ul>
          </div>
          <div className="mt-3 flex justify-between">
            <h1 className="text-4xl font-extrabold">Invoice</h1>
            <Link href="/dashboard/invoice/add">
              <button className="btn btn-primary">Add invoce +</button>
            </Link>
          </div>
          <div className="mt-5 flex flex-col gap-5 bg-base-300 p-8 rounded-lg shadow-2xl">
            {dataInvoiceAll.length == 0 && (<TablePulseLoading />)}
            {dataInvoiceAll.length != 0 && (<Table columns={columns} menus={(<div>
              <div className="btn-group float-right">
                <button onClick={() => {
                  setTypeMenu("all")
                  setDataInvoice(dataInvoiceAll)
                }} className={`btn ${typeMenu == "all" && "btn-active"}`}>All</button>
                <button onClick={() => {
                  setTypeMenu("paid")
                  setDataInvoice(dataInvoicePaid)
                }} className={`btn ${typeMenu == "paid" && "btn-active"}`}>Paid</button>
                <button onClick={() => {
                  setTypeMenu("unpaid")
                  setDataInvoice(dataInvoiceUnpaid)
                }} className={`btn ${typeMenu == "unpaid" && "btn-active"}`}>Unpaid</button>
              </div>
            </div>)} data={data} />)}
          </div>
        </div>
      </LayoutDashboard>
    </div>
  )
}
