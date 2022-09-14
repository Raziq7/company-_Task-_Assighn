import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import {
  adminExcelCashFlowFindReducer,
  adminExcelResourceFindReducer,
  AdminLoginReducer,
  adminTaskAsignFindReducer,
  AdminTaskAsignFindReducer,
  AdminTaskAsignOneReducer,
  AdminTaskAsignProjectFindReducer,
  AdminTaskAsignReducer,
  adminTaskContentReducer,
  DeleteProjectReducer,
  excelSheetAddReducer,
  findExcelExpensesReducer,
  RegisterAdminReducer,
  taskStatusChangeReducer,
  userFindForAssighnReducer,
  userFindReducer,
  userRateDecrementReducer,
  userRateIncrementReducer,
  userRegisterReducer,
  userStatusChageReducer,
} from "./Reducers/AdminReducers";

// superAdminReducers
import {
  AdminFindReducer,
  AdminUserProductShowReducer,
} from "./Reducers/SuperAdminReducers";

//USER_REDUCERS
import {
  imageUploadUserReducer,
  userFindProfileReducer,
  usersTaskAsignFindReducer,
} from "./Reducers/UserReducers";

const appReducer = combineReducers({
  RegisterAdmin: RegisterAdminReducer,
  AdminTaskAsign: AdminTaskAsignReducer,
  AdminTaskAsignFind: AdminTaskAsignFindReducer,
  AdminLogin: AdminLoginReducer,
  taskStatusChange: taskStatusChangeReducer,
  userFind: userFindReducer,
  userFindForAssighn: userFindForAssighnReducer,
  userRegister: userRegisterReducer,
  userStatusChage: userStatusChageReducer,
  usersTaskAsignFind: usersTaskAsignFindReducer,
  AdminTaskAsignProjectFind: AdminTaskAsignProjectFindReducer,
  AdminTaskAsignOne: AdminTaskAsignOneReducer,
  DeleteProject: DeleteProjectReducer,
  userRateDecrement: userRateDecrementReducer,
  userRateIncrement: userRateIncrementReducer,
  AdminFind: AdminFindReducer,
  adminTaskContent: adminTaskContentReducer,
  adminTaskAsignFind: adminTaskAsignFindReducer,
  AdminUserProductShow: AdminUserProductShowReducer,
  userFindProfile: userFindProfileReducer,
  imageUploadUser: imageUploadUserReducer,
  adminExcelResourceFind: adminExcelResourceFindReducer,
  excelSheetAdd: excelSheetAddReducer,
  findExcelExpenses :findExcelExpensesReducer,
  adminExcelCashFlowFind : adminExcelCashFlowFindReducer
});

let Middleware = [thunk];

export const store = createStore(appReducer, applyMiddleware(...Middleware));
