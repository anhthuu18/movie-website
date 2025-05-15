import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const commentReportSchema = new mongoose.Schema(
  {
    reportId: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    commentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      required: true,
    },
    reason: {
      type: String, // Ví dụ: "Quảng cáo", "Nội dung không phù hợp"
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

commentReportSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

export const CommentReport = mongoose.model(
  "CommentReport",
  commentReportSchema
);
