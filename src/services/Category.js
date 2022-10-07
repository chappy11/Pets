import { CategoryApi } from "./ApiClient";
import axios from "axios";

export const Category = {
  getCategory: async () => {
    const data = await axios.get(CategoryApi("getcategories"));

    return data;
  },
  createCategory: async (payload) => {
    const headers = {
      "Content-Type": "text/plain",
    };
    const data = await axios.post(CategoryApi("createcategory"), payload, {
      headers,
    });

    return data;
  },
};
