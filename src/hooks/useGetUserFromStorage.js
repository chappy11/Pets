import { useEffect, useState } from "react";
import { getItem, KEY } from "../utils/storage";

export default function useGetUserFromStorage(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    getUser();
  }, [props?.isRefresh]);

  const getUser = async () => {
    const data = await getItem(KEY.ACCOUNT);
    if (data) {
      setUser(data);
      return;
    }

    return null;
  };
  return {
    user,
  };
}
