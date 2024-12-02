import React from "react";
import "./CocktailSearchCard.css";
import CocktailCategoryPill from "./CocktailCategoryPill";

const CocktailSearchCard = (props) => {
    
    const {
        imgSrc = "",
        name = "Name",
        category = "Cocktail",
        onClick = () => {},
    } = props;

    return (
        <div onClick={onClick} className="cocktail-search-card-container">
            <img className="" src={imgSrc} alt={name} aria-label={name} />
            <div className="cocktail-search-card-details-container">
                <div className="cocktail-search-card-info">{name}</div>
                <CocktailCategoryPill category={category} />
            </div>
        </div>
    );
};

export default CocktailSearchCard;
