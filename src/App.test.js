// ProductList.test.tsx

import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ProductList from "./components/ProductList";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";

describe("Product List Test", () => {
  it("should render and display products", () => {
    render(<ProductList />);

    // Check if the product cards are rendered
    const productA = screen.getByText("Product A");
    const productB = screen.getByText("Product B");
    const productC = screen.getByText("Product C");

    expect(productA).toBeInTheDocument();
    expect(productB).toBeInTheDocument();
    expect(productC).toBeInTheDocument();
  });

  it("should filter products based on search input", async () => {
    render(<ProductList />);

    // Type in the search input
    const searchInput = screen.getByTestId("search-input");
    fireEvent.change(searchInput, { target: { value: "Product A" } });

    // Check if only the matching product is displayed
    const productA = screen.getByText("Product A");
    expect(productA).toBeInTheDocument();

    // Check if other products are not displayed
    const productB = screen.queryByText("Product B");
    const productC = screen.queryByText("Product C");
    expect(productB).toBeNull();
    expect(productC).toBeNull();
  });

  it("should reset the search input on clicking Reset button", () => {
    render(<ProductList />);

    // Type in the search input
    const searchInput = screen.getByTestId("search-input");
    fireEvent.change(searchInput, { target: { value: "Product A" } });

    // Check if only the matching product is displayed
    const productA = screen.getByText("Product A");
    expect(productA).toBeInTheDocument();

    // Click the Reset button
    const resetButton = screen.getByTestId("reset-button");
    fireEvent.click(resetButton);

    // Check if all products are displayed again
    const productB = screen.getByText("Product B");
    const productC = screen.getByText("Product C");
    expect(productB).toBeInTheDocument();
    expect(productC).toBeInTheDocument();

    // Check if the search input is empty
    expect(searchInput).toHaveValue("");
  });

  it("should handle an empty search input", async () => {
    render(<ProductList />);

    // Check if all products are initially displayed
    const productA = screen.getByText("Product A");
    const productB = screen.getByText("Product B");
    const productC = screen.getByText("Product C");
    expect(productA).toBeInTheDocument();
    expect(productB).toBeInTheDocument();
    expect(productC).toBeInTheDocument();

    // Type an empty search input
    const searchInput = screen.getByTestId("search-input");
    fireEvent.change(searchInput, { target: { value: "" } });

    // Check if all products are still displayed
    expect(productA).toBeInTheDocument();
    expect(productB).toBeInTheDocument();
    expect(productC).toBeInTheDocument();
  });

  test('displays search header on valid search query', () => {
    // Render the ProductList component with some products
    render(<ProductList />);
  
    // Simulate a search event with a valid query
    const searchInput = screen.getByTestId("search-input");
    expect(screen.queryByText(/Showing products for/)).not.toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: "product" } });
  
    // Assert that the search header is displayed
    expect(screen.getByText(/Showing products for/)).toBeInTheDocument();
  });

  test('displays no search results on 0 search results', () => {
    // Render the ProductList component with some products
    render(<ProductList />);
  
    // Simulate a search event with a valid query
    const searchInput = screen.getByTestId("search-input");
    expect(screen.queryByText(/No results found/)).not.toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: "yvgbhujn" } });
  
    // Assert that the search header is displayed
    expect(screen.getByText(/No results found/)).toBeInTheDocument();
  });
});

