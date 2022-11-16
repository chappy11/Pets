import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Orders } from "../services/Orders";
import { getItem, KEY } from "../utils/storage";
import usePrompts from "./usePrompts";

export default function useGetAllOrdersByShop() {
  const [orders, setOrders] = useState([]);
  const [dataCounts, setDataCounts] = useState({
    all: 0,
    pending: 0,
    accepted: 0,
    packed: 0,
    delivered: 0,
    success: 0,
    cancel: 0,
  });
  const { alertError } = usePrompts();

  const getOrders = useCallback(async () => {
    try {
      const account = await getItem(KEY.ACCOUNT);
      const resp = await Orders.getallorder(account?.shop_id);

      if (resp.data.data) {
        setOrders(resp.data.data);
        const dataCounts = {
          all: resp.data.data.length,
          pending: getFilteredByStatus("0", resp.data.data).length,
          accepted: getFilteredByStatus("1", resp.data.data).length,
          packed: getFilteredByStatus("2", resp.data.data).length,
          delivered: getFilteredByStatus("3", resp.data.data).length,
          success: getFilteredByStatus("5", resp.data.data).length,
          cancel: getFilteredByStatus("4", resp.data.data).length,
        };

        setDataCounts(dataCounts);
        return;
      }
    } catch (e) {
      alertError();
    }
  }, [setOrders]);

  const getFilteredByStatus = (status, arr) => {
    const data = arr.filter(
      (val) => val.shop_order_status === status.toString()
    );

    return data;
  };

  useEffect(() => {
    getOrders();
  }, []);

  return { orders, dataCounts };
}
