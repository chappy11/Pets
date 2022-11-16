import axios from "axios";
import { EmailApi } from "./ApiClient";

export const Email = {
  emailVerification: async (payload) => {
    try {
      const headers = {
        "Content-Type": "text/plain",
      };
      const res = await axios.post(EmailApi("sendEmail"), payload, { headers });

      return res;
    } catch (e) {
      console.log(e);
    }
  },

  sendOtp: async (payload) => {
    const headers = {
      "Content-Type": "text/plain",
    };

    const res = await axios.post(EmailApi("sendOtp"), payload, { headers });
    console.log("REs", res);
    return res;
  },
};
