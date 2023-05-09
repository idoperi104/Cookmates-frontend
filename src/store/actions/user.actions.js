import { userService } from "../../services/user.service";
import {
  REMOVE_USER,
  SET_USERS,
  SET_LOGGEDIN_USER,
  ADD_USER,
  UPDATE_USER,
} from "../reducers/user.reducer";

export function loadUsers() {
  return async (dispatch) => {
    try {
      const users = await userService.getUsers();
      const action = {
        type: SET_USERS,
        users,
      };
      dispatch(action);
    } catch (error) {
      console.log("error:", error);
    }
  };
}

export function removeUser(userId) {
  return async (dispatch) => {
    try {
      await userService.remove(userId);
      const action = { type: REMOVE_USER, userId };
      dispatch(action);
      return "Removed!";
    } catch (error) {
      console.log("error:", error);
    }
  };
}

export function updateUser(user) {
  console.log("user: ----", user);
  return async (dispatch) => {
    try {
      await userService.update(user);
      const action = { type: SET_LOGGEDIN_USER, user };
      dispatch(action);
    } catch (error) {
      console.log("error:", error);
    }
  };
}

export function toggleLike(recipeId) {
  return async (dispatch, getState) => {
    const loggedinUser = getState().userModule.loggedinUser;
    if (!loggedinUser) return;

    const likedIds = loggedinUser.likedRecipesIds || [];
    const idx = likedIds.findIndex((id) => id === recipeId);
    if (idx === -1) likedIds.push(recipeId);
    else likedIds.splice(idx, 1);

    const user = { ...loggedinUser, likedRecipesIds: likedIds }
    try {
      const action = { type: SET_LOGGEDIN_USER, user };
      dispatch(action);
      await userService.update(user);
      // const action = { type: UPDATE_USER, user };
      // dispatch(action);
    } catch (error) {
      console.log("error:", error);
    }
  };
}

export function login(userCred) {
  return async (dispatch) => {
    try {
      const user = await userService.login(userCred);
      const action = { type: SET_LOGGEDIN_USER, user };
      dispatch(action);
    } catch (error) {
      console.log("error:", error);
    }
  };
}

export function signup(userCred) {
  return async (dispatch) => {
    try {
      const user = await userService.signup(userCred);
      const action = { type: SET_LOGGEDIN_USER, user };
      dispatch(action);
      const action2 = { type: ADD_USER, user };
      dispatch(action2);
    } catch (error) {
      console.log("error:", error);
    }
  };
}

export function logout() {
  return async (dispatch) => {
    try {
      await userService.logout();
      const action = { type: SET_LOGGEDIN_USER, user: null };
      dispatch(action);
    } catch (error) {
      console.log("error:", error);
    }
  };
}

export function loadLoggedinUser() {
  return async (dispatch) => {
    try {
      const user = await userService.getLoggedinUser();
      const action = { type: SET_LOGGEDIN_USER, user: user };
      dispatch(action);
    } catch (error) {
      console.log("error:", error);
    }
  };
}
