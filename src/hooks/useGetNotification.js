import React, { useState, useEffect } from "react";
import { getItem, KEY } from "../utils/storage";
import { Notification } from "../services/Notification";

export default function useGetNotification() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const user = await getItem(KEY.ACCOUNT);
      const resp = await Notification.getNotifications(user?.user_id);

      setData(resp.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  return {
    data,
    getData,
  };
}
