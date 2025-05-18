import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const skipIntroSchema = new mongoose.Schema(
  {
    introId: {
      type: String,
      required: true,
      unique: true,
    },
    episodeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Episode",
      required: true,
    },
    startTime: {
      type: Number, // Thời gian bắt đầu (giây)
      required: true,
    },
    endTime: {
      type: Number, // Thời gian kết thúc (giây)
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

skipIntroSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

export const SkipIntro = mongoose.model("SkipIntro", skipIntroSchema);
