import asyncHandler from "express-async-handler";
import { Admin } from "../Model/AdminRegisterModel.js";
import {Task} from "../Model/TasksModel.js"



export const AdminDetailsFind = asyncHandler(async(req,res)=>{
    console.log("llllllllllllllllllllllllllll");
let adminDetails = await Admin.find({})
console.log(adminDetails,"adminDetails========================================raziq mr");
res.json(adminDetails)
})


export const superAdminUsersProject = asyncHandler(async(req,res)=>{
    const {id} = req.query
let userProjectDetails = await Task.find({myAdmin:id})
console.log(userProjectDetails,"userProjectDetails========================================raziq mr");
res.json(userProjectDetails)
})
