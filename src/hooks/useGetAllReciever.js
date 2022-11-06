import { useState, useEffect } from "react";
import { Messages } from "../services/Messages";
import { getItem, KEY } from "../utils/storage";
import usePrompts from "./usePrompts";

export default function useGetAllReciever(props) {
  const [data, setData] = useState([]);
  const { alertError } = usePrompts();
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [props?.isFetch]);

  const getData = async () => {
    try {
      const user = await getItem(KEY.ACCOUNT);
      const resp = await Messages.getReceiverList(user.user_id);
      setData(resp.data.data);
    } catch (e) {
      alertError();
    }
  };

  return {
    data,
  };
}
