const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');

const { validateJoiSignup, validateJoiSignin } = require('./middlewares/joi-users-validation');

const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const pageNotFound = require('./routes/page-not-found');

const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

// const tempUserIdInsertion = (req, res, next) => {
//   req.user = {
//     _id: '6582a0da482a2f0244ac128a',
//   };

//   next();
// };
// app.use(tempUserIdInsertion);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());

app.post('/signup', validateJoiSignup, createUser);
app.post('/signin', validateJoiSignin, login);

app.use(auth);
app.use('/users', userRouter);
app.use('/cards', cardsRouter);

app.use('*', pageNotFound);

// миддлвэр для обработки ошибок celebrate
app.use(errors());

app.use((err, req, res, next) => {
  // ставим для непредвиденной ошибки статус 500
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      // если статус 500, генерируем сообщение сами
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
