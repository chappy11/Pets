import axios from "axios";
import { MessagesApi } from "./ApiClient";

export const Messages = {
  createMessage: async (payload) => {
    const headers = {
      "Content-Type": "text/plain",
    };
    const resp = await axios.post(MessagesApi(`create`), payload, { headers });

    return resp;
  },

  getReceiverList: async (sender_id) => {
    const resp = await axios.get(MessagesApi(`recievers/${sender_id}`));

    return resp;
  },

  getConvo: async (sender_id, reciever_id) => {
    const resp = await axios.get(
      MessagesApi(`convo/${sender_id}/${reciever_id}`)
    );

    return resp;
  },
};
