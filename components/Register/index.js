import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { register as reg } from "../../actions/auth";
import toast from "react-hot-toast";
import { SET_MESSAGE } from "../../actions/types";
import Alert from "../Alert"

const schema = yup.object().shape({
  fullname: yup.string().required(),
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required().min(8)
});

export default function Register({setSwitch}) {
  const dispatch = useDispatch()
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema)
  });
  const [loading, setLoading] = useState(false)
  const { message } = useSelector(state => state.message);

  const submitRegisterHandle = (data) => {
    setLoading(true)
    dispatch({
      type: SET_MESSAGE,
      payload: null,
    });
    setTimeout(() => {
      dispatch(reg(data.fullname, data.username, data.email, data.password))
        .then(() => {
          toast.custom((t) => (
            Alert.alertSuccess(t, "success register, login to next dashboard")
          ), {
            duration: 3000,
          })
          setLoading(false)
          setSwitch(true)
        })
        .catch(() => {
          setLoading(false)
        });
    }, 1000)
  }
  return (

    <div className="hero-content sm:w-max w-80 flex-col">
      <div className="text-center mb-3">
        <h1 className="text-5xl font-bold">Register</h1>
      </div>
      <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
        <form onSubmit={handleSubmit(submitRegisterHandle)} className="card-body">
          <div className="flex flex-col sm:flex-row gap-0 sm:gap-4">
            <div className="flex flex-col sm:gap-2">
              <div className="form-control">
                <label htmlFor="fullname" className="label">
                  <span className={`label-text ${errors.fullname ? "text-red-400" : ""}`}>Fullname</span>
                </label>
                <input name="fullname" type="text" placeholder="fullname" className={`input input-bordered ${errors.fullname ? "input-error" : "input-primary"}`} {...register("fullname")} />
                {errors.fullname && (
                  <p className="text-red-400 text-sm mt-2 text-left">
                    {errors.fullname.message}
                  </p>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className={`label-text ${errors.username ? "text-red-400" : ""}`}>Username</span>
                </label>
                <input name="username" type="text" placeholder="username" className={`input input-bordered ${errors.username ? "input-error" : "input-primary"}`} {...register("username")} />
                {errors.username && (
                  <p className="text-red-400 text-sm mt-2 text-left">
                    {errors.username.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col sm:gap-2">
              <div className="form-control">
                <label htmlFor="email" className="label">
                  <span className={`label-text ${errors.email ? "text-red-400" : ""}`}>Email</span>
                </label>
                <input name="email" type="text" placeholder="user@email.com" className={`input input-bordered ${errors.email ? "input-error" : "input-primary"}`} {...register("email")} />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-2 text-left">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="form-control">
                <label htmlFor="password" className="label">
                  <span className={`label-text ${errors.password ? "text-red-400" : ""}`}>Password</span>
                </label>
                <input name="password" type="password" placeholder="password" className={`input input-bordered ${errors.password ? "input-error" : "input-primary"}`} {...register("password")} />
                {errors.password && (
                  <p className="text-red-400 text-sm mt-2 text-left">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="form-control mt-6">
            <button type="submit" className={`btn ${loading ? "loading" : "btn-primary"}`}>{loading ? "loading" : "register"}</button>
          </div>
          {message && (
            <p className="text-red-400 text-sm text-left">
              {message == "success create new user" ? null : message}
            </p>
          )}
        </form>
      </div>
    </div>
  )
}