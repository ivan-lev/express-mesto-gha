const User = require("../models/user");

module.exports.getUserList = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((error) =>
      res.status(500).send({ message: `Произошла ошибка: ${error}` })
    );
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send({ data: user }))
    .catch((error) =>
      res.status(500).send({ message: `Произошла ошибка: ${error}` })
    );
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((error) =>
      res.status(500).send({ message: `Произошла ошибка: ${error}` })
    );
};

module.exports.updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.create({ name, about })
    .then((user) => res.send({ data: user }))
    .catch((error) =>
      res.status(500).send({ message: `Произошла ошибка: ${error}` })
    );
};

module.exports.updateUseAvatar = (req, res) => {
  const { avatar } = req.body;
  // User.create({  avatar })
  //   .then((user) => res.send({ data: user }))
  //   .catch((error) =>
  //     res.status(500).send({ message: `Произошла ошибка: ${error}` })
  //   );
};
