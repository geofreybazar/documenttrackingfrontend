import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { setToken, token, refresh_token, user_id } from "./setToken";


const baseUrl = "/users";

const axiosJWT = axios.create({
  baseURL: baseUrl
});

axiosJWT.interceptors.request.use(
  async (config) => {
    let currentDate = new Date();
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      const data = await axios.post("/users/generateRefreshToken", {
        refreshToken: refresh_token,
        id: user_id,
      });
      setToken(data.data);
      config.headers["Authorization"] = `Bearer ${data.data.token}`;
    } else {
      config.headers["Authorization"] = token; 
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

async function getAllUsers() {
  const response = await axiosJWT.get("");
  return response.data;
};

async function getUsers(){
  const response = await axiosJWT.get("/getusersforforward");
  return response.data;
};

async function register(credentials) {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

async function login(credentials) {
  const response = await axios.post(`${baseUrl}/login`, credentials);
  return response.data;
};

async function logout(credentials) {
  const response = await axios.post(`${baseUrl}/logout`, credentials);
  return response.data;
};

async function getUser(id) {
  const response = await axiosJWT.get(`/${id}`);
  return response.data;
};

async function sendVerificationCode(email) {
  const response = await axios.post(`${baseUrl}/sendverification`, email);
  return response.data;
};

async function forgotPassword(newCredentials) {
  const response = await axios.post(`${baseUrl}/forgotPassword`, newCredentials);
  return response.data;
};

async function getReceiveHistory(id) {
  const response = await axiosJWT.get(`/${id}/receivedlogs`)
  return response.data;
};

async function addUser(user) {
  const response = await axios.post(`${baseUrl}`, user);
  return response.data;
}

async function editUser(id, updatedUSer) {
  const response = await axiosJWT.put(`/${id}/edituser`, updatedUSer);
  return response.data;
}

async function deleteUSer(id) {
  const response = await axiosJWT.delete(`${id}`);
  return response;
}

export default {
  register,
  login,
  getUser,
  getUsers,
  getAllUsers,
  sendVerificationCode,
  forgotPassword,
  getReceiveHistory,
  logout,
  addUser,
  editUser,
  deleteUSer
};
