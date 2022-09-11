import axios from "axios";
import { OrderApi } from "./ApiClient";

export const Orders = {
  checkout: async (payload) => {
    const headers = {
      "Content-Type": "text/plain",
    };
    const data = await axios.post(OrderApi("createorder"), payload, {
      headers,
    });

    return data;
  },
  getuserorder: async (user_id) => {
    const data = await axios.get(OrderApi("orders/" + user_id));

    return data;
  },
  getorderbyShop: async (order_id) => {
    const data = await axios.get(OrderApi("order/" + order_id));

    return data;
  },
  getShopOrder: async (shop_id, status) => {
    const data = await axios.get(
      OrderApi(`shoporderlist/${shop_id}/${status}`)
    );

    return data;
  },
  updateStatus: async (payload) => {
    const headers = {
      "Content-Type": "text/plain",
    };
    const data = await axios.post(OrderApi("updateorderstatus"), payload, {
      headers,
    });

    return data;
  },
};
