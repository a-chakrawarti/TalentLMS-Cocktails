import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useGlobalContext } from "./context";
import Loading from "./Loading";

const SingleCocktail = () => {
  const { id } = useParams();
  const { loading, singleCocktail, fetchCocktailData } = useGlobalContext();

  useEffect(() => {
    fetchCocktailData(id);
  }, [id]);

  // console.log(singleCocktail);
  if (loading) {
    return <Loading />;
  }

  if (!singleCocktail) {
    return <h2 className="section-title">no cocktail to display</h2>;
  }

  const {
    name,
    img,
    category,
    info,
    glass,
    instructions,
    ingredients,
  } = singleCocktail;
  return (
    <section className="section cocktail-section">
      <Link to="/" className="btn btn-primary">
        back home
      </Link>
      <h2 className="section-title">{name}</h2>
      <div className="drink">
        <img src={img} alt={name} />
        <div className="drink-info">
          <p>
            <span className="drink-data">name: </span>
            {name}
          </p>
          <p>
            <span className="drink-data">category: </span>
            {category}
          </p>
          <p>
            <span className="drink-data">info: </span>
            {info}
          </p>
          <p>
            <span className="drink-data">glass: </span>
            {glass}
          </p>
          <p>
            <span className="drink-data">instructions: </span>
            {instructions}
          </p>
          <p>
            <span className="drink-data">ingredients: </span>
            {ingredients.map((item, index) => {
              return item ? <span key={index}>{item}</span> : null;
            })}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SingleCocktail;
