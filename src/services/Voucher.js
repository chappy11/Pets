import axios from "axios";
import { VoucherApi } from "./ApiClient";

export const Voucher = {
  createVoucher: async (payload) => {
    const headers = {
      "Content-Type": "text/plain",
    };
    const data = await axios.post(VoucherApi("create"), payload, { headers });

    return data;
  },
  getShopVouchers: async (shop_id) => {
    console.log("BB", shop_id);
    const data = await axios.get(VoucherApi(`shopvouchers/${shop_id}`));

    return data;
  },
};
