import React from "react";
import "./AppHeader.css";

const AppHeader = (props) => {
  const {
    query = "",
    onQueryChange = () => {},
    onSearch = () => {},
  } = props;

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onSearch(query);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <div className="header-container">
      <h1 className="header-left">BarCraft</h1>
      <div className="header-center">
        <div className="search-wrapper">
          <form className="search-container" onSubmit={handleSearch} aria-label="form">
            <div className="search-icon" />
            <input
              className="custom-search-input"
              type="text"
              placeholder="Search all drinks"
              value={query}
              onChange={onQueryChange}
              onKeyDown={handleKeyDown}
              aria-label="search-input"
            />
            <button type="submit" className="search-button">
              GO
            </button>
          </form>
        </div>
      </div>
      <div className="header-right" />
    </div>
  );
};

export default AppHeader;
