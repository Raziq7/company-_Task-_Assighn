import asyncHandler from "express-async-handler";
import { Task } from "../Model/TasksModel.js";
import { User } from "../Model/UserRegisterModel.js";

export const userTaskFind = asyncHandler(async (req, res) => {
  const userID = req.query.id;
  let findUserTask = await Task.find({ "AssighnTasks.userId": userID });
  res.json(findUserTask);
});

export const userFindPro = asyncHandler(async (req, res) => {
  const userID = req.query.id;
  console.log(userID, "findUserTaskfindUserTaskfindUserTaskfindUserTask");
  let findUserTask = await User.findById({ _id: userID });
  res.json(findUserTask);
});

export const editProUser = asyncHandler(async (req, res) => {
  const { name, email, password, newPassword } = req.body;
  const userID = req.query.id;

  let updateUserTask = await User.findById({ _id: userID });
  updateUserTask.name = name;
  updateUserTask.email = email;
  newPassword ? (updateUserTask.password = newPassword) : password;
  updateUserTask.save()
  res.json(updateUserTask)
});



export const imageUpload = asyncHandler(async (req, res) => {
  const { Image } = req.body;
  const userID = req.query.id;
  console.log(Image, "ImageImageImageImageImageImage");
  console.log(userID, "userIDuserIDuserIDuserID");


  let uploadImage = await User.findById({ _id: userID });
  uploadImage.image = Image;
  uploadImage.save()
  res.json(uploadImage)
});