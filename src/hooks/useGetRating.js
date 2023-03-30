import React, { useState, useEffect } from "react";
import { Rates } from "../services/Rate";

export default function useGetRating({ product_id }) {
  const [data, setData] = useState();

  const getData = async () => {
    try {
      const resp = await Rates.getRating(product_id);
      let rate = 0;
      if (resp.data.data.rate) {
        rate = resp.data.data.rate;
      }
      setData(rate);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [product_id]);

  return {
    data,
  };
}
