import React, { useContext, Dispatch } from "react";

const FiltersContext = React.createContext<{filters:Array<string>, setFilters:Dispatch<Array<string>>}>(null!)
export const FiltersProvider = FiltersContext.Provider

function useFilters() {
    const { filters, setFilters } = useContext(FiltersContext)
    return {filters, setFilters} 
}

export default useFilters;