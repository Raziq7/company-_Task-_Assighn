import express from "express";
import {
  editProUser,
  imageUpload,
  userFindPro,
  userTaskFind,
} from "../controller/usersController.js";
import authenticateJWT from "../Middleware/jwtVerifying.js";

const router = express.Router();

router.route("/userTaskFind/").get(authenticateJWT, userTaskFind);

// userFind
router.route("/userFindPro").get(authenticateJWT, userFindPro);

// editProUser
router.route("/editProUser").put(authenticateJWT, editProUser);

// imageUpload
router.route("/imageUpload").put(authenticateJWT, imageUpload);

export default router;
