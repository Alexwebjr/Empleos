const Job = require('../models/Job'); //model
const crudHelper = require('../controllers/crudController');

//======= FUNCTION API =======

//CREATE
exports.createJob = crudHelper.createOne(Job);

//READ
exports.getAllJobs = crudHelper.getAll(Job);
exports.getJob = crudHelper.getOne(Job);

//UPDATE
exports.updateJob = crudHelper.updateOne(Job);

//DELATE
exports.deleteJob = crudHelper.deleteOne(Job);
