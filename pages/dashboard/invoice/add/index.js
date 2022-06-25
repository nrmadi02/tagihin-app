import Head from "next/head"
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LayoutDashboard from "../../../../components/Layout/LayoutDashboard";

export default function Dashboard() {
  const { user } = useSelector(state => state.auth);

  return (
    <div className="bg-base-100">
      <Head>
        <title>Tagihin App - Add Invoice</title>
      </Head>
      <LayoutDashboard>
        <div className="pt-3 h-full px-5 pb-5 overflow-auto">
          <div className="text-sm breadcrumbs">
            <ul>
              <li><Link href="/dashboard">Home</Link></li>
              <li><Link href="/dashboard/invoice">Invoice</Link></li>
              <li className="font-bold text-white">Add Invoice</li>
            </ul>
          </div>
        </div>
      </LayoutDashboard>
    </div>
  )
}
