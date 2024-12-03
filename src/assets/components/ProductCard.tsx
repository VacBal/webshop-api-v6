import React from "react";

interface ProductCardProps {
  name: string;
  price: number;
  image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, price, image }) => {
  return (
    <div>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>{price} Ft</p>
    </div>
  );
};

export default ProductCard;
