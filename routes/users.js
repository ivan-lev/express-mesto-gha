// GET /users — возвращает всех пользователей
// GET /users/:userId - возвращает пользователя по _id
// POST /users — создаёт пользователя

const { getUserList, getUser, createUser } = require("../controllers/users");

router.get("/users", getUserList);
router.get("/users/:userId", getUser);
router.post("/", createUser);
