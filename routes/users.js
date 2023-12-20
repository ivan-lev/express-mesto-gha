const router = require("express").Router();

const {
  getUserList,
  getUserById,
  createUser,
} = require("../controllers/users");

router.get("/", getUserList);
router.get("/:userId", getUserById);
router.post("/", createUser);

module.exports = router;
