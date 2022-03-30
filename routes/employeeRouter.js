const express = require('express')
const employeesController = require('../controllers/employeesController')
const verifyRoles = require('../middleware/verifyRoles')
const ROLES_LIST = require('../config/roles_list')

const employeeRouter = express.Router()

employeeRouter.route('/')
    .get(employeesController.getEmployees)
    .post(verifyRoles(ROLES_LIST.Editor, ROLES_LIST.Admin), employeesController.createNewEmployee)
    .put(verifyRoles(ROLES_LIST.Editor, ROLES_LIST.Admin), employeesController.updateEmployee)
    .delete(verifyRoles(ROLES_LIST.Admin), employeesController.deleteEmployee)

employeeRouter.route('/:id')
    .get(employeesController.getEmployeeById)

module.exports = employeeRouter