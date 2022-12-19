import { useState, useCallback, useEffect } from "react";
import { Orders } from "../services/Orders";
import usePrompts from "./usePrompts";

export default function useGetAllTransaction() {
  const [data, setData] = useState(null);
  const { alertError } = usePrompts();

  const sendRequest = useCallback(
    async (status) => {
      try {
        const resp = await Orders.getAllOrderByStatus(status);

        setData(resp.data.data);
      } catch (e) {
        alertError();
      }
    },
    [data, setData]
  );

  useEffect(() => {
    sendRequest(0);
  }, []);

  return {
    data,
    sendRequest,
  };
}
