import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const watchListSchema = new mongoose.Schema(
  {
    watchListId: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    addedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

watchListSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

export const WatchList = mongoose.model("WatchList", watchListSchema);
