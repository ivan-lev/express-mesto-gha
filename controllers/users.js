const User = require('../models/user');

module.exports.getUserList = (req, res) => {
  // найти всех пользователей и вернуть определённые поля
  User.find({}, {
    _id: 1, name: 1, about: 1, avatar: 1,
  })
    .then((user) => res.send({ data: user }))
    .catch((error) => {
      res.status(500).send({
        message: `Произошла ошибка получения списка пользователей. Детали: ${error.message}`,
      });
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId, {
    _id: 1, name: 1, about: 1, avatar: 1,
  })
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(400).send({
          message: 'Пользователь с таким _id не найден.',
        });
      } else if (error.name === 'DocumentNotFoundError') {
        res.status(404).send({
          message: 'Передан некорректный _id пользователя.',
        });
      } else {
        res.status(500).send({
          message: `Произошла ошибка. Детали: ${error.message}`,
        });
      }
    });
};

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  User.create({
    name, about, avatar, email, password,
  })
    .then((user) => {
      const userId = user._id.toString();
      res.status(201).send({
        data: {
          name, about, avatar, _id: userId, password,
        },
      });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send({
          message: 'При создании пользователя переданы невалидные данные.',
        });
      } else {
        res.status(500).send({
          message: `Произошла ошибка. Детали: ${error.message}`,
        });
      }
    });
};

module.exports.updateUserInfo = (req, res) => {
  const owner = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    owner,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send({
          message: 'При обновлении профиля переданы невалидные данные.',
        });
      } else if (error.name === 'CastError') {
        res.status(404).send({
          message: 'Пользователь с таким _id не найден.',
        });
      } else {
        res.status(500).send({
          message: `Произошла ошибка. Детали: ${error.message}`,
        });
      }
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
      select: { avatar },
    },
  )
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send({
          message: 'При обновлении аватара переданы невалидные данные.',
        });
      } else if (error.name === 'CastError') {
        res.status(404).send({
          message: 'Пользователь с таким _id не найден.',
        });
      } else {
        res.status(500).send({
          message: `Произошла ошибка. Детали: ${error.message}`,
        });
      }
    });
};
