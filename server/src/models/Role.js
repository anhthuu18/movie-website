import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const roleSchema = new mongoose.Schema(
  {
    roleId: {
      type: String,
      required: true,
      unique: true,
      enum: ["admin", "customer"],
    },
    roleName: {
      type: String,
      required: true,
      maxlength: 20,
    },
    permissionIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Permission",
      },
    ],
  },
  {
    timestamps: true,
  }
);

roleSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

export const Role = mongoose.model("Role", roleSchema);
