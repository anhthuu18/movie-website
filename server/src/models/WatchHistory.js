import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const watchHistorySchema = new mongoose.Schema(
  {
    watchHistoryId: {
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
    progress: {
      type: Number, // Tiến độ xem (giây)
    },
    watchedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

watchHistorySchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

export const WatchHistory = mongoose.model("WatchHistory", watchHistorySchema);
