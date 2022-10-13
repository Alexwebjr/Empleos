const Role = require('../models/Role');
const crudHelper = require('../controllers/crudController');

//======= FUNCTION API =======

//CREATE
exports.createRole = crudHelper.createOne(Role);

//READ
exports.getAllRoles = crudHelper.getAll(Role);
exports.getRole = crudHelper.getOne(Role);

//UPDATE
exports.updateRole = crudHelper.updateOne(Role);

//DELATE
exports.deleteRole = crudHelper.deleteOne(Role);
