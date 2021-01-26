import React, {useState, useEffect, useContext} from "react";
import {useQuery} from "@apollo/client";
import {getPokemonsQuery, getPokemonsByTypeQuery} from "../../queries/queries";
import {Table, Tag, Input, Pagination} from "antd";
import {ColumnsType} from "antd/es/table";
import {Menu, Dropdown, Row, Col} from "antd";
import {DownOutlined} from "@ant-design/icons";
import {POKEMON_TYPES} from "../../utils/pokemonTypes";
import DisplayPokemons from "../DisplayPokemons/DisplayPokemons";
import {GlobalContext} from "../../context/GlobalContext";

const PokemonsList: React.SFC<Record<string, never>> = () => {
    const [name, setName] = useState("");
    const [pokType, setType] = useState("");
    const {pageNum, clickDirection, after, setClickDirection} = useContext(GlobalContext);
    const {
        loading: loading_pokemons_name,
        error: error_pokemons_name,
        data: data_pokemons_name,
        fetchMore: fetch_more_pokemons_name
    } = useQuery(getPokemonsQuery, {
        variables: {q: name, after: ""}
    });
    const {
        loading: loading_pokemons_type,
        error: error_pokemons_type,
        data: data_pokemons_type,
        fetchMore: fetch_more_pokemons_types
    } = useQuery(getPokemonsByTypeQuery, {variables: {type: pokType, after: ""}});
    if (clickDirection) {
        if (clickDirection === "left") {
            let variables;
            if (name) {
                variables = {q: name, after: ""};
                fetch_more_pokemons_name({
                    query: getPokemonsQuery,
                    variables
                });
            }
            if (pokType) {
                variables = {type: pokType, after: ""};
                fetch_more_pokemons_types({
                    query: getPokemonsByTypeQuery,
                    variables
                });
            }
        }
        if (clickDirection == "right") {
            let variables;
            if (name) {
                variables = {q: name, after: after};
                fetch_more_pokemons_name({
                    query: getPokemonsQuery,
                    variables,
                    updateQuery: (prevResult, {fetchMoreResult}) => {
                        if (!fetchMoreResult) return prevResult;
                        return (data_pokemons_name = fetchMoreResult);
                    }
                });
            }
            if (pokType) {
                variables = {type: pokType, after: after};
                fetch_more_pokemons_types({
                    query: getPokemonsByTypeQuery,
                    variables,
                    updateQuery: (prevResult, {fetchMoreResult}) => {
                        if (!fetchMoreResult) return prevResult;
                        return (data_pokemons_type = fetchMoreResult);
                    }
                });
            }
        }
    }

    const menu = (
        <Menu>
            {Object.keys(POKEMON_TYPES).map((key) => {
                return (
                    <Menu.Item key={key}>
                        <a
                            onClick={(e) => {
                                setType(POKEMON_TYPES[key]);
                                setName("");
                                setClickDirection("");
                            }}
                        >
                            {POKEMON_TYPES[key]}
                        </a>
                    </Menu.Item>
                );
            })}
        </Menu>
    );

    return (
        <div>
            <Row className="input-group" align="bottom">
                <Col span={12}>
                    <Input
                        className="input-group__input"
                        placeholder="Search by Pokemon name"
                        onChange={(e) => {
                            if (pokType) {
                                setName(e.target.value);
                                setType("");
                                setClickDirection("");
                            } else {
                                setName(e.target.value);
                            }
                        }}
                    />
                </Col>
                <Col span={12}>
                    <Dropdown overlay={menu}>
                        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                            Filter Pokemons by Type <DownOutlined />
                        </a>
                    </Dropdown>
                </Col>
            </Row>
            {name ? <DisplayPokemons l={loading_pokemons_name} d={data_pokemons_name} /> : ""}

            {pokType ? <DisplayPokemons l={loading_pokemons_type} d={data_pokemons_type} /> : ""}
        </div>
    );
};

export default PokemonsList;
