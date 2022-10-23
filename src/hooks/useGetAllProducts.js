import { useEffect, useState, useCallback } from "react";
import { Product } from "../services/Product";

export default function useGetAllProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await Product.displayProducts();

    if (response.data.status == 1) {
      setProducts(response.data.data);
    } else {
      setProducts([]);
    }
  };

  const filterByCategory = useCallback(
    (categories) => {
      const filteredCategories = categories.filter(
        (val) => val.isActive === true
      );

      const filteredProducts = products.filter((val) =>
        filteredCategories.some((e) => e.category_id === val.category_id)
      );

      setProducts(filteredProducts);
    },
    [setProducts, products]
  );

  useEffect(() => {
    getProducts();
  }, [filterByCategory]);
  return {
    products,
    filterByCategory,
  };
}
