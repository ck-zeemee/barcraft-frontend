import React from "react";
import "./CocktailCategoryPill.css";

const CocktailCategoryPill = (props) => {

    const { category } = props;

    return <div className="cocktail-category-pill-container">
        <div className="cocktail-category-pill-text">{category}</div>
    </div>;
}

export default CocktailCategoryPill;