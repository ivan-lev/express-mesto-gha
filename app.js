const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const pageNotFound = require('./routes/page-not-found');
const { login } = require('./controllers/users');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

const tempUserIdInsertion = (req, res, next) => {
  req.user = {
    _id: '6582a0da482a2f0244ac128a',
  };

  next();
};

app.use(tempUserIdInsertion);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use('/users', userRouter);
app.use('/cards', cardsRouter);
app.post('/signin', login);
app.use('*', pageNotFound);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
