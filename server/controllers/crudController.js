const AppError = require('../helpers/appError');
//const APIFeactures
const catchAsync = require('../helpers/catchAsync');

//CREATE
exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    //const newDoc = await Model.create(req.body);
    // res.status(201).json({
    //   status: 'success',
    //   data: {
    //     data: newOne,
    //   },
    // });

    res.send('User Create');
  });

//READ
exports.getAll = Model =>
  catchAsync(async (req, res, next) => {
    //filters...

    // const docs = await Model.findAll();

    // res.status(200).json({
    //   status: 'success',
    //   results: docs.length,
    //   data: {
    //     data: docs,
    //   },
    // });

    res.send('Model List');
  });

exports.getOne = Model =>
  catchAsync(async (req, res, next) => {
    res.send('Model Details');
  });

//UPDATE
exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    res.send('Model User');
  });

//DELETE
exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    res.send('Model User');
  });

//const data = Model.update();
