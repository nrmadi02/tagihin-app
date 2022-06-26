import axios from "axios";
import { removeCookies, setCookies } from 'cookies-next';

const API_URL = "https://api-tagihin.herokuapp.com/api/v1";

const register = (fullname, username, email, password) => {
  return axios.post(API_URL + "/register", {
    fullname,
    username,
    email,
    password,
  });
};

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

const login = async (email, password) => {
  const response = await axios
    .post(API_URL + "/login", {
      email,
      password,
    });
  if (response.data.data.token) {
    
    const token = parseJwt(response.data.data.token)
    const date = new Date(token.ExpiresAt * 1000)
    setCookies("token", response.data.data.token, {
      expires: date,
      sameSite: true
    })
    typeof window !== 'undefined' && localStorage.setItem("user", JSON.stringify(response.data.data));
  }
  return response.data;
};

const logout = () => {
  removeCookies("token")
  typeof window !== 'undefined' && localStorage.removeItem("user");
  
};

export default {
  register,
  login,
  logout,
};