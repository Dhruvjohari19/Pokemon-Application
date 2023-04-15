import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { POKEMON_QUERY } from "../GraphQL/graphql";
import "../App.css";
import { useState } from "react";

function HomeScreen() {
  const { loading, error, data } = useQuery(POKEMON_QUERY);
  const [currentPage, setCurrentPage] = useState(0);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  // Determine the index range for the current page
  const startIndex = currentPage * 20;
  const endIndex = startIndex + 20;

  // Create a subset of the data to display on the current page
  const pokemonSubset = data.pokemons.slice(startIndex, endIndex);

  const handleTypeClick = (type) => {
    console.log(type);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <h2 style={{ marginTop: 70, fontFamily: "monospace", fontSize: 45 }}>
        Pokemon Application
      </h2>
      <div className="cards-container">
        {pokemonSubset.map((pokemon) => (
          <Link to={`/pokemon/${pokemon.id}`} key={pokemon.id}>
            <div className="card">
              <img src={pokemon.image} alt={pokemon.name} />
              <p style={{ color: "black" }}>#{pokemon.number}</p>
              <h2
                style={{
                  textAlign: "center",
                  marginLeft: 30,
                  color: "black",
                  fontFamily: "monospace",
                }}
              >
                {pokemon.name}
              </h2>
              <p style={{ textAlign: "center", marginLeft: 30 }}>
                {pokemon.types.map((type, index) => (
                  <button
                    style={{
                      height: "30px",
                      width: "80px",
                      borderRadius: "4px",
                      border: "none",
                      margin: "5px",
                      backgroundColor: "#4CAF50",
                      color: "white",
                      textDecoration: "none",
                      display: "inline-block",
                      cursor: "pointer",
                    }}
                    key={index}
                    onClick={() => handleTypeClick(type)}
                  >
                    {type}
                  </button>
                ))}
              </p>
            </div>
          </Link>
        ))}
      </div>
      {/* <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 0}>
          Prev
        </button>
        <button
          onClick={handleNextPage}
          disabled={endIndex >= data.pokemons.length}
        >
          Next
        </button>
      </div> */}
      <div className="pagination" style={{ textAlign: "center" }}>
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 0}
          style={{
            borderRadius: "4px",
            border: "none",
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "8px 16px",
            margin: "8px",
            marginTop: 50,
            width: 200,
          }}
        >
          Prev
        </button>
        <button
          onClick={handleNextPage}
          disabled={endIndex >= data.pokemons.length}
          style={{
            borderRadius: "4px",
            border: "none",
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "8px 16px",
            margin: "8px",
            marginTop: 50,
            width: 200,
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default HomeScreen;
