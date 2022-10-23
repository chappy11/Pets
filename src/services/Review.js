import axios from "axios";
import { ReviewApi } from "./ApiClient";

export const Review = {
  getReviews: async (product_id) => {
    const data = await axios.get(ReviewApi(`reviews/${product_id}`));

    return data;
  },
  addReview: async (reviewData) => {
    const headers = {
      "Content-Type": "text/plain",
    };

    const resp = await axios.post(ReviewApi("create"), reviewData, { headers });

    return resp;
  },
};
