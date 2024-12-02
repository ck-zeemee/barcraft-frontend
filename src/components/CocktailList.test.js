import React, { act } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CocktailList from "./CocktailList";
import * as cocktailService from "../api/cocktailService";

jest.mock("../api/cocktailService", () => ({
  fetchCocktails: jest.fn(),
}));

describe("CocktailList Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the loading state", async () => {
    // Mock API response
    cocktailService.fetchCocktails.mockResolvedValueOnce({
        drinks: [
        { id: "1", name: "Margarita", category: "Cocktail", image: "/margarita.jpg" },
        { id: "2", name: "Mojito", category: "Cocktail", image: "/mojito.jpg" },
        ],
        totalCount: 2,
    });

    render(
      <MemoryRouter>
        <CocktailList />
      </MemoryRouter>
    );

    expect(screen.getByText(/Searching.../i)).toBeInTheDocument();
  });

  test("renders cocktails after fetching data", async () => {
    // Mock API response
    cocktailService.fetchCocktails.mockResolvedValueOnce({
      drinks: [
        { id: "1", name: "Margarita", category: "Cocktail", image: "/margarita.jpg" },
        { id: "2", name: "Mojito", category: "Cocktail", image: "/mojito.jpg" },
      ],
      totalCount: 2,
    });

    render(
      <MemoryRouter>
        <CocktailList />
      </MemoryRouter>
    );

    // Wait for loading state to disappear
    await waitFor(() => expect(screen.queryByText(/Searching.../i)).not.toBeInTheDocument());

    // Check if cocktails are rendered
    expect(screen.getByText("Margarita")).toBeInTheDocument();
    expect(screen.getByText("Mojito")).toBeInTheDocument();
    expect(screen.getByText("2 results")).toBeInTheDocument();
  });

  test("handles search query input", async () => {
    // Mock API response
    cocktailService.fetchCocktails.mockResolvedValueOnce({
        drinks: [
            { id: "1", name: "Margarita", category: "Cocktail", image: "/margarita.jpg" },
        ],
        totalCount: 1,
    })
    .mockResolvedValueOnce({
        drinks: [
            { id: "1", name: "Margarita", category: "Cocktail", image: "/margarita.jpg" },
        ],
        totalCount: 10,
    });

    render(
      <MemoryRouter>
        <CocktailList />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/Search all drinks/i);
    fireEvent.change(input, { target: { value: "Margarita" } });

    expect(input.value).toBe("Margarita");
  });

  test("navigates to cocktail details on card click", async () => {
    // Mock API response
    cocktailService.fetchCocktails.mockResolvedValueOnce({
      drinks: [
        { id: "1", name: "Margarita", category: "Cocktail", image: "/margarita.jpg" },
      ],
      totalCount: 1,
    })
    .mockResolvedValueOnce({
        drinks: [
            { id: "1", name: "Margarita", category: "Cocktail", image: "/margarita.jpg" },
        ],
        totalCount: 10,
    });

    const mockNavigate = jest.fn();
    jest.mocked(require("react-router-dom").useNavigate).mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <CocktailList />
      </MemoryRouter>
    );

    // Wait for loading state to disappear
    await waitFor(() => expect(screen.queryByText(/Searching.../i)).not.toBeInTheDocument());

    // Click on the cocktail card
    const cocktailCard = screen.getByText("Margarita");
    fireEvent.click(cocktailCard);

    expect(mockNavigate).toHaveBeenCalledWith("/1");
  });

  test("handles pagination correctly", async () => {
    // Mock API response for first page
    cocktailService.fetchCocktails.mockResolvedValueOnce({
      drinks: [
        { id: "1", name: "Margarita", category: "Cocktail", image: "/margarita.jpg" },
      ],
      totalCount: 10,
    })
    .mockResolvedValueOnce({
        drinks: [
            { id: "1", name: "Margarita", category: "Cocktail", image: "/margarita.jpg" },
        ],
        totalCount: 10,
    });

    render(
      <MemoryRouter>
        <CocktailList />
      </MemoryRouter>
    );

    // Wait for loading state to disappear
    await waitFor(() => expect(screen.queryByText(/Searching.../i)).not.toBeInTheDocument());

    // Click "Next" button
    const nextButton = screen.getByRole("button", { name: /next/i });
    fireEvent.click(nextButton);

    expect(cocktailService.fetchCocktails).toHaveBeenCalledTimes(2);
  });
});
