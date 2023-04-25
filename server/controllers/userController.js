const User = require('../models/User'); //model
const Role = require('../models/Role');
const crudHelper = require('../controllers/crudController');
const catchAsync = require('../helpers/catchAsync');

//======= FUNCTION API =======

//CREATE
exports.createUser = crudHelper.createOne(User);

//READ
exports.getAllUsers = catchAsync(async (req, res, next) => {
  //filters...
  const docs = await User.findAll({ include: Role });

  res.status(200).json({
    status: 'success',
    results: docs.length,
    data: {
      data: docs,
    },
  });
});
exports.getUser = catchAsync(async (req, res, next) => {
  //filters...
  const { id } = req.params;

  let doc = await User.findOne({ where: { id }, include: Role });

  res.status(200).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});

//UPDATE
exports.updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  let doc = await User.findOne({ where: { id }, include: Role });

  if (!doc) {
    return next(new AppError('Please provide a valid id', 400));
  }

  //doc.set(req.body);
  //const newDoc = await doc.save();
  const newDoc = await doc.update(req.body);
  delete user.password;
  delete user.passwordChangedAt;
  delete user.passwordResetToken;
  delete user.passwordResetExpires;
  //const newDoc = await doc.reload();

  res.status(200).json({
    status: 'success',
    data: {
      data: newDoc,
    },
  });
});

//DELATE
exports.deleUser = crudHelper.deleteOne(User);
