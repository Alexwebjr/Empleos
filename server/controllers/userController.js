//const User = require(); //model
const User = '';
const crudHelper = require('../controllers/crudController');

//======= FUNCTION API =======

//Create
exports.createUser = crudHelper.createOne(User);

//Read
exports.getAllUsers = crudHelper.getAll(User);
