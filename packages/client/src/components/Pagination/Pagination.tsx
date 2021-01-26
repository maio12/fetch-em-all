import React, {useState, useContext} from "react";
import {GlobalContext} from "../../context/GlobalContext";
import {useQuery} from "@apollo/client";
import {getPokemonsQuery, getPokemonsByTypeQuery} from "../../queries/queries";
import {Pagination} from "antd";

export interface CustomPaginationProps {
    defaultCurrent: number;
    hideOnSinglePage: boolean;
    total: number;
    hasNextPage: boolean;
}

const CustomPagination: React.SFC<CustomPaginationProps> = ({
    defaultCurrent,
    hideOnSinglePage,
    total,
    hasNextPage
}: CustomPaginationProps) => {
    const {pageNum} = useContext(GlobalContext);
    const {changePage} = useContext(GlobalContext);
    const {setClickDirection} = useContext(GlobalContext);

    const checkClickDirection = (e) => {
        if (pageNum.length) {
            return pageNum[pageNum.length - 1] > pageNum[pageNum.length - 2]
                ? setClickDirection("left")
                : setClickDirection("right");
        } else {
            return;
        }
    };

    return (
        <Pagination
            defaultCurrent={defaultCurrent}
            total={total}
            onChange={(e) => {
                changePage(e);
                checkClickDirection(e);
            }}
        />
    );
};

export default CustomPagination;
