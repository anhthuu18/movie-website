import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";
import slug from "mongoose-slug-updater";

mongoose.plugin(slug);

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["admin", "customer"],
      default: "customer",
    },
    slug: {
      type: String,
      slug: "username",
      unique: true,
    },
    searchHistory: {
      type: [String],
      default: [],
    },
    favoriteMovies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
      },
    ],
    watchedMovies: [
      {
        movieId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Movie",
        },
        progress: {
          type: Number,
          default: 0,
        },
        watchedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true, // Tự động thêm createdAt và updatedAt
  }
);

// Plugin for soft delete - Sẽ tự động thêm các trường:
// - deleted (boolean)
// - deletedAt (Date)
userSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

// Indexes
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ username: 1 }, { unique: true });
userSchema.index({ slug: 1 }, { unique: true });

// Create model
const User = mongoose.model("User", userSchema);

// Logging
console.log("=== User Model Initialization ===");
console.log("Current Date and Time (UTC):", "2025-05-06 08:47:13");
console.log("Current User:", "anhthuu18");

// Drop and recreate indexes
User.collection
  .dropIndexes()
  .then(() => {
    console.log("All indexes dropped successfully");
    console.log("Creating new indexes for:", Object.keys(userSchema.indexes()));
  })
  .catch((err) => {
    console.error("Error managing indexes:", err);
  });

export { User };
