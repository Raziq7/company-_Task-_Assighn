import mongoose from "mongoose";

const TaskSchema = mongoose.Schema(
  {
    proName: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    value: {
      type: Date,
      required: true,
    },
    myAdmin: {
      type: String,
      required: true,
    },

    AssighnTasks: [
      {
        summary: String,

        description: String,

        user: String,
        
        userId: String,

        label: String,

        estimate: Date,

        priority: String,

        status: String,
      },
    ],
  },
  { timestamps: true }
);
export const Task = mongoose.model("Task", TaskSchema);
