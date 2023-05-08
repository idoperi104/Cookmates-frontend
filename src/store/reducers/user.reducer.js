export const SET_USERS = "SET_USERS";
export const ADD_USER = "ADD_USER";
export const REMOVE_USER = "REMOVE_USER";
export const UPDATE_USER = "UPDATE_USER";
export const SET_LOGGEDIN_USER = "SET_LOGGEDIN_USER";

const INITIAL_STATE = {
  users: null,
  loggedinUser: null,
};

export function userReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.users,
      };
    case ADD_USER:
      return {
        ...state,
        users: [...state.users, action.user],
      };
    case REMOVE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.userId),
      };
    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === action.user._id ? action.user : user
        ),
      };
    case SET_LOGGEDIN_USER:
      return {
        ...state,
        loggedinUser: action.user,
      };

    default:
      return state;
  }
}
