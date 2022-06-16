import axios from "axios";

const API_URL = "http://prodapi.tagihin.my.id/api/v1";

const register = (fullname, username, email, password) => {
  return axios.post(API_URL + "/register", {
    fullname,
    username,
    email,
    password,
  });
};

const login = async (email, password) => {
  const response = await axios
    .post(API_URL + "/login", {
      email,
      password,
    });
  if (response.data.data.token) {
    typeof window !== 'undefined' && localStorage.setItem("user", JSON.stringify(response.data.data));
  }
  return response.data;
};

const logout = () => {
  typeof window !== 'undefined' && localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};