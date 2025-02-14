import React from "react";



const Cards = ({cardsData=[]}) => {
  return (
    <div className="cards-container">
      {cardsData?.map((card) => (
        <div key={card.id} className="card" style={{ backgroundImage: `url(${card.image})` }}>
          <div className="card-overlay">
            <h2 className="card-title">{card.title}</h2>
            <p className="card-description">{card.description}</p>
            <button className="card-button">{card.buttonText}</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
