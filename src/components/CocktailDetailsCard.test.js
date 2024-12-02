import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CocktailDetailsCard from "./CocktailDetailsCard";
import CocktailCategoryPill from "./CocktailCategoryPill";

// Mock the CocktailCategoryPill component
jest.mock("./CocktailCategoryPill", () => (props) => <div>{props.category}</div>);

describe("CocktailDetailsCard Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders all details correctly", () => {
    const mockProps = {
      id: "123",
      name: "Margarita",
      category: "Cocktail",
      container: "Cocktail Glass",
      instructions: "Shake with ice and serve.",
      image: "/margarita.jpg",
      ingredients: [
        { measurement: "1 oz", name: "Tequila" },
        { measurement: "1 oz", name: "Triple Sec" },
      ],
    };

    render(<CocktailDetailsCard {...mockProps} />);

    // Check header
    expect(screen.getByText("Margarita")).toBeInTheDocument();

    // Check image
    const image = screen.getByAltText("Margarita");
    expect(image).toHaveAttribute("src", "/margarita.jpg");

    // Check category pill
    expect(screen.getByText("Cocktail")).toBeInTheDocument();

    // Check ingredients
    expect(screen.getByText("1 oz Tequila")).toBeInTheDocument();
    expect(screen.getByText("1 oz Triple Sec")).toBeInTheDocument();
    expect(screen.getByText("2 Ingredients")).toBeInTheDocument();

    // Check instructions
    expect(screen.getByText("Instructions")).toBeInTheDocument();
    expect(screen.getByText("Shake with ice and serve.")).toBeInTheDocument();

    // Check container
    expect(screen.getByText("Glass Needed")).toBeInTheDocument();
    expect(screen.getByText("Serve: Cocktail Glass")).toBeInTheDocument();

    // Check link
    expect(screen.getByText("http://localhost:3001/123")).toBeInTheDocument();
  });

  test("copies the link to clipboard and shows alert", () => {
    const mockClipboard = {
      writeText: jest.fn(),
    };
    global.navigator.clipboard = mockClipboard;

    const mockAlert = jest.fn();
    global.alert = mockAlert;

    const mockProps = {
      id: "123",
      name: "Margarita",
    };

    render(<CocktailDetailsCard {...mockProps} />);

    // Click the copy button
    const copyButton = screen.getByText("Copy");
    fireEvent.click(copyButton);

    // Verify clipboard write and alert
    expect(mockClipboard.writeText).toHaveBeenCalledWith("http://localhost:3001/123");
    expect(mockAlert).toHaveBeenCalledWith("Link copied to clipboard!");
  });
});
