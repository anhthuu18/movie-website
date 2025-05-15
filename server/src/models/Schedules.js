import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const scheduleSchema = new mongoose.Schema(
  {
    scheduleId: {
      type: String,
      required: true,
      unique: true,
    },
    episodeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Episode",
      required: true,
    },
    scheduleDate: {
      type: Date,
    },
    scheduleTime: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

scheduleSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

export const Schedule = mongoose.model("Schedule", scheduleSchema);
