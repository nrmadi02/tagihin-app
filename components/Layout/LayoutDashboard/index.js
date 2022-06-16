import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { logout } from "../../../actions/auth";
import Alert from "../../Alert";
import Sidebar from "../../Sidebar";

export default function LayoutDashboard({ user, children }) {
  console.log(user)
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogOut = () => {
    setLoading(true)
    setTimeout(() => {
      dispatch(logout())
      setLoading(false)
      toast.custom((t) => (
        Alert.alertSuccess(t, "success logout")
      ), { duration: 3000 })
    }, 2000)
  }
  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <div className="navbar bg-primary text-white">
          <div className="flex-none">
            <button onClick={() => {
              setIsOpen(!isOpen)
            }} className="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
          </div>
          <div className="flex-1">
            <a className="btn btn-ghost normal-case text-xl">Dashboard kamu</a>
          </div>
          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src="https://api.lorem.space/image/face?hash=33792" />
                </div>
              </label>
              <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-primary rounded-box w-52">
                <li className="hover:font-bold">
                  <a>
                    Profile
                  </a>
                </li>
                <li className="hover:font-bold"><a>Settings</a></li>
                <li className="hover:font-bold">
                <a onClick={handleLogOut} className={`btn btn-sm hover:bg-primary-focus ${loading ? "loading" : "btn-ghost"}`} >{loading ? "loading" : "logout"}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
      <div className="flex flex-row flex-1">
        <div className={`pt-3 bg-primary w-full ease-in-out duration-300 ${isOpen ? "w-48 md:w-56" : "w-0 md:w-16"}`}>
          <Sidebar isOpen={isOpen} />
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  )
}