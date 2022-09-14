import axios from "axios";
import {
  EDIT_PROFILE_USER_ERR,
  EDIT_PROFILE_USER_REQUEST,
  EDIT_PROFILE_USER_SUCCESS,
  USER_FIND_ERR,
  USER_FIND_REQUEST,
  USER_FIND_SUCCESS,
  USER_IMAGE_UPLOAD_ERR,
  USER_IMAGE_UPLOAD_REQUEST,
  USER_IMAGE_UPLOAD_SUCCESS,
  USER_TASK_FIND_ERR,
  USER_TASK_FIND_REQUEST,
  USER_TASK_FIND_SUCCESS,
  USER_TASK_STATUS_CHANGE_ERR,
  USER_TASK_STATUS_CHANGE_REQUEST,
  USER_TASK_STATUS_CHANGE_SUCCESS,
} from "../constant/UserConstant";

export const usersTaskAsignFind = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_TASK_FIND_REQUEST });

    let userExit = localStorage.getItem("loginInfo")
      ? JSON.parse(localStorage.getItem("loginInfo"))
      : null;
    let userID = userExit.isUserExist._id;

    let { data } = await axios.get(`/api/users/userTaskFind/?id=${userID}`, {
      headers: {
        authorization: userExit.Token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: USER_TASK_FIND_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_TASK_FIND_ERR, payload: error });
  }
};

// userFindProfileAction
export const userFindProfileAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_FIND_REQUEST });

    let userExit = localStorage.getItem("loginInfo")
      ? JSON.parse(localStorage.getItem("loginInfo"))
      : null;
    let userID = userExit.isUserExist._id;

    let { data } = await axios.get(`/api/users/userFindPro/?id=${userID}`, {
      headers: {
        authorization: userExit.Token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    console.log(
      data,
      "userFinduserFinduserFinduserFinduserFinduserFinduserFind"
    );
    dispatch({ type: USER_FIND_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_FIND_ERR, payload: error });
  }
};

// EditFormDetails
export const EditFormDetailsAction = (obj) => async (dispatch, getState) => {
  try {
    dispatch({ type: EDIT_PROFILE_USER_REQUEST });

    let userExit = localStorage.getItem("loginInfo")
      ? JSON.parse(localStorage.getItem("loginInfo"))
      : null;
    let userID = userExit.isUserExist._id;
    let { data } = await axios.put(
      `/api/users/editProUser/?id=${userID}`,
      obj,
      {
        headers: {
          authorization: userExit.Token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    console.log(
      data,
      "userFinduserFinduserFinduserFinduserFinduserFinduserFind"
    );
    dispatch({ type: EDIT_PROFILE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: EDIT_PROFILE_USER_ERR, payload: error });
  }
};

// imageUploadUserAction
export const imageUploadUserAction = (Image) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_IMAGE_UPLOAD_REQUEST });
    alert(Image)
    console.log(Image,"filesfilesfilesfiles");
    let userExit = localStorage.getItem("loginInfo")
      ? JSON.parse(localStorage.getItem("loginInfo"))
      : null;
    let userID = userExit.isUserExist._id;
    let { data } = await axios.put(`/api/users/imageUpload/?id=${userID}`,{Image}, {
      headers: {
        authorization: userExit.Token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    console.log(
      data,
      "userFinduserFinduserFinduserFinduserFinduserFinduserFind"
    );
    dispatch({ type: USER_IMAGE_UPLOAD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_IMAGE_UPLOAD_ERR, payload: error });
  }
};

// //user task status change
// export const userTaskStatusChangeAction = (status,id)=>async(dispatch,getState) =>{
//    alert(id)
//     try{
//         dispatch({type:USER_TASK_STATUS_CHANGE_REQUEST})

//         let userExit = localStorage.getItem("loginInfo")
//         ? JSON.parse(localStorage.getItem("loginInfo"))
//         : null;
//         console.log(userExit.Token);
//         let userID = userExit.isUserExist._id
//         const obj ={
//             userID,status,id
//         }
//     let {data} = await axios.post("/api/users/userTaskStatusChange",obj,{
//         headers: {
//             'authorization':userExit.Token,
//             'Accept' : 'application/json',
//             'Content-Type': 'application/json'
//         }
//     })
// console.log(data,"datadatadatadatadata");

//      dispatch({type:USER_TASK_STATUS_CHANGE_SUCCESS,payload:data})

//     }catch(error){
//         dispatch({type:USER_TASK_STATUS_CHANGE_ERR,payload:error})

//     }

// }
