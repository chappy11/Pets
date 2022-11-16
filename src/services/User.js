import { UserApi } from "./ApiClient";
import axios from "axios";

export const User = {
  login: async (payload) => {
    const headers = {
      "Content-Type": "text/plain",
    };
    const data = await axios.post(UserApi("login"), payload, { headers });

    return data;
  },
  register: async (payload) => {
    const headers = {
      "Content-Type": "multipart/form-data",
    };

    const data = await axios.post(UserApi("signupcustomer"), payload, {
      headers,
    });

    return data;
  },
  createshop: async (payload) => {
    const headers = {
      "Content-Type": "multipart/form-data",
    };

    const data = await axios.post(UserApi("createshop"), payload, { headers });

    return data;
  },

  getpendinguser: async () => {
    const data = await axios.get(UserApi("getpendingcustomer"));

    return data;
  },

  updateStatus: async (payload) => {
    const headers = {
      "Content-Type": "text/plain",
    };
    const data = await axios.post(UserApi("updatestatus"), payload, {
      headers,
    });

    return data;
  },

  getusers: async (roles, status) => {
    const data = await axios.get(UserApi(`getusers/${roles}/${status}`));

    return data;
  },

  getuser: async (id, type) => {
    const data = await axios.get(UserApi(`getuser/${id}/${type}`));

    return data;
  },

  getLogs: async () => {
    const data = await axios.get(UserApi("getlogs"));

    return data;
  },

  changePass: async (payload) => {
    const headers = {
      "Content-Type": "text/plain",
    };
    const data = await axios.post(UserApi("changepass"), payload, { headers });

    return data;
  },
};
