import { createStore } from "redux";

const characters = "characters";
const filterStudents = "filterStudents";
const filterStaff = "filterStaff";
const favoritesAdd = "favoritesAdd";
const favoriteDelete = "favoritesDelete";

const initialState = {
  characters: [],
  students: [],
  staff: [],
  favorites: [],
  showCharacters: null,
  showStudents: null,
  showStaff: null
}

const reducerAdd = (state = initialState, action) => {

  if (action.type === characters) {
    return {
      ...state,
      characters: action.data,
      showCharacters: true
    }
  }

  if(action.type === filterStudents) {
    return {
      ...state,
      students: action.data,
      showCharacters: false,
      showStudents: true,
      showStaff: false
    }
  }

  if(action.type === filterStaff) {
    return {
      ...state,
      staff: action.data,
      showCharacters: false,
      showStudents: false,
      showStaff: true
    }
  }

  if(action.type === favoritesAdd) {
    return {
      ...state,
      favorites: state.favorites.concat(action.data),
    }
  }

  if(action.type === favoriteDelete) {
    return {
      ...state,
      favorites: action.data
    }
  }
  
  return state
}

export default createStore(reducerAdd)