import { useEffect } from "react";
import { useState } from "react";
import { MessageConnection } from "../services/MessageConnection";

import { getItem, KEY } from "../utils/storage";

export default function useGetConvo(props) {
  const [data, setData] = useState([]);
  const [isRefetch, setIsRefetch] = useState(false);
  const [roles,setRoles] = useState(0);
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [isRefetch, setIsRefetch]);

  const getData = async () => {
    try {
     
      const user = await getItem(KEY.ACCOUNT);
      setRoles(user?.user_roles);
      const resp = await  MessageConnection.getConvo(props,user?.user_roles);
      console.log("RES",resp)
      
      setData(resp.data.data);
    } catch (e) {
      console.log(e);
    }
  };
  return {
    data,
    setIsRefetch,
    roles,
  };
}
