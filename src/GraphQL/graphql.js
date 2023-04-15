import { gql } from "@apollo/client";

const POKEMON_QUERY = gql`
  query GetPokemon {
    pokemons(first: 150) {
      name
      image
      id
      height {
        minimum
        maximum
      }
      weight {
        minimum
        maximum
      }
      evolutions {
        id
        name
        image
        types
        number
        classification
        resistant
        weaknesses
        height {
          minimum
          maximum
        }
        weight {
          minimum
          maximum
        }
      }

      classification
      weaknesses
      types
      number
      resistant
    }
  }
`;

export { POKEMON_QUERY };
