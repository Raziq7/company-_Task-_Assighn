import mongoose from "mongoose";

const ExpansesSchema = mongoose.Schema(
  {
    adminId: {  type: String, required: true },
    Month:{},
    OA_RelatedSubscriptions: {},
    Non_StockPurchases: {},
    BusinessManagementExpenses: {},
    OtherBusinessExpenses: {},
    TOTALEXPENSESEACHMONTH: {},
  },
  { timestamps: true }
);
export const Expenses = mongoose.model("expanses", ExpansesSchema);
