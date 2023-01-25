import { useState, useEffect } from "react";
import { MessageConnection } from "../services/MessageConnection";
import { Messages } from "../services/Messages";
import { getItem, KEY } from "../utils/storage";
import useGetUserFromStorage from "./useGetUserFromStorage";
import usePrompts from "./usePrompts";

export default function useGetAllReciever(props) {

  const [data, setData] = useState([]);
  const [isCustomer,setIsCustomer] = useState(false);
  const [isLoading,setIsLoading] = useState(false);
  const { alertError } = usePrompts();
  useEffect(() => {
    getData();
  }, []);

  const getData = async()=>{
    try{
      setIsLoading(true)
      const user = await getItem(KEY.ACCOUNT);

      let response = null;

      if(user?.user_roles == 1){
        response = await MessageConnection.getShopMessages(user?.shop_id);
      }else{
        setIsCustomer(true);
        response = await MessageConnection.getCustomerMessage(user?.customer_id);
      }

    

      setData(response?.data?.data);

    }catch(e){
      alertError();
    }finally{
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getData();
  }, [props?.isFetch]);

  // const getData = async () => {
  //   try {
  //     const user = await getItem(KEY.ACCOUNT);

  //     const resp = await Messages.getReceiverList(user.user_id);
  //     setData(resp.data.data);
  //   } catch (e) {
  //     alertError();
  //   }
  // };

  return {
    data,
    isCustomer,
    isLoading
  };
}
