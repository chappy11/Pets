import { useState, useEffect } from "react";
import { Shop } from "../services/Shop";

export default function useGetShopData(shop_id) {
  const [data, setData] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const resp = await Shop.shopData(shop_id);

      setData(resp.data.data);
    } catch (e) {}
  };

  return {
    data,
  };
}
