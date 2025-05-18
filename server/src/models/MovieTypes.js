import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";
import slug from "mongoose-slug-updater";

mongoose.plugin(slug);

const movieTypeSchema = new mongoose.Schema(
  {
    typeId: {
      type: String,
      required: true,
      unique: true,
    },
    typeName: {
      type: String,
      required: true,
      maxlength: 100,
    },
    slug: {
      type: String,
      slug: "typeName",
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

movieTypeSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

const MovieType = mongoose.model("MovieType", movieTypeSchema);

export default MovieType;
