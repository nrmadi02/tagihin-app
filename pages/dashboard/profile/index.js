import Head from "next/head"
import Link from "next/link";
import LayoutDashboard from "../../../components/Layout/LayoutDashboard";
import SelectForm from "../../../components/Select";

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

export default function Profile() {

  return (
    <div className="bg-base-100">
      <Head>
        <title>Tagihin App - Dashboard</title>
      </Head>
      <LayoutDashboard>
        <div className="pt-3 px-5 pb-5 overflow-auto">

          {/* breadcrumbs */}
          <div className="text-sm breadcrumbs">
            <ul>
              <li><Link href="/dashboard">Home</Link></li>
              <li className="font-bold">Profile</li>
            </ul>
          </div>
          <div className="mt-3">
            <h1 className="text-4xl font-extrabold">Profile</h1>
          </div>
          <div className="mt-5 flex flex-col gap-5 bg-base-300 p-8 rounded-lg shadow-2xl">
            <div className="flex gap-8 flex-col sm:flex-row">
              <div className="avatar">
                <div className="w-full sm:w-72 rounded-lg">
                  <img src="https://api.lorem.space/image/face?hash=88560" />
                </div>
              </div>
              <div className="w-full gap-5 flex flex-col justify-center items-center">
                <div class="form-control w-full">
                  <label class="label">
                    <span class="label-text">First Name</span>
                  </label>
                  <input type="text" placeholder="first name..." class="input input-bordered input-primary w-full" />
                </div>
                <div class="form-control w-full">
                  <label class="label">
                    <span class="label-text">Last Name</span>
                  </label>
                  <input type="text" placeholder="last name..." class="input input-bordered input-primary w-full" />
                </div>
                <div class="form-control w-full">
                  <label class="label">
                    <span class="label-text">Email</span>
                  </label>
                  <input type="text" placeholder="email..." class="input input-bordered input-primary w-full" />
                </div>
              </div>
            </div>
            <div className="w-full gap-5 flex flex-col items-center">
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text">Phone Number</span>
                </label>
                <input type="text" placeholder="phone number..." class="input input-bordered input-primary w-full" />
              </div>
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text">Address</span>
                </label>
                <textarea class="textarea textarea-primary" placeholder="address..."></textarea>
              </div>
            </div>
            <div className="w-full gap-5 flex flex-col sm:flex-row items-center">
              <SelectForm label="Country" options={options} />
              <SelectForm label="State" options={options} />
            </div>
            <div className="w-full gap-5 flex flex-col sm:flex-row items-center">
              <SelectForm label="City" options={options} />
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text">Postal Code</span>
                </label>
                <input type="text" placeholder="postal code..." class="input input-bordered input-primary w-full" />
              </div>
            </div>
            <div>
              <button className="btn btn-primary float-right w-52 mt-4">Save</button>
            </div>
          </div>
        </div>
      </LayoutDashboard>
    </div>
  )
}

