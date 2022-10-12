const express = require('express');
require('dotenv').config();

//importing
const AppError = require('./helpers/appError');
const userRouter = require('./routes/userRouter');

const app = express();

//=========== ROUTES ===========
app.use('/api/v1/users', userRouter);

app.get('/', (req, res) => {
  res.send('Server');
});

//=========== ERROR ===========
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.listen(process.env.DEV_PORT, () => {
  console.log(`App runing http://localhost:${process.env.DEV_PORT}`);
});
