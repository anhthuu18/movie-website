import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";
import slug from "mongoose-slug-updater";

mongoose.plugin(slug);

const categorySchema = new mongoose.Schema(
  {
    categoryId: {
      type: String,
      required: true,
      unique: true,
      maxlength: 20,
    },
    categoryName: {
      type: String,
      required: true,
      maxlength: 200,
    },
    slug: {
      type: String,
      slug: "categoryName",
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

categorySchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

export const Category = mongoose.model("Category", categorySchema);
