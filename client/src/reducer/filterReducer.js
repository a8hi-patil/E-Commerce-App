import { createRoutesFromElements } from "react-router-dom";

const filterReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_FILTER_PRODUCTS":
      return {
        ...state,
        filter_products: [...action.payload],
        all_products: [...action.payload],
      };

    case "SET_GRID_VIEW":
      return {
        ...state,
        grid_view: true,
      };
    case "SET_LIST_VIEW":
      return {
        ...state,
        grid_view: false,
      };



    case "SORTING_PRODUCTS":
      let newSortData;
      const { filter_products } = state;
      let tempSortproduct = [...filter_products];

      if (state.sorting_value === "a-z") {
        newSortData = tempSortproduct.sort((a, b) => {
          return a.name.localeCompare(b.name)
        })
      }
      if (state.sorting_value === "z-a") {
        newSortData = tempSortproduct.sort((a, b) => {
          return b.name.localeCompare(a.name)
        })
      }
      if (state.sorting_value === "lowest") {
        let sortingProducts = (a, b) => {
          return a.price - b.price

        }
        newSortData = tempSortproduct.sort(sortingProducts)
      }
      if (state.sorting_value === "highest") {
        let sortingProducts = (a, b) => {
          return b.price - a.price

        }
        newSortData = tempSortproduct.sort(sortingProducts)
      }

      return {
        ...state,
        filter_products: newSortData,
      };


    case "GET_SORT_VALUES":
      const userSortValue = document.getElementById("sort")
      let sort_value = userSortValue.options[userSortValue.selectedIndex].value;

      return {
        ...state,
        sorting_value: sort_value,
      };

    case "UPDATE_FILTERS_VALUES":
      const { name, value } = action.payload
      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value,
        }
      };


    case "FILTER_PRODUCTS":
      let { all_products } = state;
      let tempFilterProduct = [...all_products]
      const { text, category, company, color } = state.filters

      if (text) {
        tempFilterProduct = tempFilterProduct.filter((curElem) => {
          return curElem.name.toLowerCase().includes(text)
        })
      }
      if (category !== 'all') {

        tempFilterProduct = tempFilterProduct.filter((curElem) => {
          return curElem.category === category
        })
      }
      if (company !== 'all') {
        tempFilterProduct = tempFilterProduct.filter((curElem) => {
          return curElem.company.toLowerCase() === company.toLowerCase()
        })

      }
      if (color !== 'all') {

        tempFilterProduct = tempFilterProduct.filter((curElem) => {
          return curElem.colors.includes(color)
        })
      }

      return {
        ...state,
        filter_products: tempFilterProduct,
      }


    case "CLEAR_FILTERS":

      return {
        ...state,
        filters: {
          ...state.filter,
          text: "",
          category: 'all',
          company: "all",
          color: "all"

        }
      };

    default:
      return state;
  }
};

export default filterReducer;
