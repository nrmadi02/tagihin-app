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
      icon: <HomeLogo />,
      sub: []
    },
    {
      href: '/dashboard/invoice',
      title: 'Invoice',
      icon: <InvoiceLogo />,
      sub: ['/invoice/add']
    },
  ];
  return (
    <nav>
      <ul>
        {menuItems.map(({ href, title, icon, sub }) => (
          <li className='m-2' key={title}>
            <Link href={href}>
              <a
                className={`text-white flex rounded-md ${isOpen ? "p-2" : "p-0 sm:p-2"} transition-all hover:bg-base-300 cursor-pointer ${router.asPath === href ||router.asPath.includes(sub[0]) ? 'bg-base-200 text-white' : ''}`}
              >
                <div className={`flex w-full items-center flex-row ${isOpen ? "justify-between" : "justify-center"}`}>
                  <p className={`transition-all ${isOpen ? "block" : "hidden"}`}>{title}</p>
                  <p className={`transition-all ${isOpen ? "block" : "hidden"} md:block`}>
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