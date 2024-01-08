const { celebrate, Joi } = require('celebrate');

const avatarRegEx = /https?:\/\/(w{3}\.)?[\d\w-]+\.(\w)+\/?[\w\W]+/;

module.exports.validateJoiSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().uri(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
});

module.exports.validateJoiSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
});

module.exports.validateJoiGetUserById = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
});

module.exports.validateJoiUpdateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

module.exports.validateJoiUpdateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
      .uri()
      .required()
      .pattern(avatarRegEx),
  }),
});

// /https?:\/\/(w{3}\.)?[\d\w-]+\.(\w+\/?){1,}/g
// /https?:\/\/(w{3}\.)?[\d\w-]+\.(\w)+\/?[\w\W\/]+/g
