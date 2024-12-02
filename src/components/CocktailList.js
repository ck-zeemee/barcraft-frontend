import React, { useState, useEffect, useCallback } from "react";
import { fetchCocktails } from "../api/cocktailService";
import "./CocktailList.css";
import CocktailSearchCard from "./CocktailSearchCard";
import { useNavigate, useSearchParams } from 'react-router-dom';
import AppHeader from "./AppHeader";

const CocktailList = () => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const [cocktails, setCocktails] = useState([]);
  const [query, setQuery] = useState(searchParams.get("query") || "");
  const [currentPage, setCurrentPage] = useState(0)
  const [loading, setLoading] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentFilterQuery, setCurrentFilterQuery] = useState(false);

  const getCocktails = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchCocktails(currentPage, 6, query);
      setCocktails(data.drinks);
      setTotalRecords(data.totalCount);
    } catch (error) {
      console.error("Error fetching cocktails:", error);
    }
    /**
     * Temporary in order to simulate loading from deployed API
     */
    setTimeout(() => {
      setLoading(false);
      setCurrentFilterQuery(query);
      setSearchParams(params => {
        if (query) {
          params.set("query", query);
        } else {
          params.delete("query");
        }
        return params;
      });
    }, 300)
  }, [query, currentPage]);

  /**
   * Load cocktails on inital page load
   */
  useEffect(() => {
    getCocktails();
  }, [currentPage]);

  const handlePreviousClick = useCallback(() => {
    const prevPage = currentPage - 1 > 0 ? currentPage - 1 : 0;
    setCurrentPage(prevPage);
  }, [currentPage]);

  const handleQueryChange = useCallback((e) => {
    setCurrentPage(0);
    setQuery(e.target.value);
  }, []);

  const handleNextClick = useCallback(() => {
    /**
     * Need to add logic to ensure that next page can never be greater than
     * total number of pages
     */
    setCurrentPage(currentPage + 1);
  }, [currentPage]);

  const handleCardClick = useCallback((id) => {
    // Navigate to the details page for the selected cocktail
    console.log("Navigating");
    navigate(`/${id}${currentFilterQuery && `?query=${currentFilterQuery}`}`);
  }, [currentFilterQuery]);

  /**
   * Need to add logic and CSS for disabling buttons
   */
  const prevButtonDisabled = currentPage === 0;
  // const nextButtonDisabled = totalRecords && totalRecords / 6 > currentPage;

  return (
    <div>
        <AppHeader query={query} onQueryChange={handleQueryChange} onSearch={getCocktails} />
        <div className="cocktail-list-container">
            {loading ?
                <div className="spinner-container"><div className="spinner-icon" />Searching...</div> :
                <>
                    <div className="results-header-container">
                        <div className="query-description">{currentFilterQuery ? `Search: ${currentFilterQuery}` : "All Drinks"}</div>
                        <div>{totalRecords} result{totalRecords > 1 ? "s" : ""}</div>
                    </div>
                    <div className="cocktail-grid">
                        {cocktails.map((cocktail, idx) => (
                            <CocktailSearchCard
                                key={idx}
                                imgSrc={cocktail.image}
                                name={cocktail.name}
                                category={cocktail.category}
                                onClick={() => { handleCardClick(cocktail.id)}}
                            />
                        ))}
                    </div>
                    <footer className="pagination">
                        <button onClick={handlePreviousClick} aria-label="previous" disabled={prevButtonDisabled}><div className="previous-icon" /></button>
                        <button onClick={handleNextClick} aria-label="next"><div className="next-icon" /></button>
                    </footer>
                </>
            }
        </div>
    </div>
  );

};

export default CocktailList;
