import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const commentSchema = new mongoose.Schema(
  {
    commentId: {
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
    content: {
      type: String,
      required: true,
      maxlength: 255,
    },
    parentCommentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment", // Tham chiếu đến chính Comment
      default: null, // Null nếu là bình luận gốc
    },
    isSpoiler: {
      type: Boolean,
      default: false,
    },
    isSpam: {
      type: Boolean,
      default: false,
    },
    spamScore: {
      type: Number,
      default: 0,
    },
    reportCount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["approved", "rejected"],
      default: "approved",
    },
  },
  {
    timestamps: true,
  }
);

commentSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

export const Comment = mongoose.model("Comment", commentSchema);
