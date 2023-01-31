import axios from "axios";
import { RemarksApi } from "./ApiClient";

export const Remarks = {
  getRemarks: async (shop_order_id) => {
    const data = await axios.get(RemarksApi(`remark/${shop_order_id}`));

    return data;
  },
};
