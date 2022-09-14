import axios from "axios"
import {
  SUPER_ADMIN_ADMIN_FIND_ERR,
  SUPER_ADMIN_ADMIN_FIND_REQUEST,
  SUPER_ADMIN_ADMIN_FIND_SUCCESS,
  SUPER_ADMIN_USERS_PROJECT_FIND_ERR,
  SUPER_ADMIN_USERS_PROJECT_FIND_REQUEST,
  SUPER_ADMIN_USERS_PROJECT_FIND_SUCCESS,
} from "../constant/superAdminConstant";

export const AdminFindAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: SUPER_ADMIN_ADMIN_FIND_REQUEST });

    let superAdminExist = localStorage.getItem("loginInfo")
      ? JSON.parse(localStorage.getItem("loginInfo"))
      : null;
    console.log(superAdminExist.isUserExist._id);
    let userID = superAdminExist.isUserExist._id;

    let { data } = await axios.get("/api/superAdmin/", {
      headers: {
        authorization: superAdminExist.Token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: SUPER_ADMIN_ADMIN_FIND_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SUPER_ADMIN_ADMIN_FIND_ERR, payload: error });
  }
};

// AdminUserProductShowAction
export const AdminUserProductShowAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: SUPER_ADMIN_USERS_PROJECT_FIND_REQUEST });

    let superAdminExist = localStorage.getItem("loginInfo")
      ? JSON.parse(localStorage.getItem("loginInfo"))
      : null;
    console.log(superAdminExist.isUserExist._id);
    let userID = superAdminExist.isUserExist._id;

    let { data } = await axios.get(`/api/superAdmin/usersProject/?id=${id}`, {
      headers: {
        authorization: superAdminExist.Token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: SUPER_ADMIN_USERS_PROJECT_FIND_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SUPER_ADMIN_USERS_PROJECT_FIND_ERR, payload: error });
  }
};
