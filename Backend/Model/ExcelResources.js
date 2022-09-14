import mongoose from "mongoose";

const ResourcesSchema = mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Link: {
      type: String,
      required: true,
    },
    adminId: {  type: String, required: true },
  },
  { timestamps: true }
);
export const Resources = mongoose.model("resource", ResourcesSchema);
