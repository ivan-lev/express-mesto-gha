const Card = require('../models/card');

module.exports.getCardsList = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
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
  const currentUserId = req.user._id;

  // ищем карточку, возвращаем _id владельца и сравниваем с id пользователя
  Card.findById({ _id: req.params.cardId }, { owner: 1 })
    .orFail()
    .then((card) => {
      // если _id не совпадают, то отправляем ошибку
      if (currentUserId.toString() !== card.owner.toString()) {
        return res.status(403).send('Отсутствуют права для удаления карточки');
      }
      // если совпадают, то удаляем карточку
      return Card.findByIdAndDelete({ _id: req.params.cardId })
        .then(() => res.send({ data: card }))
        .catch((error) => res.status(500).send({ message: `Произошла ошибка. Детали: ${error}` }));
    })
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

  // старый код без проверки
  // Card.findByIdAndDelete({ _id: req.params.cardId })
  //   .orFail()
  //   .then((card) => res.send({ data: card }))
  //   .catch((error) => {
  //     if (error.name === 'CastError') {
  //       res
  //         .status(400)
  //         .send({ message: 'Передан некорректный _id карточки для удаления' });
  //     } else if (error.name === 'DocumentNotFoundError') {
  //       res.status(404).send({ message: 'Карточка с таким _id не найдена' });
  //     } else {
  //       res.status(500).send({ message: `Произошла ошибка. Детали: ${error}` });
  //     }
  //   });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => {
      res.send({ data: card });
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
    .then((card) => res.send({ data: card }))
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
