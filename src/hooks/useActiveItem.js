import { useEffect, useState } from "react";
import { Carts } from "../services/Cart";
import { getItem, KEY } from "../utils/storage";

export default function useActiveItem() {
  const [item, setItem] = useState([]);
  const [arr, setArr] = useState([]);
  useEffect(() => {
    getCart();
  }, []);

  const getCart = async () => {
    const user = await getItem(KEY.ACCOUNT);
    const resp = await Carts.activecart(user?.user_id);
    if (resp.data.status == 1) {
      let newArr = [];
      const dat = resp.data.data;
      const filtered = dat?.filter(
        (v, i, a) => a.findIndex((v2) => v2.shop_id === v.shop_id) === i
      );

      filtered.forEach((element) => {
        newArr.push(element.shop_id);
      });

      setArr(newArr);
      let getItemByShop = [];

      newArr.forEach((element) => {
        const fil = dat.filter((e) => e.shop_id === element);
        const shopData = {
          shop_id: fil[0].shopName,
          orderItems: fil,
        };

        getItemByShop.push(shopData);
      });

      setItem(getItemByShop);
    } else {
      setItem([]);
    }
  };

  return {
    item,
    arr,
  };
}
