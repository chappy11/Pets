import axios from "axios";
import { MessageConnectionApi } from "./ApiClient";

export const MessageConnection = {
  sendmessage: async (data) => {
    const headers = {
      "Content-Type": "text/plain",
    };

    const resp = await axios.post(MessageConnectionApi("newmessage"), data, {
      headers,
    });

    return resp;
  },
  getCustomerMessage:()=>{
    
  }
};
