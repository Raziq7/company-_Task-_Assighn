import axios from "axios";
import {
  ADMIN_DELETE_PROJECT_ERR,
  ADMIN_DELETE_PROJECT_REQUEST,
  ADMIN_DELETE_PROJECT_SUCCESS,
  ADMIN_EXCEL_SHEET_CASH_FLOW_FIND_ERR,
  ADMIN_EXCEL_SHEET_CASH_FLOW_FIND_REQUEST,
  ADMIN_EXCEL_SHEET_CASH_FLOW_FIND_SUCCESS,
  ADMIN_EXCEL_SHEET_ERR,
  ADMIN_EXCEL_SHEET_EXPENSES_FIND_ERR,
  ADMIN_EXCEL_SHEET_EXPENSES_FIND_REQUEST,
  ADMIN_EXCEL_SHEET_EXPENSES_FIND_SUCCESS,
  ADMIN_EXCEL_SHEET_REQUEST,
  ADMIN_EXCEL_SHEET_RESOURCE_FIND_ERR,
  ADMIN_EXCEL_SHEET_RESOURCE_FIND_REQUEST,
  ADMIN_EXCEL_SHEET_RESOURCE_FIND_SUCCESS,
  ADMIN_EXCEL_SHEET_SUCCESS,
  ADMIN_IMAGE_UPLOAD_ERR,
  ADMIN_IMAGE_UPLOAD_REQUEST,
  ADMIN_IMAGE_UPLOAD_SUCCESS,
  ADMIN_LOGIN_ERR,
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_PROFILE_DETAILS_FETCH_ERR,
  ADMIN_PROFILE_DETAILS_FETCH_REQUEST,
  ADMIN_PROFILE_DETAILS_FETCH_SUCCESS,
  ADMIN_REGISTER_ERR,
  ADMIN_REGISTER_REQUEST,
  ADMIN_REGISTER_SUCCESS,
  ADMIN_TASK_ASIGN_ERR,
  ADMIN_TASK_ASIGN_FIND_ERR,
  ADMIN_TASK_ASIGN_FIND_REQUEST,
  ADMIN_TASK_ASIGN_FIND_SUCCESS,
  ADMIN_TASK_ASIGN_ONE_ERR,
  ADMIN_TASK_ASIGN_ONE_REQUEST,
  ADMIN_TASK_ASIGN_ONE_SUCCESS,
  ADMIN_TASK_ASIGN_PROJECT_FIND_ERR,
  ADMIN_TASK_ASIGN_PROJECT_FIND_REQUEST,
  ADMIN_TASK_ASIGN_PROJECT_FIND_SUCCESS,
  ADMIN_TASK_ASIGN_REQUEST,
  ADMIN_TASK_ASIGN_STATUS_CHANGE_ERR,
  ADMIN_TASK_ASIGN_STATUS_CHANGE_REQUEST,
  ADMIN_TASK_ASIGN_STATUS_CHANGE_SUCCESS,
  ADMIN_TASK_ASIGN_SUCCESS,
  ADMIN_TASK_CONTENT_DELETE_ERR,
  ADMIN_TASK_CONTENT_DELETE_REQUEST,
  ADMIN_TASK_CONTENT_DELETE_SUCCESS,
  ADMIN_TASK_CONTENT_ERR,
  ADMIN_TASK_CONTENT_FIND_ERR,
  ADMIN_TASK_CONTENT_FIND_REQUEST,
  ADMIN_TASK_CONTENT_FIND_SUCCESS,
  ADMIN_TASK_CONTENT_REQUEST,
  ADMIN_TASK_CONTENT_SUCCESS,
  ADMIN_USER_FIND_ERR,
  ADMIN_USER_FIND_FOR_ASIGN_ERR,
  ADMIN_USER_FIND_FOR_ASIGN_REQUEST,
  ADMIN_USER_FIND_FOR_ASIGN_SUCCESS,
  ADMIN_USER_FIND_REQUEST,
  ADMIN_USER_FIND_SUCCESS,
  ADMIN_USER_REGISTER_ERR,
  ADMIN_USER_REGISTER_REQUEST,
  ADMIN_USER_REGISTER_SUCCESS,
  ADMIN_USER_STATUS_CHANGE_ERR,
  ADMIN_USER_STATUS_CHANGE_REQUEST,
  ADMIN_USER_STATUS_CHANGE_SUCCESS,
  USER_RATE_DECREASE_ERR,
  USER_RATE_DECREASE_REQUEST,
  USER_RATE_DECREASE_SUCCESS,
  USER_RATE_INCREASE_ERR,
  USER_RATE_INCREASE_REQUEST,
  USER_RATE_INCREASE_SUCCESS,
} from "../constant/AdminConstant";

export const RegisterAction = (value) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_REGISTER_REQUEST });
    // headers: {
    //   Authorization: `Bearer ${thunkApi.extra.jwt}`
    // }
    let { data } = await axios.post("/api/admin/register", value);

    dispatch({ type: ADMIN_REGISTER_SUCCESS, payload: data });

    localStorage.setItem("loginInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: ADMIN_REGISTER_ERR,
      payload: error.response.data.message,
    });
  }
};
//login
export const AdminLoginAction = (value) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_LOGIN_REQUEST });
    // headers: {
    //   Authorization: `Bearer ${thunkApi.extra.jwt}`
    // }
    let { data } = await axios.post("/api/admin/login", value);

    dispatch({ type: ADMIN_LOGIN_SUCCESS, payload: data });

    // console.log(data,"datadatadatadata");
    localStorage.setItem("loginInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({ type: ADMIN_LOGIN_ERR, payload: error.response.data.message });
  }
};

//assign Task
export const AdminTaskAsign = (value) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_TASK_ASIGN_REQUEST });

    let adminExit = localStorage.getItem("loginInfo")
      ? JSON.parse(localStorage.getItem("loginInfo"))
      : null;
    let userID = adminExit.isUserExist._id;
    const obj = {
      value,
      userID,
    };

    let { data } = await axios.post("/api/admin/taskAsign", obj, {
      headers: {
        authorization: adminExit.Token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: ADMIN_TASK_ASIGN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADMIN_TASK_ASIGN_ERR, payload: error });
  }
};

//AdminTaskAsignOne Action
export const AdminTaskAsignOneActin = (value) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_TASK_ASIGN_ONE_REQUEST });

    let adminExit = localStorage.getItem("loginInfo")
      ? JSON.parse(localStorage.getItem("loginInfo"))
      : null;
    let userID = adminExit.isUserExist._id;
    const obj = {
      value,
      userID,
    };

    let { data } = await axios.post("/api/admin/taskAsignOne", obj, {
      headers: {
        authorization: adminExit.Token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: ADMIN_TASK_ASIGN_ONE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_TASK_ASIGN_ONE_ERR,
      payload: error.response.data.error,
    });
  }
};

//assign find
export const taskAsignFindAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_TASK_ASIGN_FIND_REQUEST });

    let adminExit = localStorage.getItem("loginInfo")
      ? JSON.parse(localStorage.getItem("loginInfo"))
      : null;
    let userID = adminExit.isUserExist._id;
    let { data } = await axios.get(`/api/admin/taskAsignFind/?id=${userID}`, {
      headers: {
        authorization: adminExit.Token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: ADMIN_TASK_ASIGN_FIND_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_TASK_ASIGN_FIND_ERR,
      payload: error.response.data.error,
    });
  }
};

//assign taskAsignProjectFindAction
export const taskAsignProjectFindAction =
  (id) => async (dispatch, getState) => {
    try {
      dispatch({ type: ADMIN_TASK_ASIGN_PROJECT_FIND_REQUEST });

      let adminExit = localStorage.getItem("loginInfo")
        ? JSON.parse(localStorage.getItem("loginInfo"))
        : null;
      let userID = adminExit.isUserExist._id;
      let { data } = await axios.get(
        `/api/admin/taskAsignProjectFind/?id=${id}`,
        {
          headers: {
            authorization: adminExit.Token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data, "datadatadatadatadata");

      dispatch({ type: ADMIN_TASK_ASIGN_PROJECT_FIND_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: ADMIN_TASK_ASIGN_PROJECT_FIND_ERR, payload: error });
    }
  };

//admin task status change
export const taskStatusChangeAction =
  (status, id, index) => async (dispatch, getState) => {
    try {
      dispatch({ type: ADMIN_TASK_ASIGN_STATUS_CHANGE_REQUEST });

      let adminExit = localStorage.getItem("loginInfo")
        ? JSON.parse(localStorage.getItem("loginInfo"))
        : null;
      let userID = adminExit.isUserExist._id;
      const obj = {
        userID,
        status,
        id,
        index,
      };
      let { data } = await axios.post("/api/admin/taskStatusChange", obj, {
        headers: {
          authorization: adminExit.Token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      dispatch({ type: ADMIN_TASK_ASIGN_STATUS_CHANGE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: ADMIN_TASK_ASIGN_STATUS_CHANGE_ERR, payload: error });
    }
  };

//userFindAction
export const userFindAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_USER_FIND_REQUEST });

    let adminExit = localStorage.getItem("loginInfo")
      ? JSON.parse(localStorage.getItem("loginInfo"))
      : null;
    let userID = adminExit.isUserExist._id;

    let { data } = await axios.get(`/api/admin/userFind/?id=${userID}`, {
      headers: {
        authorization: adminExit.Token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: ADMIN_USER_FIND_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADMIN_USER_FIND_ERR, payload: error });
  }
};

//userFindAction
export const userFindForAssighnAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_USER_FIND_FOR_ASIGN_REQUEST });

    let adminExit = localStorage.getItem("loginInfo")
      ? JSON.parse(localStorage.getItem("loginInfo"))
      : null;
    let userID = adminExit.isUserExist._id;

    let { data } = await axios.get(
      `/api/admin/userFindForAssighn/?id=${userID}`,
      {
        headers: {
          authorization: adminExit.Token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({ type: ADMIN_USER_FIND_FOR_ASIGN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADMIN_USER_FIND_FOR_ASIGN_ERR, payload: error });
  }
};

//userFindAction
export const userRegisterAction =
  (details, phone) => async (dispatch, getState) => {
    const { name, email, password } = details;
    alert(name, email, password);

    try {
      dispatch({ type: ADMIN_USER_REGISTER_REQUEST });

      let adminExit = localStorage.getItem("loginInfo")
        ? JSON.parse(localStorage.getItem("loginInfo"))
        : null;
      let userID = adminExit.isUserExist._id;
      const obj = {
        name,
        email,
        phone,
        password,
        userID,
      };

      let { data } = await axios.post("/api/admin/userRegister", obj, {
        headers: {
          authorization: adminExit.Token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      dispatch({ type: ADMIN_USER_REGISTER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: ADMIN_USER_REGISTER_ERR, payload: error });
    }
  };

//userStatusChageAction

export const userStatusChageAction =
  (status, id) => async (dispatch, getState) => {
    try {
      dispatch({ type: ADMIN_USER_STATUS_CHANGE_REQUEST });

      let adminExit = localStorage.getItem("loginInfo")
        ? JSON.parse(localStorage.getItem("loginInfo"))
        : null;
      let userID = adminExit.isUserExist._id;
      const obj = {
        status,
        id,
        userID,
      };

      let { data } = await axios.post("/api/admin/userStatusChange", obj, {
        headers: {
          authorization: adminExit.Token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      dispatch({ type: ADMIN_USER_STATUS_CHANGE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: ADMIN_USER_STATUS_CHANGE_ERR, payload: error });
    }
  };

//DeleteProjectAction
export const DeleteProjectAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_DELETE_PROJECT_REQUEST });

    let adminExit = localStorage.getItem("loginInfo")
      ? JSON.parse(localStorage.getItem("loginInfo"))
      : null;

    let { data } = await axios.delete(`/api/admin/deletePro/?id=${id}`, {
      headers: {
        authorization: adminExit.Token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: ADMIN_DELETE_PROJECT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADMIN_DELETE_PROJECT_ERR, payload: error });
  }
};

//userRateDecrementAction
export const userRateDecrementAction =
  (value, id, index, userId) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_RATE_DECREASE_REQUEST });

      let adminExit = localStorage.getItem("loginInfo")
        ? JSON.parse(localStorage.getItem("loginInfo"))
        : null;
      const obj = {
        value,
        id,
        index,
        userId,
      };
      let { data } = await axios.post("/api/admin/userRateDecrease", obj, {
        headers: {
          authorization: adminExit.Token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      dispatch({ type: USER_RATE_DECREASE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: USER_RATE_DECREASE_ERR, payload: error });
    }
  };

//userRateDecrementAction
export const userRateIncrementAction =
  (value, id, index, userId) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_RATE_INCREASE_REQUEST });

      let adminExit = localStorage.getItem("loginInfo")
        ? JSON.parse(localStorage.getItem("loginInfo"))
        : null;
      const obj = {
        value,
        id,
        index,
        userId,
      };
      let { data } = await axios.post("/api/admin/userRateIncrease", obj, {
        headers: {
          authorization: adminExit.Token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      dispatch({ type: USER_RATE_INCREASE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: USER_RATE_INCREASE_ERR, payload: error });
    }
  };

// adminTaskAsighn
export const adminTaskContentAction =
  (content) => async (dispatch, getState) => {
    try {
      dispatch({ type: ADMIN_TASK_CONTENT_REQUEST });

      let adminExit = localStorage.getItem("loginInfo")
        ? JSON.parse(localStorage.getItem("loginInfo"))
        : null;

      const obj = {
        content,
        adminId: adminExit.isUserExist._id,
      };

      let { data } = await axios.post(
        "/api/admin/adminTaskAsighn",
        { obj },
        {
          headers: {
            authorization: adminExit.Token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({ type: ADMIN_TASK_CONTENT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: ADMIN_TASK_CONTENT_ERR, payload: error });
    }
  };

// adminTaskAsignFindAction
export const adminTaskAsignFindAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_TASK_CONTENT_FIND_REQUEST });

    let adminExit = localStorage.getItem("loginInfo")
      ? JSON.parse(localStorage.getItem("loginInfo"))
      : null;

    let { data } = await axios.get(
      `/api/admin/adminTaskAsignFind/?adminId=${adminExit.isUserExist._id}`,
      {
        headers: {
          authorization: adminExit.Token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({ type: ADMIN_TASK_CONTENT_FIND_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADMIN_TASK_CONTENT_FIND_ERR, payload: error });
  }
};
// deleteTaskAsignAction
export const deleteTaskAsignAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_TASK_CONTENT_DELETE_REQUEST });

    let adminExit = localStorage.getItem("loginInfo")
      ? JSON.parse(localStorage.getItem("loginInfo"))
      : null;

    let { data } = await axios.delete(
      `/api/admin/adminTaskAsignDelete/?id=${id}`,
      {
        headers: {
          authorization: adminExit.Token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({ type: ADMIN_TASK_CONTENT_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADMIN_TASK_CONTENT_DELETE_ERR, payload: error });
  }
};

// excelSheetAddAction
export const excelSheetAddAction =
  (excel, excel1, excel2, excel3, excel4, excel5, excel6) =>
  async (dispatch, getState) => {
    console.log(excel, excel1, excel2, excel3, excel4, excel5, excel6);

    try {
      dispatch({ type: ADMIN_EXCEL_SHEET_REQUEST });

      let adminExit = localStorage.getItem("loginInfo")
        ? JSON.parse(localStorage.getItem("loginInfo"))
        : null;
       const adminId = adminExit.isUserExist._id

      let { data } = await axios.post(
        "/api/admin/adminExcelAdd",
        { excel, excel1, excel2, excel3, excel4, excel5, excel6,adminId },
        {
          headers: {
            authorization: adminExit.Token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({ type: ADMIN_EXCEL_SHEET_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: ADMIN_EXCEL_SHEET_ERR, payload: error });
    }
  };

// adminExcelResourceFindAction
export const adminExcelResourceFindAction =
  () => async (dispatch, getState) => {
    try {
      dispatch({ type: ADMIN_EXCEL_SHEET_RESOURCE_FIND_REQUEST });

      let adminExit = localStorage.getItem("loginInfo")
        ? JSON.parse(localStorage.getItem("loginInfo"))
        : null;

      let { data } = await axios.get(`/api/admin/adminExcelResourceFind/?id=${adminExit.isUserExist._id}`, {
        headers: {
          authorization: adminExit.Token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      dispatch({
        type: ADMIN_EXCEL_SHEET_RESOURCE_FIND_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({ type: ADMIN_EXCEL_SHEET_RESOURCE_FIND_ERR, payload: error });
    }
  };

  // findExcelExpensesAction
  export const findExcelExpensesAction =
  () => async (dispatch, getState) => {
    try {
      dispatch({ type: ADMIN_EXCEL_SHEET_EXPENSES_FIND_REQUEST });

      let adminExit = localStorage.getItem("loginInfo")
        ? JSON.parse(localStorage.getItem("loginInfo"))
        : null;

      let { data } = await axios.get(`/api/admin/adminExcelExpensesFind/?id=${adminExit.isUserExist._id}`, {
        headers: {
          authorization: adminExit.Token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      dispatch({
        type: ADMIN_EXCEL_SHEET_EXPENSES_FIND_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({ type: ADMIN_EXCEL_SHEET_EXPENSES_FIND_ERR, payload: error });
    }
  };


  // adminExcelCashFlowFind
  export const adminExcelCashFlowFindAction =
  () => async (dispatch, getState) => {
    try {
      dispatch({ type: ADMIN_EXCEL_SHEET_CASH_FLOW_FIND_REQUEST });

      let adminExit = localStorage.getItem("loginInfo")
        ? JSON.parse(localStorage.getItem("loginInfo"))
        : null;

      let { data } = await axios.get(`/api/admin/adminExcelCashFlowFind/?id=${adminExit.isUserExist._id}`, {
        headers: {
          authorization: adminExit.Token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      dispatch({
        type: ADMIN_EXCEL_SHEET_CASH_FLOW_FIND_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({ type: ADMIN_EXCEL_SHEET_CASH_FLOW_FIND_ERR, payload: error });
    }
  };

  // AdminFindProfileAction
  export const AdminFindProfileAction =
  () => async (dispatch, getState) => {
    try {
      dispatch({ type: ADMIN_PROFILE_DETAILS_FETCH_REQUEST });

      let adminExit = localStorage.getItem("loginInfo")
        ? JSON.parse(localStorage.getItem("loginInfo"))
        : null;

      let { data } = await axios.get(`/api/admin/adminProfileFind/?id=${adminExit.isUserExist._id}`, {
        headers: {
          authorization: adminExit.Token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      dispatch({
        type: ADMIN_PROFILE_DETAILS_FETCH_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({ type: ADMIN_PROFILE_DETAILS_FETCH_ERR, payload: error });
    }
  };

  // imageUploadAdminAction
  export const imageUploadAdminAction = (Image) => async (dispatch, getState) => {
    try {
      dispatch({ type: ADMIN_IMAGE_UPLOAD_REQUEST });
      console.log(Image,"filesfilesfilesfiles");
      let adminExit = localStorage.getItem("loginInfo")
        ? JSON.parse(localStorage.getItem("loginInfo"))
        : null;

      let userID = adminExit.isUserExist._id;
      let { data } = await axios.put(`/api/admin/imageUploadAdmin/?id=${userID}`,{Image}, {
        headers: {
          authorization: adminExit.Token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      console.log(
        data,
        "userFinduserFinduserFinduserFinduserFinduserFinduserFind"
      );
      dispatch({ type: ADMIN_IMAGE_UPLOAD_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: ADMIN_IMAGE_UPLOAD_ERR, payload: error });
    }
  };