const router = require("express").Router();
// Import our controllers
const postRoutes = require("./postsController");
const userRoutes = require("./usersController");
const foodRoutes = require("./foodsController");
const nutritionRoutes = require("./nutritionController");

// Hook up to the router
router.use("/posts", postRoutes);
router.use("/users", userRoutes);
router.use("/foods", foodRoutes);
router.use("/nutrition", nutritionRoutes);

// Export the router
module.exports = router;
