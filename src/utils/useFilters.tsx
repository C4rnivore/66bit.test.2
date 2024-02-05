import React, { useContext, Dispatch } from "react";

export interface Filters{
    position: Array<string>;
    gender: Array<string>;
    stack: Array<string>;
    query: string;
}

const FiltersContext = React.createContext<{filters:Filters, setFilters:Dispatch<Filters>}>(null!)
export const FiltersProvider = FiltersContext.Provider

function useFilters() {
    const { filters, setFilters } = useContext(FiltersContext)
    return {filters, setFilters} 
}

export default useFilters;