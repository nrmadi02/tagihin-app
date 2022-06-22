import Link from "next/link";
import { useRouter } from "next/router";
import HomeLogo from "../../assets/icons/home.svg"
import InvoiceLogo from "../../assets/icons/invoice.svg"

export default function Sidebar({ isOpen }) {
  const router = useRouter()
  const menuItems = [
    {
      href: '/dashboard',
      title: 'Dashboard',
      icon: <HomeLogo />
    },
    {
      href: '/invoice',
      title: 'Invoice',
      icon: <InvoiceLogo />
    },
  ];
  return (
    <nav>
      <ul>
        {menuItems.map(({ href, title, icon }) => (
          <li className='m-2' key={title}>
            <Link href={href}>
              <a
                className={`text-white flex p-2 rounded-md hover:bg-base-300 cursor-pointer ${router.asPath === href && 'bg-base-200 text-white'}`}
              >
                <div className={`flex w-full items-center flex-row ${isOpen ? "justify-between" : "justify-center"}`}>
                  {isOpen && <p>{title}</p>}
                  <p className={`${isOpen ? "block" : "hidden"} md:block`}>
                    {icon}
                  </p>
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}