import React, { useCallback } from "react";
import "./CocktailDetailsCard.css";
import CocktailCategoryPill from "./CocktailCategoryPill";

const CocktailDetailsCard = (props) => {
    const {
        id,
        name = "",
        category = "",
        container = "",
        instructions = "",
        image = "",
        ingredients = [],
    } = props;

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(`http://localhost:3001/${id}`);
        alert("Link copied to clipboard!");
    }, []);

    return <div className="cocktail-details-card-container">
        <div className="cocktail-details-card-header">{name}</div>
        <div className="cocktail-details-card">
            <div className="cocktail-details-top-section">
                <div>
                    <img src={image} alt={name} className="cocktail-details-image" />
                    <CocktailCategoryPill category={category} />
                </div>
                <div>
                    <div className="ingredients-header">{ingredients.length} Ingredients</div>
                    <div className="ingredients-grid">
                        {ingredients.map((ing, idx) => (
                            <div key={idx}>{ing.measurement} {ing.name}</div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="cocktail-details-middle-section">
                <div className="cocktail-instructions-header">Instructions</div>
                <div className="cocktail-instructions">{instructions}</div>
                <div className="cocktail-instructions-header">Glass Needed</div>
                <div className="cocktail-instructions">Serve: {container}</div>
            </div>
            <div className="cocktail-details-bottom-section">
                <div className="copy-link-container">
                    <div className="link-display">http://localhost:3001/{id}</div>
                    <button className="copy-button" onClick={handleCopy}>
                        <div className="copy-icon" />
                        Copy
                    </button>
                </div>
            </div>
        </div>
    </div>;
}

export default CocktailDetailsCard;