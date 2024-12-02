import React from "react";
import { render, screen } from "@testing-library/react";
import CocktailCategoryPill from "./CocktailCategoryPill";

describe("CocktailCategoryPill Component", () => {
  test("renders the component with the given category", () => {
    // Render the component with a sample category
    render(<CocktailCategoryPill category="Cocktail" />);

    // Check if the category is displayed
    expect(screen.getByText("Cocktail")).toBeInTheDocument();
  });
});
