import React, { useState } from "react";
import styled from "styled-components";

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
`;

const SearchBar = styled.input`
  padding: 10px;
  margin-left: 15px;
  width: 300px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

const Card = styled.div`
  border: 1px solid #dddddd;
  border-radius: 4px;
  padding: 15px;
  margin: 10px;
  width: 200px;
  text-align: center;
`;

const ResetButton = styled.button`
  margin-left: 15px;
  padding: 10px 20px;
  background-color: #ff6347;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const SearchHeader = styled.h3`
  width: 100%;
  text-align: center;
`;

const ProductList = () => {
  const initialProducts = [
    { id: 1, name: "Product A", price: 20 },
    { id: 2, name: "Product B", price: 30 },
    { id: 3, name: "Product C", price: 25 },
    { id: 4, name: "Hello sample product", price: 25 },
    // Add more products as needed
  ];

  const [products, setProducts] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    // Update the searchQuery state with the current value of an input field when its content changes.
  };

  const handleReset = () => {
    setSearchQuery("");
    //  Reset the search input on clicking Reset button
  };

  // Filter products based on search input
  const filteredProducts = products.filter(
    (product) => {
      return product.name.toLowerCase().includes(searchQuery.toLowerCase());
    }
    // Filter products based on search input
  );

  return (
    <div>
      <Container>
        <SearchContainer>
          <SearchBar
            type="text"
            placeholder="Search by product name..."
            data-testid="search-input"
            onChange={handleSearch}
            value={searchQuery}
          />
          <ResetButton data-testid="reset-button" onClick={handleReset}>
            Reset
          </ResetButton>
        </SearchContainer>
      </Container>
      <Container>
        {searchQuery && filteredProducts.length > 0 && (
          <SearchHeader>Showing products for "{searchQuery}"</SearchHeader>
        )}
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Card key={product.id}>
              <p>{product.name}</p>
              <p>${product.price}</p>
            </Card>
          ))
        ) : (
          <p>No results found</p>
        )}
      </Container>
    </div>
  );
};

export default ProductList;
