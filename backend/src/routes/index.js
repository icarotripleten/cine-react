
const router = require("express").Router();
const moviesRoutes = require("./movies");
const usersRoutes = require("./users");
const { createUser, login } = require("../controllers/users");
const auth = require("../middlewares/auth");
const { validarCadastro, validarLogin } = require("../middlewares/validation");
const { NotFoundError } = require("../errors");

router.post("/auth/signup", validarCadastro, createUser);
router.post("/auth/signin", validarLogin, login);

router.use("/movies", moviesRoutes);

router.use("/users", auth, usersRoutes);

router.use((req, res, next) => {
  next(new NotFoundError("Rota nao encontrada"));
});

module.exports = router;
