import { IResolvers } from "graphql-tools";
import * as pokemons from "./models/pokemons";

export const resolvers: IResolvers = {
  Query: {
    pokemons: (parent, args) => pokemons.query(args),
    pokemonsByType: (parent, args) => pokemons.query(args),
  },
};
