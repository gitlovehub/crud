import { useEffect } from "react";

const Products = () => {
  useEffect(() => {
    async () => {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      ).json();
      return res;
    };
  }, []);

  return;
};

export default Products;
