import axios from "axios";
import Head from "next/head"
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import useSWR from "swr";
import Alert from "../../../components/Alert";
import LayoutDashboard from "../../../components/Layout/LayoutDashboard";
import PulseLoading from "../../../components/PulseLoading/FormPulseLoading";
import SelectForm from "../../../components/Select";

const fetchProfile = async (url, token) =>
  await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  }).then((res) => res.data.data)

export default function Profile({ countries }) {
  const initialState = {
    address: "",
    city: {
      code: "",
      name: ""
    },
    country: {
      code: "",
      name: ""
    },
    email: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    postal_code: "",
    state: {
      code: "",
      name: ""
    },
  }
  const [dataProfile, setDataProfile] = useState(initialState)
  const { user } = useSelector(state => state.auth);
  const { data: res, mutate } = useSWR(["https://api-tagihin.herokuapp.com/api/v1/profile/" + user?.id, user?.token], fetchProfile)
  const [loading, setLoading] = useState(false)
  const [countryOptions, setCountryOptions] = useState([])
  const [stateOptions, setStateOptions] = useState([])
  const [cityOptions, setCityOptions] = useState([])
  const [codeCountry, setCodeCountry] = useState("")
  const [codeState, setCodeState] = useState("")

  const handleInputChange = (e) => {
    setDataProfile({
      ...dataProfile,
      [e.target.name]: e.target.value
    })
  }

  const fetchDataState = async (code) => {
    setStateOptions([])
    await axios.get("https://api.countrystatecity.in/v1/countries/" + code + "/states",
      {
        headers: {
          "X-CSCAPI-KEY": "amJoNVh2VFpVZmpIUFBLQVZqVGloZ21lbGJ3NVhUbVlYaEJ0bFpwcg=="
        }
      }).then(res => {

        const data = []
        res.data && res.data.map(item => {
          data.push({
            value: item.iso2,
            label: item.name
          })
        })
        setStateOptions(data)
      }).catch(err => {

      })
  }

  const fetchDataCity = async (codeCountry, codeState) => {
    setCityOptions([])
    await axios.get("https://api.countrystatecity.in/v1/countries/" + codeCountry + "/states/" + codeState + "/cities",
      {
        headers: {
          "X-CSCAPI-KEY": "amJoNVh2VFpVZmpIUFBLQVZqVGloZ21lbGJ3NVhUbVlYaEJ0bFpwcg=="
        }
      }).then(res => {
        const data = []
        res.data && res.data.map(item => {
          data.push({
            value: item.id,
            label: item.name
          })
        })
        setCityOptions(data)
      }).catch(err => {

      })
  }

  const handleUpdateProfile = async () => {
    setLoading(true)
    await axios.put("https://api-tagihin.herokuapp.com/api/v1/profile",
      {
        address: dataProfile.address,
        city: dataProfile.city.name,
        country: dataProfile.country.name,
        email: dataProfile.email,
        first_name: dataProfile.first_name,
        last_name: dataProfile.last_name,
        phone_number: dataProfile.phone_number,
        postal_code: dataProfile.postal_code,
        state: dataProfile.state.name
      }, {
      headers: {
        Authorization: `Bearer ${user?.token}`
      }
    }).then(res => {
      mutate()
      toast.custom((t) => (
        Alert.alertSuccess(t, "success update profile")
      ), {
        duration: 2000,
      })
      setLoading(false)
    }).catch(err => {
      console.log(err)
      toast.custom((t) => (
        Alert.alertError(t, !err.response.data ? err.message : err.response.data.messages)
      ), {
        duration: 2000,
      })
      setLoading(false)
    })
  }

  useEffect(() => {
    res && setDataProfile({
      address: res.profile.address,
      city: {
        ...dataProfile.city,
        name: res.profile.city
      },
      country: {
        ...dataProfile.country,
        name: res.profile.country
      },
      email: res.profile.email,
      first_name: res.profile.first_name,
      last_name: res.profile.last_name,
      phone_number: res.profile.phone_number,
      postal_code: res.profile.postal_code,
      state: {
        ...dataProfile.state,
        name: res.profile.state
      },
    })
  }, [res])

  useEffect(() => {
    const data = []
    countries && countries.map(item => {
      data.push({
        label: item.name,
        value: item.iso2
      })
      if (res?.profile.country) {
        if (item.name == res?.profile.country) {
          setCodeCountry(item.iso2)
        }
      }
    })
    data && setCountryOptions(data)
  }, [countries, res])

  useEffect(() => {
    dataProfile.country.code.length != 0 && setCodeCountry(dataProfile.country.code)
    dataProfile.state.code.length != 0 && setCodeState(dataProfile.state.code)
  }, [dataProfile])

  useEffect(() => {
    stateOptions && stateOptions.map(item => {
      if (dataProfile?.state.name) {
        if (item.label == dataProfile?.state.name) {
          setCodeState(item.value)
        }
      }
    })
  }, [stateOptions, dataProfile])

  useEffect(() => {
    codeCountry.length != 0 && fetchDataState(codeCountry)
    codeState.length != 0 && codeCountry.length != 0 && fetchDataCity(codeCountry, codeState)

  }, [codeCountry, codeState])

  return (
    <div className="bg-base-100">
      <Head>
        <title>Tagihin App - Profile</title>
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
                {res ? <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">First Name</span>
                  </label>
                  <input type="text" name="first_name" onChange={handleInputChange} defaultValue={dataProfile?.first_name} placeholder="first name..." className="input input-bordered input-primary w-full" />
                </div> : <PulseLoading />}
                {res ? <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Last Name</span>
                  </label>
                  <input type="text" name="last_name" onChange={handleInputChange} defaultValue={dataProfile?.last_name} placeholder="last name..." className="input input-bordered input-primary w-full" />
                </div> : <PulseLoading />}
                {res ? <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input type="text" name="email" onChange={handleInputChange} defaultValue={dataProfile?.email} placeholder="email..." className="input input-bordered input-primary w-full" />
                </div> : <PulseLoading />}
              </div>
            </div>
            <div className="w-full gap-5 flex flex-col items-center">
              {res ? <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Phone Number</span>
                </label>
                <input type="text" name="phone_number" onChange={handleInputChange} defaultValue={dataProfile?.phone_number} placeholder="phone number..." className="input input-bordered input-primary w-full" />
              </div> : <PulseLoading />}
              {res ? <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Address</span>
                </label>
                <textarea name="address" onChange={handleInputChange} className="textarea textarea-primary" defaultValue={dataProfile?.address} placeholder="address..."></textarea>
              </div> : <PulseLoading />}

            </div>
            <div className="w-full gap-5 flex flex-col sm:flex-row items-center">
              {res ? <SelectForm label="Country" title="country" data={dataProfile} setData={setDataProfile} defaultValue={dataProfile?.country.name} options={countryOptions} /> : <PulseLoading />}
              {res ? <SelectForm disable={codeCountry.length == 0} label="State" title="state" data={dataProfile} setData={setDataProfile} defaultValue={dataProfile?.state.name} options={stateOptions} /> : <PulseLoading />}
            </div>
            <div className="w-full gap-5 flex flex-col sm:flex-row items-center">
              {res ? <SelectForm disable={codeState.length == 0} label="City" title="city" data={dataProfile} setData={setDataProfile} defaultValue={dataProfile?.city.name} options={cityOptions} /> : <PulseLoading />}
              {res ? <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Postal Code</span>
                </label>
                <input name="postal_code" onChange={handleInputChange} defaultValue={dataProfile?.postal_code} type="text" placeholder="postal code..." className="input input-bordered input-primary w-full" />
              </div> : <PulseLoading />}
            </div>
            <div>
              <button onClick={handleUpdateProfile} className={`btn btn-primary float-right w-52 mt-4 ${loading ? "loading" : ""}`}>{loading ? "loading..." : "Save"}</button>
            </div>
          </div>
        </div>
      </LayoutDashboard>
    </div>
  )
}

export async function getStaticProps() {
  const dataCountries = axios.get("https://api.countrystatecity.in/v1/countries", {
    headers: {
      "X-CSCAPI-KEY": "amJoNVh2VFpVZmpIUFBLQVZqVGloZ21lbGJ3NVhUbVlYaEJ0bFpwcg=="
    }
  })

  const countries = dataCountries ? (await dataCountries).data : null

  return {
    props: {
      countries,
    },
  }
}