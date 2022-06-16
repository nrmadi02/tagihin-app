import Head from "next/head"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LayoutDashboard from "../../components/Layout/LayoutDashboard";

export default function Dashboard() {
  const router = useRouter()
  const { user, isLoggedIn } = useSelector(state => state.auth);
  const [dataUser, setDataUser] = useState(null)
  useEffect(() => {
    !isLoggedIn && router.replace("/auth")
    user && setDataUser(user)
  }, [isLoggedIn, user])

  return (
    <div className="bg-base-100">
      <Head>
        <title>Tagihin App - Dashboard</title>
      </Head>
      <LayoutDashboard user={user}>
        <div className="p-5 overflow-auto">
          <div className="text-white">Selamat datang {dataUser?.fullname}</div>
        </div>
      </LayoutDashboard>
    </div>
  )
}
