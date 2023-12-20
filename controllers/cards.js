const Card = require("../models/card");

module.exports.getCardsList = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((error) =>
      res.status(500).send({ message: `Произошла ошибка: ${error}` })
    );
};

module.exports.createCard = (req, res) => {
  const { name, link, owner = req.user._id } = req.body;

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((error) =>
      res.status(500).send({ message: `Произошла ошибка: ${error}` })
    );
};

module.exports.deleteCard = (req, res) => {
  console.log(req.params.cardId);
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => res.send({ data: card }))
    .catch((error) =>
      res.status(500).send({ message: `Произошла ошибка: ${error}` })
    );
};
