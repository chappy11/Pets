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
  getCustomerMessage:async(customer_id)=>{
    const resp = await axios.get(MessageConnectionApi(`getcustomermessages/${customer_id}`));

    return resp;
  },
  getShopMessages:async(shop_id)=>{
    const resp = await axios.get(MessageConnectionApi(`getshopmessages/${shop_id}`));

    return resp;
  },
  getConvo:async(conn_id,roles)=>{
    const resp = await axios.get(MessageConnectionApi(`convos/${conn_id}/${roles}`));

    return resp;
  }
};
