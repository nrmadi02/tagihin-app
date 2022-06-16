import Head from "next/head";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function Home() {
  const { user } = useSelector(state => state.auth);
  return (
    <div className="h-screen bg-base-200">
      <Head>
        <title>Tagihin App</title>
      </Head>
      <Link href={user ? "/dashboard" : "/auth"}>
        <button className="btn btn-info">Dashboard</button>
      </Link>
    </div>
  )
}
