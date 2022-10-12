const express = require('express');
require('dotenv').config();

//importing
const AppError = require('./helpers/appError');
const userRouter = require('./routes/userRouter');
const jobRouter = require('./routes/jobRouter');
const adRouter = require('./routes/adRouter');

const app = express();
//=========== PARSER ===========
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

//=========== ROUTES ===========
app.use('/api/v1/users', userRouter);
app.use('/api/v1/jobs', jobRouter);
app.use('/api/v1/ads', adRouter);

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
