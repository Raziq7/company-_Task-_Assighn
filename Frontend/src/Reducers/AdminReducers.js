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

export const RegisterAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        registerData: action.payload,
      };
    case ADMIN_REGISTER_ERR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

//TASK ASIGN
export const AdminTaskAsignReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_TASK_ASIGN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_TASK_ASIGN_SUCCESS:
      return {
        ...state,
        loading: false,
        TaskAsign: action.payload,
      };
    case ADMIN_TASK_ASIGN_ERR:
      return {
        ...state,
        loading: false,
        loading: action.payload,
      };
    default:
      return state;
  }
};

//TASK ASIGN AdminTaskAsignOneReducer
export const AdminTaskAsignOneReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_TASK_ASIGN_ONE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_TASK_ASIGN_ONE_SUCCESS:
      return {
        ...state,
        loading: false,
        TaskAsignOne: action.payload,
      };
    case ADMIN_TASK_ASIGN_ONE_ERR:
      return {
        ...state,
        loading: false,
        loading: action.payload,
      };
    default:
      return state;
  }
};

//TASK ASIGN Find documents
export const AdminTaskAsignFindReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_TASK_ASIGN_FIND_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_TASK_ASIGN_FIND_SUCCESS:
      return {
        ...state,
        loading: false,
        TaskAsignFind: action.payload,
      };
    case ADMIN_TASK_ASIGN_FIND_ERR:
      return {
        ...state,
        loading: false,
        loading: action.payload,
      };
    default:
      return state;
  }
};

//TASK ASIGN Find PROJECT documents
export const AdminTaskAsignProjectFindReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_TASK_ASIGN_PROJECT_FIND_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_TASK_ASIGN_PROJECT_FIND_SUCCESS:
      return {
        ...state,
        loading: false,
        TaskAsignProFind: action.payload,
      };
    case ADMIN_TASK_ASIGN_PROJECT_FIND_ERR:
      return {
        ...state,
        loading: false,
        loading: action.payload,
      };
    default:
      return state;
  }
};
//AdminLogin
export const AdminLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        Login: action.payload,
      };
    case ADMIN_LOGIN_ERR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

//AdminLogin
export const taskStatusChangeReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_TASK_ASIGN_STATUS_CHANGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_TASK_ASIGN_STATUS_CHANGE_SUCCESS:
      return {
        ...state,
        loading: false,
        statusChange: action.payload,
      };
    case ADMIN_TASK_ASIGN_STATUS_CHANGE_ERR:
      return {
        ...state,
        loading: false,
        loading: action.payload,
      };
    default:
      return state;
  }
};

//AdminLogin
export const userFindReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_USER_FIND_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_USER_FIND_SUCCESS:
      return {
        ...state,
        loading: false,
        showUser: action.payload,
      };
    case ADMIN_USER_FIND_ERR:
      return {
        ...state,
        loading: false,
        loading: action.payload,
      };
    default:
      return state;
  }
};

//AdminLogin
export const userFindForAssighnReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_USER_FIND_FOR_ASIGN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_USER_FIND_FOR_ASIGN_SUCCESS:
      return {
        ...state,
        loading: false,
        showUserForAsign: action.payload,
      };
    case ADMIN_USER_FIND_FOR_ASIGN_ERR:
      return {
        ...state,
        loading: false,
        loading: action.payload,
      };
    default:
      return state;
  }
};

//userRegisterAction
export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_USER_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        userInsert: action.payload,
      };
    case ADMIN_USER_REGISTER_ERR:
      return {
        ...state,
        loading: false,
        loading: action.payload,
      };
    default:
      return state;
  }
};

// userStatusChageReducer
export const userStatusChageReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_USER_STATUS_CHANGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_USER_STATUS_CHANGE_SUCCESS:
      return {
        ...state,
        loading: false,
        changeUserStatus: action.payload,
      };
    case ADMIN_USER_STATUS_CHANGE_ERR:
      return {
        ...state,
        loading: false,
        loading: action.payload,
      };
    default:
      return state;
  }
};

// DeleteProjectReducer
export const DeleteProjectReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_DELETE_PROJECT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        deletPro: action.payload,
      };
    case ADMIN_DELETE_PROJECT_ERR:
      return {
        ...state,
        loading: false,
        loading: action.payload,
      };
    default:
      return state;
  }
};

// userRateDecrementReducer
export const userRateDecrementReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_RATE_DECREASE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_RATE_DECREASE_SUCCESS:
      return {
        ...state,
        loading: false,
        rateDecrease: action.payload,
      };
    case USER_RATE_DECREASE_ERR:
      return {
        ...state,
        loading: false,
        loading: action.payload,
      };
    default:
      return state;
  }
};

// userRateIncrementReducer
export const userRateIncrementReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_RATE_INCREASE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_RATE_INCREASE_SUCCESS:
      return {
        ...state,
        loading: false,
        rateIncrease: action.payload,
      };
    case USER_RATE_INCREASE_ERR:
      return {
        ...state,
        loading: false,
        loading: action.payload,
      };
    default:
      return state;
  }
};

// adminTaskContentReducer
export const adminTaskContentReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_TASK_CONTENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_TASK_CONTENT_SUCCESS:
      return {
        ...state,
        loading: false,
        taskContentAdd: action.payload,
      };
    case ADMIN_TASK_CONTENT_ERR:
      return {
        ...state,
        loading: false,
        loading: action.payload,
      };
    default:
      return state;
  }
};
// adminTaskAsignFindReducer
export const adminTaskAsignFindReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_TASK_CONTENT_FIND_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_TASK_CONTENT_FIND_SUCCESS:
      return {
        ...state,
        loading: false,
        taskContentFind: action.payload,
      };
    case ADMIN_TASK_CONTENT_FIND_ERR:
      return {
        ...state,
        loading: false,
        loading: action.payload,
      };
    default:
      return state;
  }
};
// adminExcelResourceFindReducer
export const adminExcelResourceFindReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_EXCEL_SHEET_RESOURCE_FIND_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_EXCEL_SHEET_RESOURCE_FIND_SUCCESS:
      return {
        ...state,
        loading: false,
        excelResourceFind: action.payload,
      };
    case ADMIN_EXCEL_SHEET_RESOURCE_FIND_ERR:
      return {
        ...state,
        loading: false,
        loading: action.payload,
      };
    default:
      return state;
  }
};

// excelSheetAddReducer
export const excelSheetAddReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_EXCEL_SHEET_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_EXCEL_SHEET_SUCCESS:
      return {
        ...state,
        loading: false,
        excelSheetInsert: action.payload,
      };
    case ADMIN_EXCEL_SHEET_ERR:
      return {
        ...state,
        loading: false,
        loading: action.payload,
      };
    default:
      return state;
  }
};
// findExcelExpensesReducer
export const findExcelExpensesReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_EXCEL_SHEET_EXPENSES_FIND_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_EXCEL_SHEET_EXPENSES_FIND_SUCCESS:
      return {
        ...state,
        loading: false,
        excelExpenses: action.payload,
      };
    case ADMIN_EXCEL_SHEET_EXPENSES_FIND_ERR:
      return {
        ...state,
        loading: false,
        loading: action.payload,
      };
    default:
      return state;
  }
};

// adminExcelCashFlowFindReducer
export const adminExcelCashFlowFindReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_EXCEL_SHEET_CASH_FLOW_FIND_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_EXCEL_SHEET_CASH_FLOW_FIND_SUCCESS:
      return {
        ...state,
        loading: false,
        excelCashFlow: action.payload,
      };
    case ADMIN_EXCEL_SHEET_CASH_FLOW_FIND_ERR:
      return {
        ...state,
        loading: false,
        loading: action.payload,
      };
    default:
      return state;
  }
};

// AdminFindProfileReducer

export const AdminFindProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_PROFILE_DETAILS_FETCH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_PROFILE_DETAILS_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        adminProFind: action.payload,
      };
    case ADMIN_PROFILE_DETAILS_FETCH_ERR:
      return {
        ...state,
        loading: false,
        loading: action.payload,
      };
    default:
      return state;
  }
};
