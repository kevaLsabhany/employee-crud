const Employee = require('../model/Employee')

const getEmployees = async (req, res) => {
    const result = await Employee.find()
    return res.status(200).json(result)
}

const createNewEmployee = async (req, res) => {
    if (!req?.body?.firstname || !req?.body?.lastname) return res.status(400).json({ 'message': 'firstname and lastname are required' })
    const result = await Employee.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
    })
    return res.status(201).json(result)
}

const updateEmployee = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'ID is required' })
    const employee = await Employee.findOne({ _id: req?.body?.id }).exec()
    if (!employee) return res.status(204).json({ 'message': 'Employee not found' })
    if (req?.body?.firstname) employee.firstname = req?.body?.firstname
    if (req?.body?.lastname) employee.firstname = req?.body?.lastname
    const result = await employee.save()
    return res.status(200).json(result)
}

const deleteEmployee = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'ID is required' })
    const employee = await Employee.findOne({ _id: req?.body?.id }).exec()
    if (!employee) return res.status(204).json({ 'message': 'Employee not found' })
    const result = await Employee.deleteOne({ _id: req?.body?.id })
    return res.status(200).json(result)
}

const getEmployeeById = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'ID is required' })
    const employee = await Employee.findOne({ _id: req?.params?.id }).exec()
    if (!employee) return res.status(204).json({ 'message': 'Employee not found' })
    return res.status(200).json(employee)
}

module.exports = {
    getEmployees,
    getEmployeeById,
    createNewEmployee,
    updateEmployee,
    deleteEmployee
}