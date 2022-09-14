import {
  SUPER_ADMIN_ADMIN_FIND_ERR,
  SUPER_ADMIN_ADMIN_FIND_REQUEST,
  SUPER_ADMIN_ADMIN_FIND_SUCCESS,
  SUPER_ADMIN_USERS_PROJECT_FIND_ERR,
  SUPER_ADMIN_USERS_PROJECT_FIND_REQUEST,
  SUPER_ADMIN_USERS_PROJECT_FIND_SUCCESS,
} from "../constant/superAdminConstant";

// super Admin Admin Find
export const AdminFindReducer = (state = {}, action) => {
  switch (action.type) {
    case SUPER_ADMIN_ADMIN_FIND_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SUPER_ADMIN_ADMIN_FIND_SUCCESS:
      return {
        ...state,
        loading: false,
        showAdmins: action.payload,
      };
    case SUPER_ADMIN_ADMIN_FIND_ERR:
      return {
        ...state,
        loading: false,
        loading: action.payload,
      };
    default:
      return state;
  }
};

// AdminUserProductShowReducer
export const AdminUserProductShowReducer = (state = {}, action) => {
  switch (action.type) {
    case SUPER_ADMIN_USERS_PROJECT_FIND_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SUPER_ADMIN_USERS_PROJECT_FIND_SUCCESS:
      return {
        ...state,
        loading: false,
        showUsersProject: action.payload,
      };
    case SUPER_ADMIN_USERS_PROJECT_FIND_ERR:
      return {
        ...state,
        loading: false,
        loading: action.payload,
      };
    default:
      return state;
  }
};
