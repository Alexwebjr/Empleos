//const User = require(); //model
const User = '';
const crudHelper = require('../controllers/crudController');

//======= FUNCTION API =======

//CREATE
exports.createUser = crudHelper.createOne(User);

//READ
exports.getAllUsers = crudHelper.getAll(User);
exports.getUser = crudHelper.getOne(User);

//UPDATE
exports.updateUser = crudHelper.updateOne(User);

//DELATE
exports.deleUser = crudHelper.deleteOne(User);
