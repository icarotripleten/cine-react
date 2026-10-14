const router = require("express").Router();
const {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movies");
const auth = require("../middlewares/auth");
const authorize = require("../middlewares/authorize");
const { validarFilme, validarId } = require("../middlewares/validation");

router.get("/", getMovies);
router.get("/:id", validarId, getMovieById);

router.post("/", auth, authorize("admin"), validarFilme, createMovie);

router.put("/:id", auth, validarId, validarFilme, updateMovie);

router.delete("/:id", auth, authorize("admin"), validarId, deleteMovie);

module.exports = router;
