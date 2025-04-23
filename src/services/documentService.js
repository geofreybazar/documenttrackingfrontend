import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { setToken, token, refresh_token, user_id } from "./setToken";

const baseUrl = "/documents/";

const axiosJWT = axios.create({
  baseURL: baseUrl,
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

async function getDraftDocuments() {
  const response = await axiosJWT.get("");
  return response.data;
}

async function getForwardedDocument() {
  const response = await axiosJWT.get("/getForwardedDocuments");
  return response.data;
}

//old getArchivedDocument
// async function getArchivedDocument() {
//   const response = await axiosJWT.get("/finishdocument");
//   return response.data;
// };

async function getTotalCountFinishDocuments() {
  const response = await axiosJWT.get("/getTotalCountFinishDocuments");
  return response.data;
}

async function getSearchFinishDocuments(searchTerm, page) {
  const response = await axiosJWT.get(
    `/getSearchFinishDocuments?searchTerm=${searchTerm}&page=${page}`
  );
  return response.data;
}

async function getArchivedDocument(page) {
  const response = await axiosJWT.get(`/finishdocument?page=${page}`);
  return response.data;
}

async function getDocument(id) {
  const response = await axiosJWT.get(`/${id}`);
  return response.data;
}

async function getDocuments() {
  const response = await axiosJWT.get("/getDocuments");
  return response.data;
}

async function createDocument(newDocument) {
  const response = await axiosJWT.post("", newDocument);
  return response.data;
}

async function forwardDocument(id, forwardedlog) {
  const response = await axiosJWT.put(`/${id}/forward`, forwardedlog);
  return response.data;
}

async function getPendingDOcuments() {
  const response = await axiosJWT.get("/pendingdocument");
  return response.data;
}

async function getReturnedDocuments() {
  const response = await axiosJWT.get("/returnedDocuments");
  return response.data;
}

async function getToReceiveReturnedDocuments() {
  const response = await axiosJWT.get("/toreceivedreturnedDocuments");
  return response.data;
}

async function gettoReceiveDocuments() {
  const response = await axiosJWT.get("/toReceiveDocuments");
  return response.data;
}

async function receiveDocument(id, receivedLog) {
  const response = await axiosJWT.put(`/${id}/receive`, receivedLog);
  return response.data;
}

async function deleteDocument(id) {
  const response = await axiosJWT.delete(`/${id}`);
  return response;
}

async function markDoneDocument(id) {
  console.log(`${baseUrl}/${id}/done`);
  const response = await axiosJWT.put(`/${id}/done`, null);
  return response.data;
}

async function markUnDoneDocument(id) {
  const response = await axiosJWT.put(`/${id}/undone`, null);
  return response.data;
}

async function updateDocument(id, changedDocument) {
  const response = await axiosJWT.put(`/${id}/update`, changedDocument);
  return response.data;
}

async function serchDocument(searchTerm) {
  const response = await axiosJWT.get(`/search?term=${searchTerm}`);
  return response.data;
}

async function addSignedCopy(id, signedCopy) {
  const response = await axiosJWT.put(`/${id}/addSignedCopy`, signedCopy);
  return response.data;
}

async function changeAddSignedCopy(id, updatedSignedCopy) {
  const response = await axiosJWT.put(
    `/${id}/changeAddSignedCopy`,
    updatedSignedCopy
  );
  return response.data;
}

async function getNewDocNumber() {
  const response = await axiosJWT.get("/getdocnewnumber");
  return response.data;
}

async function getAllDocuments() {
  const response = await axiosJWT.get("/documents");
  return response.data;
}

async function getSearchClientDocument(id) {
  const response = await axios.get(`${baseUrl}/${id}/clientsearch`);
  return response.data;
}

export default {
  getDraftDocuments,
  createDocument,
  getDocument,
  forwardDocument,
  getPendingDOcuments,
  gettoReceiveDocuments,
  receiveDocument,
  getForwardedDocument,
  deleteDocument,
  getReturnedDocuments,
  getToReceiveReturnedDocuments,
  getArchivedDocument,
  markDoneDocument,
  updateDocument,
  getDocuments,
  markUnDoneDocument,
  serchDocument,
  addSignedCopy,
  changeAddSignedCopy,
  getNewDocNumber,
  getSearchClientDocument,
  getAllDocuments,
  getTotalCountFinishDocuments,
  getSearchFinishDocuments,
};
