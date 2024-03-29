import { ItemApi } from "./ApiClient";
import axios from "axios";

export const Product = {
  getProductByShopId: async (shop_id) => {
    const data = await axios.get(ItemApi(`myproducts/${shop_id}`));

    return data;
  },
  addProduct: async (formdata) => {
    const headers = {
      "Content-Type": "multipart/form-data",
    };

    const data = await axios.post(ItemApi(`createproduct`), formdata, {
      headers,
    });

    return data;
  },

  addPets: async (formdata) => {
    const headers = {
      "Content-Type": "multipart/form-data",
    };

    const data = await axios.post(ItemApi(`addPets`), formdata, {
      headers,
    });

    return data;
  },

  displayProducts: async () => {
    const data = await axios.get(ItemApi("displayproducts"));

    return data;
  },

  getProductById: async (product_id) => {
    const data = await axios.get(ItemApi(`product/${product_id}`));

    return data;
  },

  updateStock: async (payload) => {
    const headers = {
      "Content-Type": "text/plain",
    };

    const data = await axios.post(ItemApi(`updatestock`), payload, { headers });

    return data;
  },

  getallItems: async () => {
    const data = await axios.get(ItemApi("getallitems"));

    return data;
  },

  getallitembycategory: async (cat_id) => {
    const data = await axios.get(ItemApi(`getitembycategory/${cat_id}`));

    return data;
  },
  updateInfo: async (payload) => {
    const headers = {
      "Content-Type": "text/plain",
    };
    const data = await axios.post(ItemApi("updateInfo"), payload, { headers });

    return data;
  },
};
