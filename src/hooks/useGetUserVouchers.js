import { useState, useCallback } from "react";
import { UserVoucher } from "../services/UserVoucher";

export default function useGetUserVouchers() {
  const [data, setData] = useState([]);

  const sendRequest = useCallback(async (payload) => {
    try {
      const resp = await UserVoucher.getVouchers(payload);
      console.log(resp);
      setData(resp.data.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return { sendRequest, data };
}
