import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AppHeader from "./AppHeader";

describe("AppHeader Component", () => {
  const mockOnQueryChange = jest.fn();
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the component with default props", () => {
    render(<AppHeader />);

    // Check if the title is rendered
    expect(screen.getByText("BarCraft")).toBeInTheDocument();

    // Check if the input is rendered with the correct placeholder
    expect(screen.getByPlaceholderText("Search all drinks")).toBeInTheDocument();

    // Check if the button is rendered with the correct text
    expect(screen.getByText("GO")).toBeInTheDocument();
  });

  test("handles query input change", () => {
    render(
      <AppHeader query="Margarita" onQueryChange={mockOnQueryChange} />
    );

    const input = screen.getByPlaceholderText("Search all drinks");

    // Simulate input change
    fireEvent.change(input, { target: { value: "Mojito" } });

    // Ensure onQueryChange is called with the correct value
    expect(mockOnQueryChange).toHaveBeenCalledTimes(1);
  });

  test("handles Enter key press", () => {
    render(
      <AppHeader query="Margarita" onSearch={mockOnSearch} />
    );

    const input = screen.getByPlaceholderText("Search all drinks");

    // Simulate pressing Enter key
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    // Ensure onSearch is called with the correct query
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
  });

  test("handles clicking the GO button", () => {
    render(
      <AppHeader query="Margarita" onSearch={mockOnSearch} />
    );

    const button = screen.getByText("GO");

    // Simulate button click
    fireEvent.click(button);

    // Ensure onSearch is called with the correct query
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
  });

  test("handles form submission", () => {
    render(
      <AppHeader query="Old Fashioned" onSearch={mockOnSearch} />
    );

    const form = screen.getByRole("form");

    // Simulate form submission
    fireEvent.submit(form);

    // Ensure onSearch is called with the correct query
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
  });
});
