import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const episodeSchema = new mongoose.Schema(
  {
    episodeId: {
      type: String,
      required: true,
      unique: true,
    },
    seasonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Season",
      required: true,
    },
    episodeNumber: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
    },
    videoUrl: {
      type: String,
      maxlength: 255,
    },
    releaseDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["released", "unreleased"],
      default: "unreleased",
    },
  },
  {
    timestamps: true,
  }
);

episodeSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

export const Episode = mongoose.model("Episode", episodeSchema);
