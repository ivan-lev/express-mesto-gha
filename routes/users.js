// GET /users — возвращает всех пользователей
// GET /users/:userId - возвращает пользователя по _id
// POST /users — создаёт пользователя

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
