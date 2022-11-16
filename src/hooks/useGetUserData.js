import { useState, useEffect } from "react";
import { User } from "../services/User";

export default function useGetUserData(props) {
  const [data, setData] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await User.getuser(props?.id, props?.type);

      setData(response.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  return {
    data,
  };
}
