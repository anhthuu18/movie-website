import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";
import slug from "mongoose-slug-updater";

mongoose.plugin(slug);

const movieSchema = new mongoose.Schema(
  {
    movieId: {
      type: String,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    releaseYear: {
      type: Number,
      required: true,
    },
    countryName: {
      type: String,
      default: "",
    },
    company: {
      type: String,
      default: "",
    },
    duration: {
      type: Number,
      required: true,
    },
    posterUrl: {
      type: String,
      default: "",
    },
    backdropUrl: {
      type: String,
      default: "",
    },
    ageRating: {
      type: String,
      default: "",
    },
    trailerUrl: {
      type: String,
      default: "",
    },
    slug: {
      type: String,
      slug: "title",
      unique: true,
    },
    typeIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MovieType",
        required: false,
      },
    ],
    directorIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Director",
        required: false,
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

movieSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

export const Movie = mongoose.model("movies", movieSchema);
