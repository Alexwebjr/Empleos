const AppError = require('../helpers/appError');
//const APIFeactures
const catchAsync = require('../helpers/catchAsync');

exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    //const newOne = await Model.create(req.body);

    // res.status(201).json({
    //   status: 'success',
    //   data: {
    //     data: newOne,
    //   },
    // });

    res.send('User Create');
  });

exports.getAll = Model =>
  catchAsync(async (req, res, next) => {
    res.send('User List');
  });
