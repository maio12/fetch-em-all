import React from "react";
import PokemonsList from "./components/PokemonsList/PokemonsList";
import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";
import {GlobalProvider} from "./context/GlobalContext";
import "./App.less";

const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache()
});

const App: React.SFC<Record<string, never>> = () => {
    return (
        <ApolloProvider client={client}>
            <GlobalProvider>
                <div className="App">
                    <PokemonsList />
                </div>
            </GlobalProvider>
        </ApolloProvider>
    );
};

export default App;
