import { useEffect, useState } from "react";
import { Category } from "../services/Category";
import usePrompts from "./usePrompts";

export default function useGetCategory() {
  const [category, setCategory] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);
  const { alertError } = usePrompts();

  useEffect(() => {
    getCategoriesList();
  }, [isRefresh]);

  const getCategoriesList = async () => {
    try {
      const response = await Category.getCategory();
      if (response.data.status == "1") {
        setCategory(response.data.data);
      } else {
        setCategory([]);
      }
      setIsRefresh(false);
    } catch (e) {
      alertError();
    }
  };

  return {
    category,
    setIsRefresh,
  };
}
