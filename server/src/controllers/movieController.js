import MovieService from "../services/movieService.js";

class MovieController {
  // [GET] /api/v1/movie/list
  async getMovies(req, res) {
    try {
      const result = await MovieService.getAllMovies();
      res.status(200).json(result);
    } catch (error) {
      console.error("Error in getMovies controller:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Internal server error",
        error: process.env.NODE_ENV === "development" ? error.stack : undefined
      });
    }
  }

  // [POST] /api/v1/movie/create
  async createMovie(req, res) {
    try {
      const errors = MovieService.validateMovieData(req.body);
      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors,
        });
      }

      const result = await MovieService.createMovie(req.body, req.user._id);
      res.status(201).json(result);
    } catch (error) {
      console.error("Error in createMovie controller:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  // [GET] /api/v1/movie/:id
  async getMovieById(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Movie ID is required"
        });
      }

      const result = await MovieService.getMovieById(id);
      res.status(200).json(result);
    } catch (error) {
      console.error("Error in getMovieById controller:", error);
      res.status(error.message.includes("not found") ? 404 : 500).json({
        success: false,
        message: error.message || "Internal server error",
        error: process.env.NODE_ENV === "development" ? error.stack : undefined
      });
    }
  }

  // [DELETE] /api/v1/movie/delete/:id
  async deleteMovie(req, res) {
    try {
      const { id } = req.params;
      
      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Movie ID is required"
        });
      }

      const result = await MovieService.deleteMovie(id);
      res.status(200).json(result);
    } catch (error) {
      console.error("Error in deleteMovie controller:", error);
      res.status(error.message.includes("not found") ? 404 : 500).json({
        success: false,
        message: error.message || "Internal server error",
        error: process.env.NODE_ENV === "development" ? error.stack : undefined
      });
    }
  }

  // [DELETE] /api/v1/movie/force/:id
  async forceDeleteMovie(req, res) {
    try {
      const { id } = req.params;
      
      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Movie ID is required"
        });
      }

      const result = await MovieService.forceDeleteMovie(id);
      res.status(200).json(result);
    } catch (error) {
      console.error("Error in forceDeleteMovie controller:", error);
      res.status(error.message.includes("not found") ? 404 : 500).json({
        success: false,
        message: error.message || "Internal server error",
        error: process.env.NODE_ENV === "development" ? error.stack : undefined
      });
    }
  }

  // [PATCH] /api/v1/movie/restore/:id
  async restoreMovie(req, res) {
    try {
      const { id } = req.params;
      
      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Movie ID is required"
        });
      }

      const result = await MovieService.restoreMovie(id);
      res.status(200).json(result);
    } catch (error) {
      console.error("Error in restoreMovie controller:", error);
      res.status(error.message.includes("not found") ? 404 : 500).json({
        success: false,
        message: error.message || "Internal server error",
        error: process.env.NODE_ENV === "development" ? error.stack : undefined
      });
    }
  }

  // [GET] /api/v1/movie/trash
  async getDeletedMovies(req, res) {
    try {
      const result = await MovieService.getDeletedMovies();
      res.status(200).json(result);
    } catch (error) {
      console.error("Error in getDeletedMovies controller:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Internal server error",
        error: process.env.NODE_ENV === "development" ? error.stack : undefined
      });
    }
  }
}

export default new MovieController();
