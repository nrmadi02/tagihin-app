import Head from "next/head"
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import LayoutDashboard from "../../components/Layout/LayoutDashboard";

export default function Dashboard() {
  const router = useRouter()
  const { user, isLoggedIn } = useSelector(state => state.auth);
  useEffect(() => {
    !isLoggedIn && router.replace("/auth")
  }, [isLoggedIn])

  return (
    <div className="bg-base-100">
      <Head>
        <title>Tagihin App - Dashboard</title>
      </Head>
      <LayoutDashboard user={user}>
        <div className="p-5 overflow-auto">
          <h1 className="text-white">Selamat datang {user && user.fullname}</h1>
        </div>
      </LayoutDashboard>
    </div>
  )
}
