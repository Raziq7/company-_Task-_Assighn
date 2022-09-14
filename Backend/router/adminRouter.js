import express from "express";
import {
  adminExcelAdd,
  adminExcelCashFlowFind,
  adminExcelExpensesFind,
  adminExcelResourceFind,
  adminTaskAsighn,
  adminTaskAsignDelete,
  adminTaskAsignFind,
  deletePro,
  LoginAdmin,
  registerAdmin,
  taskAsign,
  taskAsignFind,
  taskAsignOne,
  taskAsignProjectFind,
  taskStatusChange,
  userFind,
  userFindForAssighn,
  userRateDecrease,
  userRateIncrease,
  userRegister,
  userStatusChange,
} from "../controller/adminController.js";
import authenticateJWT from "../Middleware/jwtVerifying.js";

const router = express.Router();

//register Admin
router.route("/register").post(registerAdmin);

//Login Admin
router.route("/login").post(LoginAdmin);

//Admim User REGISTER
router.route("/userRegister").post(authenticateJWT, userRegister);

//Admim Task asign
router.route("/taskAsign").post(authenticateJWT, taskAsign);

//Admim Task asign One
router.route("/taskAsignOne").post(authenticateJWT, taskAsignOne);

// taskAsignFind
router.route("/taskAsignFind").get(authenticateJWT, taskAsignFind);

// taskAsignProjectFind
router
  .route("/taskAsignProjectFind")
  .get(authenticateJWT, taskAsignProjectFind);

//taskStatusChange
router.route("/taskStatusChange").post(authenticateJWT, taskStatusChange);

//userFind
router.route("/userFind").get(authenticateJWT, userFind);

//userFindForAssighn
router.route("/userFindForAssighn").get(authenticateJWT, userFindForAssighn);

//userStatus Change
router.route("/userStatusChange").post(authenticateJWT, userStatusChange);

// deletePro
router.route("/deletePro").delete(authenticateJWT, deletePro);

// userRateDecrease Decrease
router.route("/userRateDecrease").post(authenticateJWT, userRateDecrease);

//userRateIncrease
router.route("/userRateIncrease").post(authenticateJWT, userRateIncrease);

// adminTaskAsighn
router.route("/adminTaskAsighn").post(authenticateJWT, adminTaskAsighn);

// adminTaskAsignFind
router.route("/adminTaskAsignFind").get(authenticateJWT, adminTaskAsignFind);

// adminTaskAsignDelete
router
  .route("/adminTaskAsignDelete")
  .delete(authenticateJWT, adminTaskAsignDelete);

// adminExcelAdd
router.route("/adminExcelAdd").post(authenticateJWT, adminExcelAdd);

// adminExcelResourceFind
router
  .route("/adminExcelResourceFind")
  .get(authenticateJWT, adminExcelResourceFind);

  // adminExcelExpensesFind
  router
  .route("/adminExcelExpensesFind")
  .get(authenticateJWT, adminExcelExpensesFind);

  // adminExcelCashFlowFind
  router
  .route("/adminExcelCashFlowFind")
  .get(authenticateJWT, adminExcelCashFlowFind);

export default router;
