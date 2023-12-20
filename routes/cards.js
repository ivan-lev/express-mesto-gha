const router = require("express").Router();

const {
  getCardsList,
  createCard,
  deleteCard,
} = require("../controllers/cards");

router.get("/cards", getCardsList);
router.post("/cards", createCard);
router.delete("/cards/:cardId", deleteCard);

module.exports = router;
