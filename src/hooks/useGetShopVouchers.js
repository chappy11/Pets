import { useState, useEffect } from "react";
import { Voucher } from "../services/Voucher";
import { getItem, KEY } from "../utils/storage";

import usePrompts from "./usePrompts";

export default function useGetShopVouchers() {
  const [data, setData] = useState([]);

  const { alertError } = usePrompts();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const user = await getItem(KEY.ACCOUNT);
      const resp = await Voucher.getShopVouchers(user?.shop_id);
      setData(resp.data.data);
    } catch (error) {
      alertError();
    }
  };
  return { data, getData };
}
