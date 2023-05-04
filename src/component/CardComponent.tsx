import { useEffect, useState } from "react";
import React from "react";
import "../CSS/CardComponent.css";

interface CardInterface {
  title: string;
  image: string;
  text: string;
}
interface ProductsInterface {
  title: string;
  price: number;
  description: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
}

export const CardComponent = (card: CardInterface) => {
  const [products, setProducts] = useState<ProductsInterface>();
  useEffect(() => {
    cardInfo();
  }, [card]);

  const cardInfo = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const res = await response.json();
      console.log(res);
      setProducts(res);
      return;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-10/12 m-auto h-auto md:flex md:flex-row md:flex-wrap md:m-auto justify-center ">
      {products
        ? products.map((product, i) => (
            <div
              className="md:w-1/2  rounded-lg m-auto hover:shadow-xl md:flex md:flex-grow md:w-full md:h-40 p-2 md:relative"
              key={i}
              id={i}
            >
              <h2 className="text-center font-bold p-5 h-2 md:h-20">
                {product.title}
              </h2>
              <h2 className="text-center font-bold p-5 h-2 md:h-20">
                {product.category}
              </h2>
              <div className="w-1/2 m-auto">
                <img
                  src={product.image}
                  className=" object-contain scale-75 md:h-auto md:absolute top-0 left-0 md:w-1/4 md:h-auto
                  "
                  alt={product.title}
                />
              </div>
              <p className=" font-bold p-5  font-mono flex text-justify tracking-wide product-description md:hidden text-gray-600">
                {product.description}
              </p>
              <div className="text-center font-bold p-5 overflow-hidden text-red-600  text-4xl">
                {product.price} <span>€</span>
              </div>
              <div className="flex flex-row justify-between">
                <div>Note: {product.rating.rate}/5</div>
                <div>{product.rating.count} déjà achetés</div>
              </div>
              <div className="flex justify-end">
                <button className="bg-green-600 rounded-md p-2 hover:bg-green-900 hover:text-white hover:shadow-md font-mono">
                  Add to cart
                </button>
              </div>
            </div>
          ))
        : ""}
    </div>
  );
};
