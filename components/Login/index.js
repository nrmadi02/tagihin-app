import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import Alert from "../Alert"
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/auth";
import { SET_MESSAGE } from "../../actions/types";
import { useState } from "react";
import { useRouter } from "next/router";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(8)
});

export default function Login() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema)
  });
  const [loading, setLoading] = useState(false)
  const { message } = useSelector(state => state.message);

  const submitLoginHandle = (data) => {
    setLoading(true)
    dispatch({
      type: SET_MESSAGE,
      payload: null,
    });
    setTimeout(() => {
      dispatch(login(data.email, data.password))
        .then(() => {
          toast.custom((t) => (
            Alert.alertSuccess(t, "success login")
          ), {
            duration: 3000,
          })
          setLoading(false)
          setTimeout(() => {
            router.replace("/dashboard")
          }, 1000)
        })
        .catch(() => {
          setLoading(false)
        });
    }, 1000)
  }

  return (
    <div className="hero-content w-96 flex-col">
      <div className="text-center mb-3">
        <h1 className="text-5xl font-bold">Login</h1>
      </div>
      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form onSubmit={handleSubmit(submitLoginHandle)} className="card-body">
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

          <div className="form-control mt-6">
            <button type="submit" className={`btn ${loading ? "loading" : "btn-primary"}`}>{loading ? "loading" : "login"}</button>
          </div>
          {message && (
            <p className="text-red-400 text-sm text-left">
              {message == "login success" || message == "success create new user" ? null : message}
            </p>
          )}
        </form>
      </div>
    </div>
  )
}