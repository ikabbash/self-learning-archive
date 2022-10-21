const data = {
    employees: require('../model/employees.json'),
    setEmployees: function (data) { this.employees = data }
};

// basically the API requests that were in employee.js were
// moved to the current JS program

// basically in MVC you separated the logic into controller
// also you took what was written then updated the code

// get
const getAllEmployees = (req, res) => {
    res.json(data.employees);
}

// post
const createNewEmployee = (req, res) => {
    const newEmployee = {
        // id increments
        id: data.employees[data.employees.length - 1].id + 1 || 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }

    // to make sure names are set
    if (!newEmployee.firstname || !newEmployee.lastname) {
        return res.status(400).json({'message': 'First and last names are required.'});
    }

    data.setEmployees([...data.employees, newEmployee]);
    res.status(201).json(data.employees);
}

// put
const updateEmployee = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    if (!employee) {
        return res.status(400).json({"message": `Employee ID ${req.body.id} not found`})
    }
    if (req.body.firstname) employee.firstname = req.body.firstname;
    if (req.body.lastname) employee.lastname = req.body.lastname;
    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    const unsortedArray = [...filteredArray, employee];
    data.setEmployees(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
    res.json(data.employees);
}

// delete
const deleteEmployee = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    if(!employee) {
        return res.status(400).json({ "message": `Employee ID ${req.body.id} not found`});
    }
    const filteredArray = data.employees.filter (emp => emp.id !== parseInt(req.body.id));
    data.setEmployees([...filteredArray]);
    res.json(data.employees);
}

// the get in router.route('/:id')
const getEmployee = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    if(!employee) {
        return res.status(400).json({ "message": `Employee ID ${req.body.id} not found`});
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