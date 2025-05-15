import express from "express";
import MovieController from "../controllers/movieController.js";

const router = express.Router();

// [GET] /api/v1/movie/list - Lấy danh sách phim
router.get("/list", MovieController.getMovies);

// [GET] /api/v1/movie/trash - Lấy danh sách phim đã xóa
router.get("/trash", MovieController.getDeletedMovies);

// [POST] /api/v1/movie/create - Tạo phim mới
router.post("/create", MovieController.createMovie);

// [PATCH] /api/v1/movie/restore/:id - Khôi phục phim đã xóa
router.patch("/restore/:id", MovieController.restoreMovie);

// [DELETE] /api/v1/movie/force/:id - Xóa phim vĩnh viễn
router.delete("/force/:id", MovieController.forceDeleteMovie);

// [DELETE] /api/v1/movie/delete/:id - Xóa phim (soft delete)
router.delete("/delete/:id", MovieController.deleteMovie);

// [GET] /api/v1/movie/:id - Lấy chi tiết phim
router.get("/:id", MovieController.getMovieById);

console.log("Movie routes registered");

export default router;
