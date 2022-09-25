import axios from "axios";
import { DashboardApi } from "./ApiClient";

export const DashBoard = {
  getAdminDashboard: async () => {
    const data = await axios.get(DashboardApi("getadmin"));
    console.log(data);

    return data;
  },
};
