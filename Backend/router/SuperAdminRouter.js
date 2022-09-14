import express from "express";
import { AdminDetailsFind, superAdminUsersProject } from "../controller/superAdminController.js";
import authenticateJWT  from "../Middleware/jwtVerifying.js"

const router = express.Router();


router.route("/").get(authenticateJWT,AdminDetailsFind)

// usersProject
router.route("/usersProject/").get(authenticateJWT,superAdminUsersProject)

export default router;