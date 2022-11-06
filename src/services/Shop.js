import { ShopApi } from "./ApiClient";
import axios from "axios";

export const Shop = {
  getpendingshop: async () => {
    const data = await axios.get(ShopApi("getpendingshop"));
    return data;
  },
  subscribe: async (payload) => {
    const headers = {
      "Content-Type": "text/plain",
    };
    const data = await axios.post(ShopApi("subscribe"), payload, { headers });

    return data;
  },
  shopData: async (shop_id) => {
    const resp = await axios.get(ShopApi(`shopdata/${shop_id}`));

    return resp;
  },
};
