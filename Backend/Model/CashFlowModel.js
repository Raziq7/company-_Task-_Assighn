import mongoose from "mongoose";

const CashFlowSchema = mongoose.Schema(
  {
    Month: {},
    DirectorsLoan_Capital: {},
    Top_up: {},
    Revenue: {},
    WhatsComingInTotal: {},
    WhatsGoingOutTotalfromEXPENSESsheet: {},
    WhatDoWeHaveLeftReinvestintoStock: {},
    CumulativeRevenueProjection: {},
    adminId: { type: String, required: true },
  },
  { timestamps: true }
);
export const CashFlow = mongoose.model("cashFlow", CashFlowSchema);
