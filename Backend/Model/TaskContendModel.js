import mongoose from "mongoose";

const ContentSchema = mongoose.Schema(
  {
    contentName: {
      type: String,
      required: true,
    },
    adminId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export const Content = mongoose.model("Content", ContentSchema);
