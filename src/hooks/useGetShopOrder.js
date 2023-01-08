import { useState, useEffect } from "react";
import { Orders } from "../services/Orders";
import { getItem, KEY } from "../utils/storage";
import usePrompts from "./usePrompts";

export default function useGetShopOrder() {
  const [data, setData] = useState([]);
  const { alertError } = usePrompts();

  const getData = async (order_id) => {
    try {
      const user = await getItem(KEY.ACCOUNT);
      const resp = await Orders.getOrderByShop(order_id, user.shop_id);
      if (resp.data.status == 0) {
        alertError();
        return;
      }
      setData(resp.data.data);
    } catch (e) {
      alertError();
    }
  };

  const getTransaction = async (order_id) => {
    try {
      const user = await getItem(KEY.ACCOUNT);
      const resp = await Orders.getOrderByShop(order_id, user?.shop_id);

      return resp.data.data;
    } catch (e) {
      alertError();
    }
  };

  return {
    data,
    getData,
    getTransaction,
  };
}
