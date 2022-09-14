import React from "react";
import SideBar from "./component/SideBar";
import Home from "./Screen/Home";
import Login from "./Screen/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Screen/Register";
import UserManagment from "./Screen/UserManagment";
import { UserTabsComponent } from "./component/UserTabsComponent";
import DashBoard from "./Screen/DashBoard";
import MainProject from "./Screen/MainProject";
import "./app.css";
import Profile from "./Screen/UserSideComponent/Profile";
import SuperAdminTabs from "./component/SuperAdminTabs";
import TaskAsignContent from "./Screen/TaskAsignContent";
import Editprofile from "./Screen/UserSideComponent/Editprofile";
import AdminProfile from "./Screen/AdminProfile";
import ExcelSheet from "./Screen/Admin/ExcelSheet";

function App() {
  return (
    <div className="main">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <SideBar>
                <DashBoard />
              </SideBar>
            }
          />

          <Route
            path="/userManagment"
            element={
              <SideBar>
                <UserManagment />
              </SideBar>
            }
          />
          <Route
            path="/home"
            element={
              <SideBar>
                <MainProject />
              </SideBar>
            }
          />
          <Route
            path="/task/:id"
            element={
              <SideBar>
                <Home />
              </SideBar>
            }
          />
          <Route
            path="/taskContantAdd"
            element={
              <SideBar>
                <TaskAsignContent />
              </SideBar>
            }
          />
          <Route
            path="/admin/profile"
            element={
              <SideBar>
                <AdminProfile />
              </SideBar>
            }
          />
          
          <Route
            path="/admin/Excel"
            element={
              <SideBar>
                <ExcelSheet />
              </SideBar>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userHome" element={<UserTabsComponent />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/superAdmin" element={<SuperAdminTabs />} />
          <Route path="/userHome/editprofile/:id" element={<Editprofile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
