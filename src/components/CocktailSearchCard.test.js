import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CocktailSearchCard from "./CocktailSearchCard";
import CocktailCategoryPill from "./CocktailCategoryPill";

// Mock the CocktailCategoryPill component
jest.mock("./CocktailCategoryPill", () => (props) => <div>{props.category}</div>);

describe("CocktailSearchCard Component", () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the component with default props", () => {
    render(<CocktailSearchCard />);

    // Check for default image and alt text
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "");
    expect(img).toHaveAttribute("alt", "Name");

    // Check for default name
    expect(screen.getByText("Name")).toBeInTheDocument();

    // Check for default category
    expect(screen.getByText("Cocktail")).toBeInTheDocument();
  });

  test("renders the component with provided props", () => {
    render(
      <CocktailSearchCard
        imgSrc="/example.jpg"
        name="Margarita"
        category="Cocktail"
      />
    );

    // Check for provided image and alt text
    const img = screen.getByRole("img", { name: "Margarita" });
    expect(img).toHaveAttribute("src", "/example.jpg");
    expect(img).toHaveAttribute("alt", "Margarita");

    // Check for provided name
    expect(screen.getByText("Margarita")).toBeInTheDocument();

    // Check for provided category
    expect(screen.getByText("Cocktail")).toBeInTheDocument();
  });

  test("handles click events", () => {
    render(
      <CocktailSearchCard
        name="Margarita"
        onClick={mockOnClick}
      />
    );

    // Click the card
    const card = screen.getByText("Margarita");
    fireEvent.click(card);

    // Ensure onClick handler is called
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
