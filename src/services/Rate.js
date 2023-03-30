import axios from "axios";
import { RateApi } from "./ApiClient";
export const Rates = {
  getRating: async (product_id) => {
    const data = await axios.get(RateApi("rating/" + product_id));

    return data;
  },
  createRating: async ($payload) => {
    const headers = {
      "Content-Type": "text/plain",
    };
    const resp = await axios.post(RateApi("rate"), $payload, { headers });

    return resp;
  },
};
