const Card = require('../models/card');

module.exports.getCardsList = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch((error) => {
      res.status(500).send({
        message: `Произошла ошибка получения карточек. Детали: ${error.message}`,
      });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link, owner = req.user._id } = req.body;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: card }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send({
          message: 'При создании карточки переданы невалидные данные.',
        });
      } else {
        res.status(500).send({
          message: `Произошла ошибка. Детали: ${error.message}`,
        });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete({ _id: req.params.cardId })
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((error) => {
      if (error.name === 'CastError') {
        res
          .status(400)
          .send({ message: 'Передан некорректный _id карточки для удаления' });
      } else if (error.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'Карточка с таким _id не найдена' });
      } else {
        res.status(500).send({ message: `Произошла ошибка. Детали: ${error}` });
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => {
      res.status(200).send({ data: card });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(400).send({ message: 'Передан некорректный _id карточки' });
      } else if (error.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'Карточка с таким _id не найдена.' });
      } else {
        res
          .status(500)
          .send({ message: `Произошла ошибка. Детали: ${error.message}` });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.status(200).send({ data: card }))
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(400).send({ message: 'Передан некорректный _id карточки' });
      } else if (error.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'Карточка с таким _id не найдена.' });
      } else {
        res
          .status(500)
          .send({ message: `Произошла ошибка. Детали: ${error.message}` });
      }
    });
};
