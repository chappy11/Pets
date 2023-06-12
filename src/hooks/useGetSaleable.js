import { useState, useCallback, useEffect } from "react";
import { Orders } from "../services/Orders";
import { KEY, getItem } from "../utils/storage";

export default function useGetSaleable() {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);

  const sendRequest = useCallback(async () => {
    try {
      const user = await getItem(KEY.ACCOUNT);
      const resp = await Orders.getsales(user.shop_id);
      const response = resp.data.data;
      const tempProduct = [];
      const tempSale = [];
      response.forEach((val) => {
        tempProduct.push(val.product.productName);
        tempSale.push(val.count);
      });

      setProducts(tempProduct);
      setSales(tempSale);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

 const getByMonth = useCallback(async (month) => {
    try {
      const user = await getItem(KEY.ACCOUNT);
      const resp = await Orders.getSalesByMonth(user.shop_id,month);
      const response = resp.data.data;
      const tempProduct = [];
      const tempSale = [];
      response.forEach((val) => {
        tempProduct.push(val.product.productName);
        tempSale.push(val.count);
      });

      setProducts(tempProduct);
      setSales(tempSale);
    } catch (error) {
      console.log(error);
    }
  }, []);


  return {
    products,
    getByMonth,
    sales,
  };
}
