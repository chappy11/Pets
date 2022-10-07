import axios from "axios";
import { BASE_URL, SubscriptionApi } from "./ApiClient";

export const Subscription = {
  getSubscription: async () => {
    const data = await axios.get(SubscriptionApi("getsubscriptions"));

    return data;
  },
  getSubscriptionById: async (sub_id) => {
    const data = await axios.get(SubscriptionApi(`getsubscription/${sub_id}`));

    return data;
  },

  createSubscription: async (payload) => {
    const headers = {
      "Content-Type": "text/plain",
    };
    const data = await axios.post(
      SubscriptionApi("createsubscription"),
      payload,
      { headers }
    );

    return data;
  },
  updateSubscription: async (payload) => {
    const headers = {
      "Content-Type": "text/plain",
    };

    console.log(payload);
    const data = await axios.post(SubscriptionApi("update"), payload, {
      headers,
    });

    return data;
  },
};
