import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";
import slug from "mongoose-slug-updater";

mongoose.plugin(slug);

const actorSchema = new mongoose.Schema(
  {
    actorId: {
      type: String,
      required: true,
      unique: true,
    },
    actorName: {
      type: String,
      required: true,
      maxlength: 100,
    },
    slug: {
      type: String,
      slug: "actorName",
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

actorSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

export const Actor = mongoose.model("Actor", actorSchema);
