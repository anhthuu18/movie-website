import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";
import slug from "mongoose-slug-updater";

mongoose.plugin(slug);

const directorSchema = new mongoose.Schema(
  {
    directorId: {
      type: String,
      required: true,
      unique: true,
    },
    directorName: {
      type: String,
      required: true,
      maxlength: 100,
    },
    slug: {
      type: String,
      slug: "directorName",
      unique: true,
    },
    movieIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
      },
    ],
  },
  {
    timestamps: true,
  }
);

directorSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

export const Director = mongoose.model("Director", directorSchema);
