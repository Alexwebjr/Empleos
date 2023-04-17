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
exports.getUser = crudHelper.getOne(User);

//UPDATE
exports.updateUser = crudHelper.updateOne(User);

//DELATE
exports.deleUser = crudHelper.deleteOne(User);
