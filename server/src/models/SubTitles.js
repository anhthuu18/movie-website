import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const subTitleSchema = new mongoose.Schema(
  {
    subTitleId: {
      type: String,
      required: true,
      unique: true,
    },
    episodeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Episode",
      required: true,
    },
    language: {
      type: String,
      required: true,
      maxlength: 50, // Ví dụ: "English", "Vietnamese"
    },
    subtitleFileUrl: {
      type: String, // URL hoặc đường dẫn tới file phụ đề (SRT, VTT)
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

subTitleSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

export const SubTitle = mongoose.model("SubTitle", subTitleSchema);
