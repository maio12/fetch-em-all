import React, {useState, useEffect, useContext} from "react";
import {Table, Tag} from "antd";
import {ColumnsType} from "antd/es/table";
import {GlobalContext} from "../../context/GlobalContext";

import CustomPagination from "../Pagination/Pagination";

const myObj: Record<string, unknown>;

export interface DisplayPokemonsProps {
    l: boolean;
    d: myObj;
}

interface Pokemon {
    id: string;
    name: string;
    types: string[];
    classification: string;
}

const DisplayPokemons: React.SFC<DisplayPokemonsProps> = ({l, d}: DisplayPokemonsProps) => {
    let pokemons;
    let hasNextPage;
    let after;
    const {addAfter} = useContext(GlobalContext);
    const [afterL, setAfterL] = useState("");
    useEffect(() => {
        setAfterL(after);
    });
    const renderTagFunc = (types) => (
        <div>
            {types.map((type) => {
                return <Tag key={type}>{type.toUpperCase()}</Tag>;
            })}
        </div>
    );

    if (d) {
        if (d.hasOwnProperty("pokemonsByType")) {
            pokemons = d.pokemonsByType.edges;
            hasNextPage = d.pokemonsByType.pageInfo.hasNextPage;
            after = d.pokemonsByType.pageInfo.endCursor;
            if (!afterL && pokemons) {
                setAfterL(after);
                addAfter(after);
            }
        } else {
            pokemons = d.pokemons.edges;
            hasNextPage = d.pokemons.pageInfo.hasNextPage;
            after = d.pokemons.pageInfo.endCursor;
            if (!afterL && pokemons) {
                setAfterL(after);
                addAfter(after);
            }
        }
    }
    return l ? (
        <div>Loading Pokemons...</div>
    ) : (
        <>
            <Table<Pokemon>
                dataSource={pokemons.map((pokemon) => pokemon.node)}
                rowKey={(pokemons) => pokemons.id}
                className="results-table"
                pagination={false}
            >
                <Table.Column<Pokemon> key="name" title="Name" dataIndex="name" />
                <Table.Column<Pokemon>
                    key="classification"
                    title="Classification"
                    dataIndex="classification"
                />
                <Table.Column<Pokemon>
                    key="types"
                    title="Types"
                    dataIndex="types"
                    render={renderTagFunc}
                />
            </Table>
            <CustomPagination
                defaultCurrent={1}
                hideOnSinglePage={!hasNextPage}
                total={pokemons.length + 1}
                hasNextPage={hasNextPage}
            />
        </>
    );
};

export default DisplayPokemons;
