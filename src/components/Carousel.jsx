import React, { useEffect, useState } from "react";

const Carousel = ({ logos = [] }) => {
  return (
    <div className="product_list">
      {logos?.map((data) => (
        <div className="product_container">
          <div className="product_circle">
            <img src={data?.url} alt="product image" />
          </div>
          <p className="product_type">{data.type}</p>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
