import Head from "next/head"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LayoutDashboard from "../../components/Layout/LayoutDashboard";

export default function Dashboard() {
  const { user } = useSelector(state => state.auth);
  const [dataUser, setDataUser] = useState(null)
  useEffect(() => {
    user && setDataUser(user)
  }, [user])

  return (
    <div className="bg-base-100">
      <Head>
        <title>Tagihin App - Dashboard</title>
      </Head>
      <LayoutDashboard>
        <div className="p-5">
          <div className="text-white">
            <p>Selamat datang {dataUser?.fullname}</p>
          </div>
        </div>
      </LayoutDashboard>
    </div>
  )
}
