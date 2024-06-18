import React from 'react';
import './css/TopCourses.css';

const TopCourses = () => {
  const products = [
    // Add your product data here
    { title: 'Graphic Design', price: '$18.84', discountPrice: '$6.48', sales: '15 Sales', imgSrc: 'https://mytrialbucket-kush.s3.ap-southeast-2.amazonaws.com/Course1.jpg' },
    { title: 'Graphic Design', price: '$18.84', discountPrice: '$6.48', sales: '15 Sales', imgSrc: 'https://mytrialbucket-kush.s3.ap-southeast-2.amazonaws.com/Course2.jpg' },
    // Add more products as needed
  ];

  return (
    <div className="product-cards">
      {products.map((product, index) => (
        <div className="product-card" key={index}>
          <img src={product.imgSrc} alt={product.title} />
          <h3>{product.title}</h3>
          <p>{product.price} <span>{product.discountPrice}</span></p>
          <p>{product.sales}</p>
          <button>Learn More</button>
        </div>
      ))}
    </div>
  );
};

export default TopCourses;
