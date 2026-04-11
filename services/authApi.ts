import { api } from "./api";

export const registerUser = async (data: {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
}) => {
  const res = await api.post("/user/register", data);
  return res.data;
};

export const loginUser = async (data: {
  email: string;
  password: string;
}) => {
  const res = await api.post("/user/login", data);
  return res.data;
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");

  const res = await api.get("/user/current", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};