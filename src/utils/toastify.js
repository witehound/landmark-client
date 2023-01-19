import { success } from "../assets/constant";
import { toast } from "react-toastify";

export const pinAdd = (state) => {
  if (state === success) {
    toast.success("Added pin!");
  } else {
    toast.warning("Failed to add pin!");
  }
};

export const pinGet = (state) => {
  if (state === success) {
    toast.success("Fetced all pins!");
  } else {
    toast.warning("Failed to fetch pins!");
  }
};

export const pinDelete = (state) => {
  if (state === success) {
    toast.success("Delted pin!");
  } else {
    toast.warning("Failed to delete pin!");
  }
};

export const userRegister = (state) => {
  if (state === success) {
    toast.success("Registerd user!");
  } else {
    toast.warning("Failed to register user!");
  }
};

export const userLogin = (state) => {
  if (state === success) {
    toast.success("User Loged in!");
  } else {
    toast.warning("Failed to login user!");
  }
};

export const userLogout = (state) => {
  if (state === success) {
    toast.success("User loged out!");
  } else {
    toast.warning("Failed to logout user!");
  }
};
