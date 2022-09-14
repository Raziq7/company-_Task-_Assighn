import asyncHandler from "express-async-handler";
import { Admin } from "../Model/AdminRegisterModel.js";
import { User } from "../Model/UserRegisterModel.js";
import generatorToken from "../Util/JwtTockenGenerate.js";
import { Task } from "../Model/TasksModel.js";
import mongoose from "mongoose";
import { Content } from "../Model/TaskContendModel.js";
import { Resources } from "../Model/ExcelResources.js";
import { Expenses } from "../Model/ExpensesModel.js";
import { CashFlow } from "../Model/CashFlowModel.js";

export const registerAdmin = asyncHandler(async (req, res) => {
  const { fName, lName, email, password } = req.body;
  let findAdmin = await Admin.findOne({ email });
  if (!findAdmin) {
    let isUserExist = await Admin.create({
      firstName: fName,
      lastName: lName,
      email,
      password,
      isAdmin: true,
      isSuperAdmin: false,
    });
    res.json({
      isUserExist: {
        _id: isUserExist._id,
        firstName: isUserExist.firstName,
        isSuperAdmin: isUserExist.isSuperAdmin,
        isAdmin: isUserExist.isAdmin,
      },
      Token: generatorToken(isUserExist),
    });
  } else {
    res.status(401);
    throw new Error("Already exist");
  }
});

export const LoginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  let isUserExist = await Admin.findOne({ email, password, isAdmin: true });
  if (isUserExist) {
    res.json({
      isUserExist: {
        _id: isUserExist._id,
        firstName: isUserExist.firstName,
        isSuperAdmin: isUserExist.isSuperAdmin,
        isAdmin: isUserExist.isAdmin,
      },
      Token: generatorToken(isUserExist),
    });
  } else {
    let isUserExist = await User.findOne({ email, password });
    if (isUserExist) {
      res.json({
        isUserExist: {
          _id: isUserExist._id,
          firstName: isUserExist.firstName,
          isSuperAdmin: isUserExist.isSuperAdmin,
          isAdmin: isUserExist.isAdmin,
        },
        Token: generatorToken(isUserExist),
      });
    } else {
      res.status(401);
      throw new Error("Invalid Password or Email");
    }
  }
});

export const userRegister = asyncHandler(async (req, res) => {
  const { name, email, password, phone, userID } = req.body;
  let Check = await User.findOne({ email, myAdmin: userID });
  if (!Check && Check == null) {
    console.log(
      Check,
      "userIDuserIDuserIDuserIDuserIDuserIDuserIDuserIDuserIDuserID"
    );
    let isUserExist = await User.create({
      name,
      email,
      password,
      phone,
      status: "Active",
      rate: 2.5,
      myAdmin: userID,
      isBlock: false,
      isAdmin: false,
      isSuperAdmin: false,
      image: "",
    });
    console.log(isUserExist, "isUserExistisUserExistisUserExistisUserExist");

    res.json(isUserExist);
  } else {
    res.status(401);
    throw new Error("This User Already Registered");
  }
});

export const taskAsign = asyncHandler(async (req, res) => {
  const {
    proName,
    type,
    value,
    summary,
    description,
    user,
    label,
    estimate,
    priority,
  } = req.body.value;
  // const user = req.body.user;
  const userID = req.body.userID;
  let userFind = await User.findById(user);

  console.log(
    proName,
    type,
    value,
    summary,
    description,
    user,
    label,
    estimate,
    priority,
    "hellooooooooooo"
  );
  let TaskConfirm = await Task.create({
    proName,
    type,
    value,
    myAdmin: userID,
    AssighnTasks: [
      {
        summary,
        description,
        user: userFind.name,
        userId: user,
        label,
        estimate,
        priority,
        status: "Back Logs",
      },
    ],
  });
  res.json(TaskConfirm);
});

//taskAsignOne
export const taskAsignOne = asyncHandler(async (req, res) => {
  console.log(req.body, "idididididididididididid");
  const { summary, label, estimate, priority, description, user, id } =
    req.body.value;
  const userID = req.body.userID;
  let userFind = await User.findById(user);

  console.log(
    summary,
    description,
    user,
    label,
    estimate,
    priority,
    id,
    "hellooooooooooo"
  );

  //DATE SETTING
  const secondsToMidnight = (n) => {
    return (
      (24 - n.getHours() - 1) * 60 * 60 +
      (60 - n.getMinutes() - 1) * 60 +
      (60 - n.getSeconds())
    );
  };

  let estiDate = new Date(estimate);
  const expiry = estiDate.getTime() + secondsToMidnight(estiDate) * 1000;

  let TaskConfirm = await Task.findByIdAndUpdate(
    { _id: id },
    {
      $push: {
        AssighnTasks: {
          summary,
          description,
          user: userFind.name,
          userId: user,
          label,
          estimate: expiry,
          priority,
          status: "Back Logs",
        },
      },
    }
  );
  console.log(TaskConfirm, "TaskConfirmTaskConfirmTaskConfirmTaskConfirm");
  res.json(TaskConfirm);
});

export const taskAsignFind = asyncHandler(async (req, res) => {
  const userID = req.query.id;
  let TaskConfirm = await Task.find({ myAdmin: userID });
  res.json(TaskConfirm);
});

export const taskAsignProjectFind = asyncHandler(async (req, res) => {
  const id = req.query.id;

  let TaskConfirm = await Task.findById({ _id: id });
  res.json(TaskConfirm);
});

export const taskStatusChange = asyncHandler(async (req, res) => {
  const { userID, status, id, index } = req.body;

  let TaskConfirm = await Task.findOne({ _id: id });

  TaskConfirm.AssighnTasks[index].status = status;
  TaskConfirm.save();

  res.json(TaskConfirm);
});

export const userFind = asyncHandler(async (req, res) => {
  const admin = req.query.id;
  let userConfirm = await User.find({ myAdmin: admin });

  res.json(userConfirm);
});

export const userFindForAssighn = asyncHandler(async (req, res) => {
  const admin = req.query.id;
  let userConfirm = await User.find({ myAdmin: admin, isBlock: false });

  res.json(userConfirm);
});

export const userStatusChange = asyncHandler(async (req, res) => {
  const { status, id, userID } = req.body;
  let isBlock = status === "Active" ? false : true;
  let TaskConfirm = await User.updateOne(
    { _id: id },
    {
      $set: {
        status: status,
        isBlock: isBlock,
      },
    }
  );
  res.json(TaskConfirm);
});

export const deletePro = asyncHandler(async (req, res) => {
  const { id } = req.query;
  let ProDelConfirm = await Task.deleteOne({ _id: id });
  res.json(ProDelConfirm);
});

export const userRateDecrease = asyncHandler(async (req, res) => {
  const { value, id, index, userId } = req.body;
  let TaskConfirm = await Task.findOne({ _id: id });
  TaskConfirm.AssighnTasks[index].status = value;
  TaskConfirm.save();
  let rateConfirm = await User.updateOne(
    { _id: userId },
    {
      $inc: {
        rate: -1,
      },
    }
  );

  res.json(rateConfirm);
});

export const userRateIncrease = asyncHandler(async (req, res) => {
  const { value, id, index, userId } = req.body;
  let TaskConfirm = await Task.findOne({ _id: id });
  TaskConfirm.AssighnTasks[index].status = value;
  TaskConfirm.save();
  let rateConfirm = await User.updateOne(
    { _id: userId },
    {
      $inc: {
        rate: 1,
      },
    }
  );

  res.json(rateConfirm);
});

export const adminTaskAsighn = asyncHandler(async (req, res) => {
  console.log(
    req.body,
    "adminTaskAsighn adminTaskAsighn adminTaskAsighn adminTaskAsighn adminTaskAsighn"
  );
  const { content, adminId } = req.body.obj;
  let TaskConfirm = await Content.findOne({
    contentName: content,
    adminId: adminId,
  });
  if (!TaskConfirm) {
    let rateConfirm = await Content.create({
      contentName: content,
      adminId: adminId,
    });
    res.json(rateConfirm);
  } else {
    throw new Error("This Task Name Already Exist");
  }
});

export const adminTaskAsignFind = asyncHandler(async (req, res) => {
  const { adminId } = req.query;
  let TaskConfirm = await Content.find({ adminId: adminId });

  res.json(TaskConfirm);
});

export const adminTaskAsignDelete = asyncHandler(async (req, res) => {
  const { id } = req.query;
  let TaskDeleteConfirm = await Content.deleteOne({ _id: id });
  res.json(TaskDeleteConfirm);
});

export const adminExcelAdd = asyncHandler(async (req, res) => {
  const { excel, excel1, excel2, excel3, excel4, excel5, excel6, adminId } =
    req.body;

  excel.map(async (data) => {
    let excelResourcesAdd = await Resources.create({
      Name: data.Name,
      Link: data.Link,
      adminId
    });
  });

  let excelpensesAdd = await Expenses.create({
    adminId,
    Month: excel3[0],
    OA_RelatedSubscriptions: {
      Actorio: excel3[2]["25"] === "Actorio" && excel3[2],
      Keepa: excel3[3]["25"] === "Keepa" && excel3[3],
      SellerAmp: excel3[4]["25"] === "SellerAmp" && excel3[4],
      SellerToolkit: excel3[5]["25"] === "Seller Toolkit" && excel3[5],
      BuyBotPro: excel3[6]["25"] === "BuyBotPro" && excel3[6],
      Repricer: excel3[7]["25"] === "Repricer" && excel3[7],
      AmazonSellerFee: excel3[8]["25"] === "Amazon Seller Fee" && excel3[8],
      VA: excel3[9]["25"] === "VA" && excel3[9],
      VAx3: excel3[10]["25"] === "VA x 3" && excel3[10],
      SubscriptionExpense12:
        excel3[11]["25"] === "Subscription Expense 12" && excel3[11],
      SubscriptionExpense13:
        excel3[12]["25"] === "Subscription Expense 13" && excel3[12],
      SubscriptionExpense14:
        excel3[13]["25"] === "Subscription Expense 14" && excel3[13],
      SubscriptionExpense15:
        excel3[14]["25"] === "Subscription Expense 15" && excel3[14],
    },
    Non_StockPurchases: {
      StationeryBoxesTapeEtc:
        excel3[16]["25"] === "Stationery, Boxes, Tape etc" && excel3[16],
      Wages: excel3[17]["25"] === "Wages" && excel3[17],
      VAWages: excel3[18]["25"] === "VA Wages" && excel3[18],
      Purchase4: excel3[19]["25"] === "Purchase 4" && excel3[19],
      Purchase5: excel3[20]["25"] === "Purchase 5" && excel3[20],
      Purchase6: excel3[21]["25"] === "Purchase 6" && excel3[21],
      Purchase7: excel3[22]["25"] === "Purchase 7" && excel3[22],
      Purchase8: excel3[23]["25"] === "Purchase 8" && excel3[23],
      Purchase9: excel3[24]["25"] === "Purchase 9" && excel3[24],
      Purchase10: excel3[25]["25"] === "Purchase 10" && excel3[25],
    },
    BusinessManagementExpenses: {
      AccountingTool_Xero_:
        excel3[27]["25"] === "Accounting Tool (Xero)" && excel3[27],
      LinkMyBooks: excel3[28]["25"] === "Link My Books" && excel3[28],
      BankCharges: excel3[29]["25"] === "Bank Charges" && excel3[29],
      Bookkeeper_AccountantFees:
        excel3[30]["25"] === "Bookkeeper/Accountant Fees" && excel3[30],
      BusinessExpense5: excel3[31]["25"] === "Business Expense 5" && excel3[31],
      BusinessExpense6: excel3[32]["25"] === "Business Expense 6" && excel3[32],
      BusinessExpense7: excel3[33]["25"] === "Business Expense 7" && excel3[33],
      BusinessExpense8: excel3[34]["25"] === "Business Expense 8" && excel3[34],
      BusinessExpense9: excel3[35]["25"] === "Business Expense 9" && excel3[35],
      BusinessExpense10:
        excel3[36]["25"] === "Business Expense 10" && excel3[36],
    },
    OtherBusinessExpenses: {
      Expense1: excel3[36]["25"] === "Expense 1" && excel3[38],
      Expense2: excel3[37]["25"] === "Expense 2" && excel3[39],
      Expense3: excel3[38]["25"] === "Expense 3" && excel3[40],
      Expense4: excel3[39]["25"] === "Expense 4" && excel3[41],
      Expense5: excel3[40]["25"] === "Expense 5" && excel3[42],
      Expense6: excel3[41]["25"] === "Expense 6" && excel3[43],
      Expense7: excel3[42]["25"] === "Expense 7" && excel3[44],
      Expense8: excel3[43]["25"] === "Expense 8" && excel3[45],
      Expense9: excel3[44]["25"] === "Expense 9" && excel3[46],
      Expense10: excel3[45]["25"] === "Expense 10" && excel3[47],
    },
    TOTALEXPENSESEACHMONTH: {
      TOTALEXPENSESEACHMONTH:
        excel3[48]["25"] === "TOTAL EXPENSES EACH MONTH" && excel3[48],
    },
  });

  console.log(excel4[0].__EMPTY_2, "kkkk");
  let month1 = excel4[0].__EMPTY_2;
  let month2 = excel4[0].__EMPTY_3;
  let month3 = excel4[0].__EMPTY_4;
  let month4 = excel4[0].__EMPTY_5;
  let month5 = excel4[0].__EMPTY_6;
  let month6 = excel4[0].__EMPTY_7;
  let month7 = excel4[0].__EMPTY_8;
  let month8 = excel4[0].__EMPTY_9;
  let month9 = excel4[0].__EMPTY_10;
  let month10 = excel4[0].__EMPTY_11;
  let month11 = excel4[0].__EMPTY_12;
  let month12 = excel4[0].__EMPTY_13;
  let month13 = excel4[0].__EMPTY_14;
  let month14 = excel4[0].__EMPTY_15;
  let month15 = excel4[0].__EMPTY_16;
  let month16 = excel4[0].__EMPTY_17;
  let month17 = excel4[0].__EMPTY_18;
  let month18 = excel4[0].__EMPTY_19;

  let Director1 = excel4[3].__EMPTY_2;
  let Director2 = excel4[3].__EMPTY_3;
  let Director3 = excel4[3].__EMPTY_4;
  let Director4 = excel4[3].__EMPTY_5;
  let Director5 = excel4[3].__EMPTY_6;
  let Director6 = excel4[3].__EMPTY_7;
  let Director7 = excel4[3].__EMPTY_8;
  let Director8 = excel4[3].__EMPTY_9;
  let Director9 = excel4[3].__EMPTY_10;
  let Director10 = excel4[3].__EMPTY_11;
  let Director11 = excel4[3].__EMPTY_12;
  let Director12 = excel4[3].__EMPTY_13;
  let Director13 = excel4[3].__EMPTY_14;
  let Director14 = excel4[3].__EMPTY_15;
  let Director15 = excel4[3].__EMPTY_16;
  let Director16 = excel4[3].__EMPTY_17;
  let Director17 = excel4[3].__EMPTY_18;
  let Director18 = excel4[3].__EMPTY_19;

  let topUp1 = excel4[5].__EMPTY_2;
  let topUp2 = excel4[5].__EMPTY_3;
  let topUp3 = excel4[5].__EMPTY_4;
  let topUp4 = excel4[5].__EMPTY_5;
  let topUp5 = excel4[5].__EMPTY_6;
  let topUp6 = excel4[5].__EMPTY_7;
  let topUp7 = excel4[5].__EMPTY_8;
  let topUp8 = excel4[5].__EMPTY_9;
  let topUp9 = excel4[5].__EMPTY_10;
  let topUp10 = excel4[5].__EMPTY_11;
  let topUp11 = excel4[5].__EMPTY_12;
  let topUp12 = excel4[5].__EMPTY_13;
  let topUp13 = excel4[5].__EMPTY_14;
  let topUp14 = excel4[5].__EMPTY_15;
  let topUp15 = excel4[5].__EMPTY_16;
  let topUp16 = excel4[5].__EMPTY_17;
  let topUp17 = excel4[5].__EMPTY_18;
  let topUp18 = excel4[5].__EMPTY_19;

  let Revenue1 = excel4[6].__EMPTY_2;
  let Revenue2 = excel4[6].__EMPTY_3;
  let Revenue3 = excel4[6].__EMPTY_4;
  let Revenue4 = excel4[6].__EMPTY_5;
  let Revenue5 = excel4[6].__EMPTY_6;
  let Revenue6 = excel4[6].__EMPTY_7;
  let Revenue7 = excel4[6].__EMPTY_8;
  let Revenue8 = excel4[6].__EMPTY_9;
  let Revenue9 = excel4[6].__EMPTY_10;
  let Revenue10 = excel4[6].__EMPTY_11;
  let Revenue11 = excel4[6].__EMPTY_12;
  let Revenue12 = excel4[6].__EMPTY_13;
  let Revenue13 = excel4[6].__EMPTY_14;
  let Revenue14 = excel4[6].__EMPTY_15;
  let Revenue15 = excel4[6].__EMPTY_16;
  let Revenue16 = excel4[6].__EMPTY_17;
  let Revenue17 = excel4[6].__EMPTY_18;
  let Revenue18 = excel4[6].__EMPTY_19;

  let ComingInTotal1 = excel4[7].__EMPTY_2;
  let ComingInTotal2 = excel4[7].__EMPTY_3;
  let ComingInTotal3 = excel4[7].__EMPTY_4;
  let ComingInTotal4 = excel4[7].__EMPTY_5;
  let ComingInTotal5 = excel4[7].__EMPTY_6;
  let ComingInTotal6 = excel4[7].__EMPTY_7;
  let ComingInTotal7 = excel4[7].__EMPTY_8;
  let ComingInTotal8 = excel4[7].__EMPTY_9;
  let ComingInTotal9 = excel4[7].__EMPTY_10;
  let ComingInTotal10 = excel4[7].__EMPTY_11;
  let ComingInTotal11 = excel4[7].__EMPTY_12;
  let ComingInTotal12 = excel4[7].__EMPTY_13;
  let ComingInTotal13 = excel4[7].__EMPTY_14;
  let ComingInTotal14 = excel4[7].__EMPTY_15;
  let ComingInTotal15 = excel4[7].__EMPTY_16;
  let ComingInTotal16 = excel4[7].__EMPTY_17;
  let ComingInTotal17 = excel4[7].__EMPTY_18;
  let ComingInTotal18 = excel4[7].__EMPTY_19;

  let goingOutFromExpens1 = excel4[9].__EMPTY_2;
  let goingOutFromExpens2 = excel4[9].__EMPTY_3;
  let goingOutFromExpens3 = excel4[9].__EMPTY_4;
  let goingOutFromExpens4 = excel4[9].__EMPTY_5;
  let goingOutFromExpens5 = excel4[9].__EMPTY_6;
  let goingOutFromExpens6 = excel4[9].__EMPTY_7;
  let goingOutFromExpens7 = excel4[9].__EMPTY_8;
  let goingOutFromExpens8 = excel4[9].__EMPTY_9;
  let goingOutFromExpens9 = excel4[9].__EMPTY_10;
  let goingOutFromExpens10 = excel4[9].__EMPTY_11;
  let goingOutFromExpens11 = excel4[9].__EMPTY_12;
  let goingOutFromExpens12 = excel4[9].__EMPTY_13;
  let goingOutFromExpens13 = excel4[9].__EMPTY_14;
  let goingOutFromExpens14 = excel4[9].__EMPTY_15;
  let goingOutFromExpens15 = excel4[9].__EMPTY_16;
  let goingOutFromExpens16 = excel4[9].__EMPTY_17;
  let goingOutFromExpens17 = excel4[9].__EMPTY_18;
  let goingOutFromExpens18 = excel4[9].__EMPTY_19;

  let ReinvestintoStock1 = excel4[11].__EMPTY_2;
  let ReinvestintoStock2 = excel4[11].__EMPTY_3;
  let ReinvestintoStock3 = excel4[11].__EMPTY_4;
  let ReinvestintoStock4 = excel4[11].__EMPTY_5;
  let ReinvestintoStock5 = excel4[11].__EMPTY_6;
  let ReinvestintoStock6 = excel4[11].__EMPTY_7;
  let ReinvestintoStock7 = excel4[11].__EMPTY_8;
  let ReinvestintoStock8 = excel4[11].__EMPTY_11;
  let ReinvestintoStock9 = excel4[11].__EMPTY_10;
  let ReinvestintoStock10 = excel4[11].__EMPTY_11;
  let ReinvestintoStock11 = excel4[11].__EMPTY_12;
  let ReinvestintoStock12 = excel4[11].__EMPTY_13;
  let ReinvestintoStock13 = excel4[11].__EMPTY_14;
  let ReinvestintoStock14 = excel4[11].__EMPTY_15;
  let ReinvestintoStock15 = excel4[11].__EMPTY_16;
  let ReinvestintoStock16 = excel4[11].__EMPTY_17;
  let ReinvestintoStock17 = excel4[11].__EMPTY_18;
  let ReinvestintoStock18 = excel4[11].__EMPTY_19;
  let CumulativeRevenueProjection1 = excel4[13].__EMPTY_2;
  let CumulativeRevenueProjection2 = excel4[13].__EMPTY_3;
  let CumulativeRevenueProjection3 = excel4[13].__EMPTY_4;
  let CumulativeRevenueProjection4 = excel4[13].__EMPTY_5;
  let CumulativeRevenueProjection5 = excel4[13].__EMPTY_6;
  let CumulativeRevenueProjection6 = excel4[13].__EMPTY_7;
  let CumulativeRevenueProjection7 = excel4[13].__EMPTY_8;
  let CumulativeRevenueProjection8 = excel4[13].__EMPTY_9;
  let CumulativeRevenueProjection9 = excel4[13].__EMPTY_10;
  let CumulativeRevenueProjection10 = excel4[13].__EMPTY_11;
  let CumulativeRevenueProjection11 = excel4[13].__EMPTY_12;
  let CumulativeRevenueProjection12 = excel4[13].__EMPTY_13;
  let CumulativeRevenueProjection13 = excel4[13].__EMPTY_14;
  let CumulativeRevenueProjection14 = excel4[13].__EMPTY_15;
  let CumulativeRevenueProjection15 = excel4[13].__EMPTY_16;
  let CumulativeRevenueProjection16 = excel4[13].__EMPTY_17;
  let CumulativeRevenueProjection17 = excel4[13].__EMPTY_18;
  let CumulativeRevenueProjection18 = excel4[13].__EMPTY_19;

  let excelResourcesAdd = await CashFlow.create({
    Month: {
      month1,
      month2,
      month3,
      month4,
      month5,
      month6,
      month7,
      month8,
      month9,
      month10,
      month11,
      month12,
      month13,
      month14,
      month15,
      month16,
      month17,
      month18,
    },
    DirectorsLoan_Capital: {
      Director1,
      Director2,
      Director3,
      Director4,
      Director5,
      Director6,
      Director7,
      Director8,
      Director9,
      Director10,
      Director11,
      Director12,
      Director13,
      Director14,
      Director15,
      Director16,
      Director17,
      Director18,
    },
    Top_up: {
      topUp1,
      topUp2,
      topUp3,
      topUp4,
      topUp5,
      topUp6,
      topUp7,
      topUp8,
      topUp9,
      topUp10,
      topUp11,
      topUp12,
      topUp13,
      topUp14,
      topUp15,
      topUp16,
      topUp17,
      topUp18,
    },
    Revenue: {
      Revenue1,
      Revenue2,
      Revenue3,
      Revenue4,
      Revenue5,
      Revenue6,
      Revenue7,
      Revenue8,
      Revenue9,
      Revenue10,
      Revenue11,
      Revenue12,
      Revenue13,
      Revenue14,
      Revenue15,
      Revenue16,
      Revenue17,
      Revenue18,
    },
    WhatsComingInTotal: {
      ComingInTotal1,
      ComingInTotal2,
      ComingInTotal3,
      ComingInTotal4,
      ComingInTotal5,
      ComingInTotal6,
      ComingInTotal7,
      ComingInTotal8,
      ComingInTotal9,
      ComingInTotal10,
      ComingInTotal11,
      ComingInTotal12,
      ComingInTotal13,
      ComingInTotal14,
      ComingInTotal15,
      ComingInTotal16,
      ComingInTotal17,
      ComingInTotal18,
    },
    WhatsGoingOutTotalfromEXPENSESsheet: {
      goingOutFromExpens1,
      goingOutFromExpens2,
      goingOutFromExpens3,
      goingOutFromExpens4,
      goingOutFromExpens5,
      goingOutFromExpens6,
      goingOutFromExpens7,
      goingOutFromExpens8,
      goingOutFromExpens9,
      goingOutFromExpens10,
      goingOutFromExpens11,
      goingOutFromExpens12,
      goingOutFromExpens13,
      goingOutFromExpens14,
      goingOutFromExpens15,
      goingOutFromExpens16,
      goingOutFromExpens17,
      goingOutFromExpens18,
    },
    WhatDoWeHaveLeftReinvestintoStock: {
      ReinvestintoStock1,
      ReinvestintoStock2,
      ReinvestintoStock3,
      ReinvestintoStock4,
      ReinvestintoStock5,
      ReinvestintoStock6,
      ReinvestintoStock7,
      ReinvestintoStock8,
      ReinvestintoStock9,
      ReinvestintoStock10,
      ReinvestintoStock11,
      ReinvestintoStock12,
      ReinvestintoStock13,
      ReinvestintoStock14,
      ReinvestintoStock15,
      ReinvestintoStock16,
      ReinvestintoStock17,
      ReinvestintoStock18,
    },
    CumulativeRevenueProjection: {
      CumulativeRevenueProjection1,
      CumulativeRevenueProjection2,
      CumulativeRevenueProjection3,
      CumulativeRevenueProjection4,
      CumulativeRevenueProjection5,
      CumulativeRevenueProjection6,
      CumulativeRevenueProjection7,
      CumulativeRevenueProjection8,
      CumulativeRevenueProjection9,
      CumulativeRevenueProjection10,
      CumulativeRevenueProjection11,
      CumulativeRevenueProjection12,
      CumulativeRevenueProjection13,
      CumulativeRevenueProjection14,
      CumulativeRevenueProjection15,
      CumulativeRevenueProjection16,
      CumulativeRevenueProjection17,
      CumulativeRevenueProjection18,
    },
    adminId,
  });

  console.log(excelResourcesAdd,"excelResourcesAddexcelResourcesAddexcelResourcesAddexcelResourcesAdd");

  res.json();
});

export const adminExcelResourceFind = asyncHandler(async (req, res) => {
  const { id } = req.query;
  let findResource = await Resources.find({ adminId: id });
  res.json(findResource);
});

export const adminExcelExpensesFind = asyncHandler(async (req, res) => {
  const { id } = req.query;
  let findExpenses = await Expenses.find({ adminId: id });
  res.json(findExpenses);
});

export const adminExcelCashFlowFind = asyncHandler(async (req, res) => {
  const { id } = req.query;
  let findCashFlow = await CashFlow.find({ adminId: id });
  res.json(findCashFlow);
});
