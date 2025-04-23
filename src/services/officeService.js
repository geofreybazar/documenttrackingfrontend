import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { setToken, token, refresh_token, user_id } from "./setToken";

const baseUrl = "/offices";

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
      console.log(data.data)
      setToken(data.data);
      console.log(refresh_token)
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

async function getAllOffices() {
  const response = await axiosJWT.get("/offices");
  return response.data;
};

async function getHistoryLogs() {
  const response = await axiosJWT.get("/historylog");
  return response.data;
};

async function getAllOfficesForClients() {
  const response = await axios.get(`${baseUrl}/officesforclients`);
  return response.data;
};

async function addOffice(newOffice){
  const response = await axiosJWT.post('',newOffice);
  return response.data;
};

async function editOffice(id, editOffice){
  const response = await axiosJWT.put(`/${id}/`,editOffice);
  return response.data;
};

async function deleteOFfice(id,){
  const response = await axiosJWT.delete(`/${id}`);
  return response; 
};

export default {
  getAllOffices,
  getHistoryLogs,
  getAllOfficesForClients,
  addOffice,
  editOffice,
  deleteOFfice
};
