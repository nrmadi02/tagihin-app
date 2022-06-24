import { useMemo } from "react";
import Head from "next/head"
import Link from "next/link";
import { useSelector } from "react-redux";
import LayoutDashboard from "../../../components/Layout/LayoutDashboard";
import Table from "../../../components/Table";
import { SelectColumnFilter } from "../../../components/Table/ColumnFilter";
import { useEffect } from "react";
import useSWR from "swr";
import axios from "axios";

const getData = () => {
  const data = [{
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    title: "Regional Paradigm Technician",
    department: "Optimization",
    status: "Active",
    role: "Admin",
    age: 27,
    imgUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Cody Fisher",
    email: "cody.fisher@example.com",
    title: "Product Directives Officer",
    department: "Intranet",
    status: "Active",
    role: "Owner",
    age: 22,
    imgUrl:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Esther Howard",
    email: "esther.howard@example.com",
    title: "Forward Response Developer",
    department: "Directives",
    status: "Active",
    role: "Member",
    age: 25,
    imgUrl:
      "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Jenny Wilson",
    email: "jenny.wilson@example.com",
    title: "Central Security Manager",
    department: "Program",
    status: "Active",
    role: "Member",
    age: 29,
    imgUrl:
      "https://images.unsplash.com/photo-1498551172505-8ee7ad69f235?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Kristin Watson",
    email: "kristin.watson@example.com",
    title: "Lean Implementation Liaison",
    department: "Mobility",
    status: "Active",
    role: "Admin",
    age: 17,
    imgUrl:
      "https://images.unsplash.com/photo-1532417344469-368f9ae6d187?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Cameron Williamson",
    email: "cameron.williamson@example.com",
    title: "Internal Applications Engineer",
    department: "Security",
    status: "Active",
    role: "Member",
    age: 22,
    imgUrl:
      "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },]

  return [...data, ...data, ...data]
};
const fetchInvoicePaid = async (url, token) =>
  await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  }).then((res) => console.log(res.data))

export default function Invoice() {
  const { user } = useSelector(state => state.auth);
  const { data: res, mutate } = useSWR(["https://api-tagihin.herokuapp.com/api/v1/invoices/status?status=paid", user?.token], fetchInvoicePaid)

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Age",
        accessor: 'age',
      },
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Role",
        accessor: "role",
        Filter: SelectColumnFilter,  
        filter: 'includes',
      },
    ],
    []
  );

  const data = useMemo(() => getData(), []);

  useEffect(() => {
    console.log(res)
  }, [res])

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
              <li className="font-bold">Invoice</li>
            </ul>
          </div>
          <div className="mt-3 flex justify-between">
            <h1 className="text-4xl font-extrabold">Invoice</h1>
            <button className="btn btn-primary">Add invoce +</button>
          </div>
          <div className="mt-5 flex flex-col gap-5 bg-base-300 p-8 rounded-lg shadow-2xl">
            <Table columns={columns} data={data} />
          </div>
        </div>
      </LayoutDashboard>
    </div>
  )
}
