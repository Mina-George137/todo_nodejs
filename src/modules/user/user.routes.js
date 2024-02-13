const router = require("express").Router();
const {
  getAllUsers,
  addUser,
  getUserById,
  updateUser,
  deleteUser,
  register,
  login,
  logout,
} = require("./controller/user.controller");
const auth = require("../../middleware/auth");

router.route("/allUsers").get(getAllUsers);
router.post("/add", addUser);
router.route("/:id").get(auth(),getUserById).patch(auth(),updateUser).delete(auth(),deleteUser);
router.post("/register", register);
router.post("/login", login);
router.post("/logout",auth(), logout);

module.exports = router;
