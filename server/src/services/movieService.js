import { Movie } from "../models/Movie.js";
import { MovieType } from "../models/MovieTypes.js";

class MovieService {
  validateMovieData(movieData) {
    const errors = [];
    // Required fields
    if (!movieData.title) {
      errors.push("Title is required");
    } else if (movieData.title.length > 200) {
      errors.push("Title must be less than 200 characters");
    }

    if (!movieData.description) {
      errors.push("Description is required");
    } else if (movieData.description.length > 2000) {
      errors.push("Description must be less than 2000 characters");
    }

    if (!movieData.releaseYear) {
      errors.push("Release year is required");
    } else {
      const year = parseInt(movieData.releaseYear);
      const currentYear = new Date().getFullYear();
      if (isNaN(year) || year < 1800 || year > currentYear + 5) {
        errors.push(`Release year must be between 1800 and ${currentYear + 5}`);
      }
    }

    if (!movieData.duration) {
      errors.push("Duration is required");
    } else {
      const duration = parseInt(movieData.duration);
      if (isNaN(duration) || duration <= 0 || duration > 1000) {
        errors.push("Duration must be between 1 and 1000 minutes");
      }
    }

    return errors;
  }

  async getAllMovies() {
    try {
      // Lấy movies mà không populate trước
      const movies = await Movie.find()
        .sort({ createdAt: -1 })
        .lean();

      return {
        success: true,
        data: {
          movies,
          count: movies.length,
        },
      };
    } catch (error) {
      console.error("Error in getAllMovies service:", error);
      throw new Error(error.message || "Error fetching movies");
    }
  }

  async createMovie(movieData, userId) {
    try {
      // Generate movieId
      const latestMovie = await Movie.findOne().sort({ movieId: -1 });
      const nextMovieNumber = latestMovie
        ? parseInt(latestMovie.movieId.slice(2)) + 1
        : 1;
      const movieId = `MV${String(nextMovieNumber).padStart(3, "0")}`;

      // Remove empty arrays to prevent validation errors
      const movieDataToSave = {
        ...movieData,
        movieId,
        createdBy: userId,
      };

      // Only include typeIds if it's not empty
      if (!movieData.typeIds || movieData.typeIds.length === 0) {
        delete movieDataToSave.typeIds;
      }

      // Only include directorIds if it's not empty
      if (!movieData.directorIds || movieData.directorIds.length === 0) {
        delete movieDataToSave.directorIds;
      }

      const newMovie = new Movie(movieDataToSave);
      const savedMovie = await newMovie.save();

      // Populate references if they exist
      const populateFields = ["createdBy"];
      if (savedMovie.typeIds && savedMovie.typeIds.length > 0) {
        populateFields.push("typeIds");
      }
      if (savedMovie.directorIds && savedMovie.directorIds.length > 0) {
        populateFields.push("directorIds");
      }

      const populatedMovie = await Movie.findById(savedMovie._id).populate(
        populateFields.map((field) => ({
          path: field,
          select: field === "createdBy" ? "username" : "name typeName",
        }))
      );
      
      return {
        success: true,
        message: "Movie created successfully",
        data: populatedMovie,
      };
    } catch (error) {
      console.error("Error in createMovie service:", error);
      throw new Error(error.message || "Error creating movie");
    }
  }

  async getMovieById(id) {
    try {
      // Tìm movie mà không populate trước
      const movie = await Movie.findOne({ movieId: id }).lean();

      if (!movie) {
        throw new Error("Movie not found");
      }
      return {
        success: true,
        data: movie,
      };
    } catch (error) {
      console.error("Error in getMovieById service:", error);
      throw new Error(error.message || "Error fetching movie");
    }
  }

  async deleteMovie(id) {
    try {
      // Tìm movie trước khi xóa
      const movie = await Movie.findOne({ movieId: id });
      
      if (!movie) {
        throw new Error("Movie not found");
      }

      // Thực hiện soft delete
      await movie.delete();

      return {
        success: true,
        message: "Movie deleted successfully"
      };
    } catch (error) {
      console.error("Error in deleteMovie service:", error);
      throw new Error(error.message || "Error deleting movie");
    }
  }

  async forceDeleteMovie(id) {
    try {
      const movie = await Movie.findOneWithDeleted({ movieId: id });
      
      if (!movie) {
        throw new Error("Movie not found");
      }

      // Xóa vĩnh viễn
      await Movie.deleteOne({ movieId: id });

      return {
        success: true,
        message: "Movie permanently deleted"
      };
    } catch (error) {
      console.error("Error in forceDeleteMovie service:", error);
      throw new Error(error.message || "Error deleting movie permanently");
    }
  }

  async restoreMovie(id) {
    try {
      const movie = await Movie.findOneWithDeleted({ movieId: id });
      
      if (!movie) {
        throw new Error("Movie not found");
      }

      if (!movie.deleted) {
        throw new Error("Movie is not in trash");
      }

      // Khôi phục phim
      await movie.restore();

      return {
        success: true,
        message: "Movie restored successfully"
      };
    } catch (error) {
      console.error("Error in restoreMovie service:", error);
      throw new Error(error.message || "Error restoring movie");
    }
  }

  async getDeletedMovies() {
    try {
      // Lấy danh sách phim đã xóa
      const movies = await Movie.findDeleted()
        .sort({ deletedAt: -1 })
        .lean();

      return {
        success: true,
        data: {
          movies,
          count: movies.length
        }
      };
    } catch (error) {
      console.error("Error in getDeletedMovies service:", error);
      throw new Error(error.message || "Error fetching deleted movies");
    }
  }
}

export default new MovieService();
