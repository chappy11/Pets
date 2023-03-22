import axios from "axios";
import { UserVoucherApi } from "./ApiClient";

export const UserVoucher = {
  getVouchers: async (payload) => {
    const headers = {
      "Content-Type": "text/plain",
    };

    const resp = await axios.post(UserVoucherApi("myvouchers"), payload, {
      headers,
    });
    return resp;
  },
};
