const router = require('express').Router();

const NotFoundError = require('../errors/not-found-error');

router.patch('/', (req, res, next) => next(new NotFoundError('Страница не найдена')),
  // res.status(404).send({ message: 'Страница не найдена' });
);

module.exports = router;
