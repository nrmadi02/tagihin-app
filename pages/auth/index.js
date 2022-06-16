import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";
import Login from "../../components/Login";
import Register from "../../components/Register";

export default function Auth() {
  const router = useRouter()
  const [switchComponent, setSwitchComponent] = useState(true)
  const { user } = useSelector(state => state.auth);
  user && router.replace("/dashboard")

  return (
    <div className="bg-base-200">
      <Head>
        <title>Tagihin App - {switchComponent ? "Login" : "Register"}</title>
      </Head>
      <div className="flex flex-col h-screen justify-center items-center text-center p-10">
        {switchComponent && <Login />}
        {!switchComponent && <Register setSwitch={setSwitchComponent} />}
        <p>{switchComponent ? "Belum memiliki akun" : "Sudah memiliki akun"} ?
          <strong
            onClick={
              () => {
                setSwitchComponent(!switchComponent)
              }
            }
            className="text-primary transition-all font-bold hover:text-primary-focus hover:cursor-pointer"> silahkan klik disini</strong>
        </p>
      </div>
    </div>
  )
}
