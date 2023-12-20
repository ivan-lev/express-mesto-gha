const router = require("express").Router();

const {
  getUserList,
  getUserById,
  createUser,
} = require("../controllers/users");

router.get("/users", getUserList);
router.get("/users/:userId", getUserById);
router.post("/users", createUser);

module.exports = router;
