import React from "react";

import { useGlobalContext } from "./context";

const SearchForm = () => {
  const { setSearchTerm } = useGlobalContext();

  return (
    <section className="section search">
      <div className="search-form">
        <div className="form-control">
          <label htmlFor="value">search your favourite cocktail</label>
          <input
            type="text"
            id="value"
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus></input>
        </div>
      </div>
    </section>
  );
};

export default SearchForm;
