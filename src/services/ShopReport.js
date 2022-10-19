import axios from "axios";
import { ShopReportApi } from "./ApiClient";

export const ShopReport = {
  getShopReports: async (shop_id) => {
    return await axios.get(ShopReportApi(`getsuccesstransaction/${shop_id}`));
  },
};
