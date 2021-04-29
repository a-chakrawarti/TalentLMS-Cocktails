import React from "react";
import SearchForm from "./SearchForm";
import CocktailLists from "./CocktailList";

const Home = () => {
  return (
    <main>
      <SearchForm />
      <CocktailLists />
    </main>
  );
};

export default Home;
