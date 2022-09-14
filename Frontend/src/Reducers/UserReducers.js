import {
  USER_FIND_ERR,
  USER_FIND_REQUEST,
  USER_FIND_SUCCESS,
  USER_IMAGE_UPLOAD_ERR,
  USER_IMAGE_UPLOAD_REQUEST,
  USER_IMAGE_UPLOAD_SUCCESS,
  USER_TASK_FIND_ERR,
  USER_TASK_FIND_REQUEST,
  USER_TASK_FIND_SUCCESS,
} from "../constant/UserConstant";

//usersTaskAsignFindReducer
export const usersTaskAsignFindReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_TASK_FIND_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_TASK_FIND_SUCCESS:
      return {
        ...state,
        loading: false,
        userTask: action.payload,
      };
    case USER_TASK_FIND_ERR:
      return {
        ...state,
        loading: false,
        loading: action.payload,
      };
    default:
      return state;
  }
};

// userFindProfileReducer
export const userFindProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_FIND_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_FIND_SUCCESS:
      return {
        ...state,
        loading: false,
        userFind: action.payload,
      };
    case USER_FIND_ERR:
      return {
        ...state,
        loading: false,
        loading: action.payload,
      };
    default:
      return state;
  }
};

// imageUploadUserReducer
export const imageUploadUserReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_IMAGE_UPLOAD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_IMAGE_UPLOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        imageUpload: action.payload,
      };
    case USER_IMAGE_UPLOAD_ERR:
      return {
        ...state,
        loading: false,
        loading: action.payload,
      };
    default:
      return state;
  }
};
