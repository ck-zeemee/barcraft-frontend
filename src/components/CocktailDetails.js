import React, { useState, useEffect, useCallback } from "react";
import { fetchCocktailDetails } from "../api/cocktailService";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import AppHeader from "./AppHeader";
import CocktailDetailsCard from "./CocktailDetailsCard";
import "./CocktailDetails.css";

const CocktailDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [cocktail, setCocktail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(searchParams.get("query") || "");

  useEffect(() => {
    const getCocktailDetails = async () => {
      setLoading(true);
      try {
        const data = await fetchCocktailDetails(id);
        setCocktail(data.drinks[0]); // Assuming only one drink is returned
      } catch (error) {
        console.error("Error fetching cocktail details:", error);
      }
      setLoading(false);
    };

    getCocktailDetails();
  }, [id]);

  const handleQueryChange = useCallback((e) => {
    setQuery(e.target.value);
  }, []);

  const handleSearch = useCallback(() => {
    navigate(`/${query && `?query=${query}`}`);
  }, [query]);

  if (loading) return <p>Loading...</p>;
  if (!cocktail) return <p>No cocktail found!</p>;

  return (
    <div>
      <AppHeader query={query} onQueryChange={handleQueryChange} onSearch={handleSearch} />
      <div className="cocktail-details">
        <CocktailDetailsCard {...cocktail} />
      </div>
    </div>
  );
};

export default CocktailDetails;
