import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000"
});

export const getKejuruans = () => api.get("/kejuruan");
export const getKejuruan = (id) => api.get(`/kejuruan/${id}`);
export const createKejuruan = (data) => api.post("/kejuruan", data);
export const updateKejuruan = (id, data) => api.put(`/kejuruan/${id}`, data);
export const deleteKejuruan = (id) => api.delete(`/kejuruan/${id}`);

export const getAbsensis = () => api.get("/absensi");
export const getAbsensi = (id) => api.get(`/absensi/${id}`);
export const createAbsensi = (data) => api.post("/absensi", data);
export const updateAbsensi = (id, data) => api.put(`/absensi/${id}`, data);
export const deleteAbsensi = (id) => api.delete(`/absensi/${id}`);
export default api;