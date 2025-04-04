const Employee = require('../model/Employee');

// basically the API requests that were in employee.js were
// moved to the current JS program

// basically in MVC you separated the logic into controller
// also you took what was written then updated the code

// get
const getAllEmployees = async (req, res) => {
    const employees = await Employee.find();
    if (!employees) return res.status(204).json({ 'message': 'No employees found.'});
    res.json(employeeS);
}

// post
const createNewEmployee = async (req, res) => {
    if (!req?.body?.firstname || !req?.body?.lastname) {
        return res.status(400).json({ 'message': 'First and last names are required.'})
    }
    
    try {
        const result = await Employee.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname
        });
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

// put
const updateEmployee = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({'message': 'ID parameter is required.'})
    }
    const employee = await Employee.findOne({ _id: req.body.id }).exec()

    if (!employee) {
        return res.status(204).json({"message": `No employee matches ID ${req.body.id}`})
    }
    if (req.body?.firstname) employee.firstname = req.body.firstname;
    if (req.body?.lastname) employee.lastname = req.body.lastname;
    const result = await employee.save();
    res.json(result);
}

// delete
const deleteEmployee = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({'message': 'Employee ID required.'})

    const employee = await Employee.findOne({ _id: req.body.id }).exec()
    if (!employee) {
        return res.status(204).json({"message": `No employee matches ID ${req.body.id}`})
    }
    const result = await employee.deleteOne({_id: req.body.id})
    res.json(data.result);
}

// the get in router.route('/:id')
const getEmployee = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({'message': 'Employee ID required.'})
    
    const employee = await Employee.findOne({ _id: req.params.id }).exec()
    if(!employee) {
        return res.status(204).json({"message": `No employee matches ID ${req.params.id}`})
    }
    res.json(employee);
}

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}