import axios from "axios";
import { NotificationApi } from "./ApiClient";

export const Notification = {
  getUnRead: async (user_id) => {
    const resp = await axios.get(NotificationApi(`undreadnotif/${user_id}`));

    return resp;
  },

  getNotifications: async (user_id) => {
    const resp = await axios.get(NotificationApi(`getNotification/${user_id}`));

    return resp;
  },

  read: async (notif_id) => {
    const resp = await axios.post(NotificationApi(`read/${notif_id}`));

    return resp;
  },
};
