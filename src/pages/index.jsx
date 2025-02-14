import React from "react";
import Carousel from "../components/Carousel";
import { CAROUSELIMG } from "../assets/carousel";
import ProductCard from "../components/ProductCard";
import { PRODUCTLIST } from "../assets/products";
import { SERVICE } from "../assets/service";
import OfferContainer from "../components/OfferContainer";
import { OFFERS } from "../assets/offers";
import AIChatWidget from "../components/AIChatWidget";

function landingPage() {
  return (
    <div>
      <div className="bg-container">
        <div className="hero_section container-main">
          <div className="heroSection_container">
            <h1 className="heroSection_title">
              Raining Offers For Hot Summer!
            </h1>
            <h2 className="heroSection_title2">25% Off On All Products</h2>
            <div className="button_container">
              <button className="btn primary">SHOP NOW</button>
              <button className="btn secondary">FIND MORE</button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-container">
        <div className="container-main">
          <Carousel logos={CAROUSELIMG} />
        </div>
      </div>
      <div className="bg-container">
        <div className="container-main">
          <OfferContainer cardsData={OFFERS} />
        </div>
      </div>
      <div className="bg-container">
        <div className="feature_container container-main ">
          <h2 className="product_type feature_prd_title">Featured Products</h2>
          <div className="underLine_style" />
          <ProductCard list={PRODUCTLIST} />
        </div>
      </div>
      <div className="bg-container">
        <div className="container-main">
          <div className="product_service">
            {SERVICE?.map((data) => (
              <div className="service_container">
                <img src={data.url} />
                <p className="service_title">{data?.title}</p>
                <p className="service_description">{data?.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AIChatWidget />
    </div>
  );
}
export default landingPage;
