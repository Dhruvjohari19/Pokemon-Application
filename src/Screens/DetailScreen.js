import { useState } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { POKEMON_QUERY } from "../GraphQL/graphql";

function DetailScreen() {
  const { id } = useParams();

  const [showModal, setShowModal] = useState(false);

  const { loading, error, data } = useQuery(POKEMON_QUERY, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const pokemon = data?.pokemons.find((p) => p.id === id);
  const { evolutions } = pokemon;

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div
      style={{
        backgroundColor: "#87CBB9",
        marginTop: 10,
        height: "100%",
        width: "60%",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <img
        style={{ marginTop: 10, height: "auto", maxWidth: "100%" }}
        src={pokemon?.image}
        alt={pokemon?.name}
      />
      <h2 style={{ margin: "10px 0" }}>{pokemon?.name}</h2>
      <p style={{ margin: "10px 0" }}>
        <b>Height:</b> {pokemon?.height?.minimum} - {pokemon?.height?.maximum}
      </p>
      <p style={{ margin: "10px 0" }}>
        <b>Weight:</b> {pokemon?.weight?.minimum} - {pokemon?.weight?.maximum}
      </p>
      <p style={{ margin: "10px 0" }}>
        <b>Classification:</b> {pokemon?.classification}
      </p>
      <p style={{ margin: "10px 0" }}>
        <b>Weaknesses:</b> {pokemon?.weaknesses?.join(", ")}
      </p>
    
    
      <p style={{ margin: "10px 0" }}>
        <b>Type: </b> <br></br>
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
          >
            {type}
          </button>
        ))}
      </p>

      {/* <p>Resistant: {pokemon?.resistant?.join(', ')}</p> */}
      <p style={{ margin: "10px 0" }}>
        <b>Resistant:</b>
      </p>
      <div>
        {pokemon?.resistant?.map((resist, index) => (
          <button
            key={index}
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
              margin: "10px 10px 10px 0",
            }}
          >
            {resist}
          </button>
        ))}
      </div>

      {/* popup */}

      <p style={{ margin: "10px 0" }}>
        <b>CLick to view Evolution of Pokemon:</b>
      </p>
      <button
        style={{
          height: "30px",
          width: "80px",
          borderRadius: "4px",
          border: "none",
          margin: "5px",
          backgroundColor: "#569DAA",
          color: "white",
          textDecoration: "none",
          display: "inline-block",
          cursor: "pointer",
          margin: "10px 0",
          width: 200,
        }}
        onClick={handleShowModal}
      >
        View Evolution 
      </button>
      {showModal && (
        <div
          className="modal"
          style={{
            display: "flex",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <div
            className="modal-content"
            style={{
              backgroundColor: "white",
              margin: "auto",
              padding: "20px",
              borderRadius: "5px",
              maxWidth: "60%",
              maxHeight: "90%",
              overflow: "auto",
            }}
          >
            <span
              className="close"
              style={{ float: "right", cursor: "pointer" }}
              onClick={() => handleCloseModal()}
            >
              &times;
            </span>
            <h3 style={{ margin: "10px 0" }}>Click to View Evolution</h3>
            {evolutions.map((evolution) => (
              <div key={evolution.id}>
                <p>Name: {evolution.name}</p>
                <img src={evolution.image} alt={evolution.name} />
                <p>Number: {evolution.number}</p>
                <p>Types: {evolution.types.join(", ")}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailScreen;
