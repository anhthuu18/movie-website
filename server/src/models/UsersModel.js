import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";
import slug from "mongoose-slug-updater";

mongoose.plugin(slug);

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
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
    isLocked: {
      type: Boolean,
      default: false,
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

// Middleware để tự động tạo userId trước khi lưu
userSchema.pre('save', async function(next) {
  if (!this.userId) {
    // Format: USER_YYYYMMDD_XXXX (XXXX là số ngẫu nhiên 4 chữ số)
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(1000 + Math.random() * 9000); // Số ngẫu nhiên 4 chữ số
    this.userId = `USER_${year}${month}${day}_${random}`;
  }
  next();
});

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
userSchema.index({ userId: 1 }, { unique: true });

// Create model
const User = mongoose.model("User", userSchema);

// Drop and recreate indexes
User.collection
  .dropIndexes()
  .then(() => {
    console.log("Creating new indexes for:", Object.keys(userSchema.indexes()));
  })
  .catch((err) => {
    console.error("Error managing indexes:", err);
  });

export { User };
