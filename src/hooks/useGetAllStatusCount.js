import { useState, useCallback, useEffect } from "react";
import { Orders } from "../services/Orders";
import usePrompts from "./usePrompts";

export default function useGetAllStatusCount() {
  const [data, setData] = useState(null);
  const { alertError } = usePrompts();
  const getData = useCallback(async () => {
    try {
      const res = await Orders.getCountAllStatuses();
      console.log(res);
      if (res.data.status == 1) {
        setData(res.data.data);
      }
    } catch (e) {
      alertError();
    }
  }, []);

  useEffect(() => {
    getData();
  }, []);

  return {
    data,
    getData,
  };
}
