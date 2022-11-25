import { createContext, useContext, useReducer, useEffect } from "react";
import { useProductContext } from "./productcontex";
import reducer from "../reducer/filterReducer";

const FilterContext = createContext();

const initialState = {
  filter_products: [],
  all_products: [],
  grid_view: true,
  sorting_value: "lowest",
  filters: {
    text: "",
    category: 'all',
    company: "all",
    color: "all"
  }
};

export const FilterContextProvider = ({ children }) => {
  const { products } = useProductContext();

  const [state, dispatch] = useReducer(reducer, initialState);

  // to set the grid view
  const setGridView = () => {
    return dispatch({ type: "SET_GRID_VIEW" });
  };

  // to set the list view
  const setListView = () => {
    return dispatch({ type: "SET_LIST_VIEW" });
  }

  // to sort by filter
  const sorting = () => {
    dispatch({ type: "GET_SORT_VALUES" })
  };

  //Update the filter values
  const updateFilterValue = (event) => {

    let name = event.target.name
    let value = event.target.value
    return dispatch({ type: "UPDATE_FILTERS_VALUES", payload: { name, value } })
  }

  //use effect for sort values
  useEffect(() => {
    dispatch({ type: "FILTER_PRODUCTS" })
    dispatch({ type: "SORTING_PRODUCTS", payload: products })
  }, [state.sorting_value, state.filters])


  // To clear the filter
  const clearFilters =() => {
    dispatch({type:"CLEAR_FILTERS"})
  }

  useEffect(() => {
    dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
  }, [products]);

  return (
    <FilterContext.Provider
      value={{ ...state, setGridView, setListView, sorting, updateFilterValue, clearFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};
