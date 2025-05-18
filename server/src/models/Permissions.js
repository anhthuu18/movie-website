import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const permissionSchema = new mongoose.Schema(
  {
    permissionId: {
      type: String,
      required: true,
      unique: true, // Dùng String thay int để tránh xung đột
    },
    permissionName: {
      type: String,
      required: true,
      maxlength: 50,
    },
  },
  {
    timestamps: true,
  }
);

permissionSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

export const Permission = mongoose.model("Permission", permissionSchema);
