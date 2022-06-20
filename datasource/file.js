const employees = require("@jsdevtools/static-mock-data/employees.json");
const { DataSource } = require('apollo-datasource');
const _ = require('lodash')

class EmployeeService extends DataSource {
    constructor() {
        super();
    }

    initialize(config) {

    }

    getEmployees(args) {
        return _.filter(employees, args)
    }


    getEmployeeByEmail(email) {
        return employees.find((employee) => {
            return employee.email == email
        })
    }
}

module.exports = EmployeeService