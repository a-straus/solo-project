const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const multer = require('multer');

const upload = multer();
const app = express();
const path = require('path');
const apiRouter = require('./routes/api');

app.use(bodyParser());
app.use(cookieParser());
app.use(upload.array());

//if (process.env.NODE_ENV === 'production') {
app.use('/build', express.static(path.join(__dirname, '../build')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
  next();
});
//}

app.use('/api', apiRouter);

app.use('/', (req, res) => {
  res.status(404).send('IDK WHAT THIS PAGE IS DOG!!!');
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error!',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(3000, () => console.log('Listening on port 3000'));
