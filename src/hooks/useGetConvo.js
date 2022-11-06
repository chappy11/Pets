import { useEffect } from "react";
import { useState } from "react";
import { Messages } from "../services/Messages";
import { getItem, KEY } from "../utils/storage";

export default function useGetConvo(props) {
  const [data, setData] = useState([]);
  const [isRefetch, setIsRefetch] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [isRefetch, setIsRefetch]);

  const getData = async () => {
    try {
      const user = await getItem(KEY.ACCOUNT);
      const resp = await Messages.getConvo(user.user_id, props);
      setData(resp.data.data);
    } catch (e) {
      console.log(e);
    }
  };
  return {
    data,
    setIsRefetch,
  };
}
