import {gql} from "@apollo/client";

export const getPokemonsQuery = gql`
    query getPokemonsQuery($q: String!, $after: ID) {
        pokemons(q: $q, after: $after) {
            pageInfo {
                hasNextPage
                hasPreviousPage
                endCursor
                startCursor
            }
            edges {
                node {
                    name
                    id
                    types
                    classification
                }
            }
        }
    }
`;

export const getPokemonsByTypeQuery = gql`
    query getPokemonsByTypeQuery($type: String!, $after: ID) {
        pokemonsByType(type: $type, after: $after) {
            pageInfo {
                hasNextPage
                hasPreviousPage
                endCursor
                startCursor
            }
            edges {
                node {
                    name
                    id
                    types
                    classification
                }
            }
        }
    }
`;
