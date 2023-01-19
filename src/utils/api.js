import axios from "axios";
import { pinAdd, pinGet, pinDelete, userLogin, userRegister } from "../utils";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const getAllpins = async () => {
  try {
    const res = axios.get(`${baseUrl}/pin`);
    return res;
  } catch (err) {
    pinGet();
  }
};

export const craetepin = async (body) => {
  try {
    const res = axios.post(`${baseUrl}/pin`, body);
    return res;
  } catch (err) {
    pinAdd();
  }
};

export const deletePin = async (id) => {
  try {
    axios.delete(`${baseUrl}/pin/${id}`);
  } catch (err) {
    pinDelete();
  }
};

export const loginUser = async (body) => {
  try {
    const res = axios.post(`${baseUrl}/user/login`, body);
    return res;
  } catch (err) {
    userLogin();
  }
};

export const registerUser = async (body) => {
  try {
    const res = axios.post(`${baseUrl}/user/register`, body);
    return res;
  } catch (err) {
    userRegister();
  }
};
