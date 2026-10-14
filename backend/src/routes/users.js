const router = require("express").Router();
const {
  getCurrentUser,
  getFavorites,
  addFavorite,
  removeFavorite,
} = require("../controllers/users");

router.get("/me", getCurrentUser);

router.get("/me/favorites", getFavorites);
router.put("/me/favorites/:movieId", addFavorite);
router.delete("/me/favorites/:movieId", removeFavorite);

module.exports = router;
