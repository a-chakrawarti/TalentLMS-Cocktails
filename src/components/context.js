import React, { useState, useContext, useEffect } from "react";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("c");
  const [cocktails, setCocktails] = useState([]);
  const [singleCocktail, setSingleCocktail] = useState("");

  // Fetch data with searchTerm as query
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${url}${searchTerm}`);
        const data = await res.json();
        const { drinks } = data;
        if (drinks) {
          const newCocktails = drinks.map((item) => {
            const {
              idDrink,
              strDrink,
              strDrinkThumb,
              strAlcoholic,
              strGlass,
            } = item;

            // For better usability
            return {
              id: idDrink,
              name: strDrink,
              thumb: strDrinkThumb,
              info: strAlcoholic,
              glass: strGlass,
            };
          });
          setCocktails(newCocktails);
        } else {
          setCocktails([]);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [searchTerm]);

  // Fetch Individual cocktail data from id provided
  const fetchCocktailData = (id) => {
    const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";
    const getData = async (id) => {
      setLoading(true);
      try {
        const response = await fetch(`${url}${id}`);
        const data = await response.json();
        if (data.drinks) {
          const {
            strDrink: name,
            strDrinkThumb: img,
            strAlcoholic: info,
            strCategory: category,
            strGlass: glass,
            strInstructions: instructions,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          } = data.drinks[0];

          const ingredients = [
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          ];

          const newCocktail = {
            name,
            img,
            info,
            category,
            glass,
            instructions,
            ingredients,
          };
          setSingleCocktail(newCocktail);
        } else {
          setSingleCocktail(null);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    getData(id);
  };

  return (
    <AppContext.Provider
      value={{
        loading,
        cocktails,
        setSearchTerm,
        fetchCocktailData,
        singleCocktail,
      }}>
      {children}
    </AppContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
