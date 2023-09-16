import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { IProduct } from '../../redux/types/productTypes';
import ProductCard from '../product/productCardForm';

interface ProductCarouselProps {
  products: IProduct[];
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products }) => {
  const chunks = [];
  for (let i = 0; i < products.length; i += 4) {
    chunks.push(products.slice(i, i + 4));
  }

  return (
    <Carousel autoPlay infiniteLoop interval={5000} emulateTouch showStatus={false} showThumbs={false}>
      {chunks.map((chunk, idx) => (
        <div key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' ,flexWrap: 'wrap'}}>
          {chunk.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
