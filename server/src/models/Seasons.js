import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const seasonSchema = new mongoose.Schema(
  {
    seasonId: {
      type: String,
      required: true,
      unique: true,
    },
    seasonNumber: {
      type: Number,
      required: true,
    },
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    totalEpisodes: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

seasonSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

export const Season = mongoose.model("Season", seasonSchema);
