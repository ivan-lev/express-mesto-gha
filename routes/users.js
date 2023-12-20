const router = require("express").Router();

const {
  getUserList,
  getUserById,
  createUser,
  updateUserInfo,
  updateUserAvatar,
} = require("../controllers/users");

router.get("/", getUserList);
router.get("/:userId", getUserById);
router.post("/", createUser);
router.patch("/me", updateUserInfo);
router.patch("/me/avatar", updateUserAvatar);

module.exports = router;
