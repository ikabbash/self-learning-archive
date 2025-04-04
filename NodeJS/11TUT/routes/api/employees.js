const express = require('express');
const router = express.Router();
const employeesController = require('../../controllers/employeesController');

// const verifyJWT = require ('../../middleware/verifyJWT');

// chain
router.route('/')
    .get(employeesController.getAllEmployees)
    // use below if you have select Routes
    // .get(verifyJWT, employeesController.getAllEmployees)
    .post(employeesController.createNewEmployee)
    .put(employeesController.updateEmployee)
    .delete(employeesController.deleteEmployee);

router.route('/:id')
    .get(employeesController.getEmployee);

module.exports = router;