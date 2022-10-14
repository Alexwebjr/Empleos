const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const sequelize = require('./models/database');

const AppError = require('./helpers/appError');
const Role = require('./models/Role');
const User = require('./models/User');
const Job = require('./models/Job');
const Ad = require('./models/Ad');

const roleRouter = require('./routes/roleRouter');
const userRouter = require('./routes/userRouter');
const jobRouter = require('./routes/jobRouter');
const adRouter = require('./routes/adRouter');

const app = express();
//=========== PARSER ===========
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

//=========== ROUTES ===========
app.use('/api/v1/roles', roleRouter);
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

//=========== DB ===========
//RELATIONS
//Role - User
Role.hasMany(User);
User.belongsTo(Role, {
  foreignKey: {
    allowNull: false,
  },
});

//User-Job
User.hasMany(Job);
Job.belongsTo(User, {
  foreignKey: {
    allowNull: false,
  },
});

//User Ad
User.hasMany(Ad);
Ad.belongsTo(User, {
  foreignKey: {
    allowNull: false,
  },
});

//SYNC
sequelize
  .sync()
  .then(() => {
    app.listen(process.env.DEV_PORT, () => {
      console.log(`App runing http://localhost:${process.env.DEV_PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
  });

//sequelize.sync({ alter: true });
//sequelize.sync({ force: true });
