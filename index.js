// packages needed for this application
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

// my protection
require('dotenv').config();

// creating the connection to the database
const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'employee_db'
},
    console.log('Success, you have been connected to the employee_db database')
);

// Will display the departments table
const viewDepartments = () => {
    let sql = 'SELECT * FROM department'
    dbConnection.query(sql, function(err, results) {
    console.table('Departments', results);
    init();
})};

// Will display the role table with specific columns
const viewRole = () => {
    // var declaration & assignment makes it more readable
    let sql = `
    SELECT 
        r.title AS Job_Title,
        r.id AS Role_ID_Number,
        d.name AS Department,
        r.salary AS Salary
    FROM role r
    INNER JOIN department d
    ON r.department_id = d.id`;
    dbConnection.query(sql, function(err, results) {
    console.table('Available Roles', results);
    init();
})};

// Will display the employee table with specific columns
const viewEmployees = () => {
    // var declaration & assignment makes it more readable
    // self joining requires an alias
    let sql = `
    SELECT 
        e.id AS Employee_ID,
        e.first_name AS First_Name, 
        e.last_name AS Last_Name,
        r.title AS Role_Title,
        r.salary AS Salary,
        CONCAT(i.first_name, ' ', i.last_name) AS Manager
    FROM employee e
    INNER JOIN role r
    ON e.role_id = r.id
    LEFT JOIN employee i
    ON e.manager_id = i.id`;
    dbConnection.query(sql, function(err, results) {
    console.table('Employees', results);
    init();
})};

// function to add a new department
const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input', 
            message: `What is the name of the new department you would like to add?`,
            name: 'new_department',
        },
    ])
    .then((choice) => {
        let sql = `
        INSERT INTO department (name)
        VALUES ('${choice.new_department}')`;
        // console.log(sql);
        dbConnection.query(sql, function(err, results) {
        //     console.log("err = "+ err)
        //    console.log("results = "+ results)
        console.log(`${choice.new_department} has been added to the database.`);
        init();
        })
    });
}

// function to add a new Role
const addRole = () => {
    let departmentBucket = 'SELECT * from department';
    dbConnection.query(departmentBucket, function (err, result) {
        if (err) console.log(err)
        // console.log(result);
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the new role?',
            name: 'role'
        },
        {
            type: 'input',
            message: 'What is the salary of this role?',
            name: 'salary'
        },
        {
            type: 'rawlist',
            message: 'Which department does this role belong to?',
            // each of the choices are given a name and a value
            // selecting one of the choices will then output an integer instead of a string
            choices: result.map((result) => ({
                name : result.name,
                value : result.id
            })),
            name: 'department'
        },
    ])
    .then((choices) => {
        // console.log(choices.department);
        let sql = `
        INSERT INTO role (title, salary, department_id)
        VALUES ('${choices.role}', ${choices.salary}, ${choices.department})`;
        // console.log(sql);
        dbConnection.query(sql, function(err, results) {
        // console.log("err = "+ err)
        // console.log("results = "+ results)
        console.log(`${choices.role} has been added to the database.`);
        init();
        })
    });
})}

// function to add a new employee
const addEmployee = () => {
    let roleBucket = 'SELECT * from role';
    dbConnection.query(roleBucket, function (err, roleResult) {
        if (err) console.log(err)
        // console.log(roleResult);
        let employeeBucket = 'SELECT * from employee';
        dbConnection.query(employeeBucket, function (err, employeeResult) {
            if (err) console.log(err)
            // pushing in a fill in employee manager slot which is later to be selected as a none option
            let none = {
                id: 999999,
                first_name: 'none',
                last_name: '',
                role_id: null,
                manager_id: null
              };
            employeeResult.push(none);
            // console.log(employeeResult);
            
    inquirer.prompt([
        {
            type: 'input', 
            message: `What is the employee's first name`,
            name: 'first_name',
        },
        {
            type: 'input', 
            message: `What is the employee's last name`,
            name: 'last_name',
        },
        {
            type: 'rawlist', 
            message: `What is the employee's role?`,
            choices: roleResult.map((result) => ({
                name : result.title,
                value : result.id
            })),
            name: 'role',
        },
        {
            type: 'rawlist', 
            message: `Who is the new employee's manager?`,
            choices: employeeResult.map((result) => ({
                name : (`${result.first_name} ${result.last_name}`),
                value : result.id
            })),
            name: 'manager'
        },
    ])
    .then((choices) => {
        // console.log(choices.role);
        // console.log(choice.manager);
        let sql = `
        INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES ('${choices.first_name}', '${choices.last_name}', ${choices.role}, ${choices.manager})`;
        // console.log(sql);
        dbConnection.query(sql, function(err, results) {
        // console.log("err = "+ err)
        // console.log("results = "+ results)
        console.log(`${choices.first_name} ${choices.last_name} has been added to the database.`);
        init();
        })
    });
})})}

// function to update selected employee's role
const updateEmployeeRole = () => {
    let employeeBucket = 'SELECT * from employee';
        dbConnection.query(employeeBucket, function (err, employeeResult) {
            if (err) console.log(err)
            // console.log(employeeResult);
            let roleBucket = 'SELECT * from role';
            dbConnection.query(roleBucket, function (err, roleResult) {
                if (err) console.log(err)
                // console.log(roleResult);
    inquirer.prompt([
        {
            type: 'list', 
            message: `Which employee's role do you want to update?`,
            choices: employeeResult.map((result) => ({
                name : (`${result.first_name} ${result.last_name}`),
                value : result.first_name
            })),
            name: 'employee',
        },
        {
            type: 'list', 
            message: `What new role do you want to assign to this selected employee?`,
            choices: roleResult.map((result) => ({
                name : result.title,
                value : result.id
            })),
            name: 'role',
        },
    ])
    .then((choice) => {
        let sql = `
        UPDATE employee
        SET role_id = ${choice.role}
        WHERE First_Name = '${choice.employee}'`;
        // console.log(sql);
        dbConnection.query(sql, function(err, results) {
        //     console.log("err = "+ err)
        //    console.log("results = "+ results)
        console.log(`${choice.employee}'s role has been updated`);
        init();
        })
    })})
});
}

// function to update selected employee's manager
const updateManager = () => {
    let employeeBucket = 'SELECT * from employee';
        dbConnection.query(employeeBucket, function (err, employeeResult) {
            if (err) console.log(err)
            // console.log(employeeResult);
    inquirer.prompt([
        {
            type: 'list', 
            message: `Which employee's manager do you want to update?`,
            choices: employeeResult.map((result) => ({
                name : (`${result.first_name} ${result.last_name}`),
                value : result.first_name
            })),
            name: 'employee',
        },
        {
            type: 'list', 
            message: `Who is the new manager?`,
            choices: employeeResult.map((result) => ({
                name : (`${result.first_name} ${result.last_name}`),
                value : result.id
            })),
            name: 'manager',
        },
    ])
    .then((choice) => {
        let sql = `
        UPDATE employee
        SET manager_id = ${choice.manager}
        WHERE First_Name = '${choice.employee}'`;
        // console.log(sql);
        dbConnection.query(sql, function(err, results) {
        //     console.log("err = "+ err)
        //    console.log("results = "+ results)
        console.log(`${choice.employee}'s manager has been updated`);
        init();
        })
    })})
};

// initation
const init = () => {
    console.log('Welcome to our Employee Database!'),
    inquirer.prompt([
        {
            type: 'list', 
            message: `What would you like to do?`,
            choices: ['View All Employees', 'Add Employee', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Update Employee Role', 'Update Manager', 'Exit'], 
            name: 'start',
        },
    ])
    .then((selection) => {
        switch(selection.start) {
            case 'View All Departments':
            viewDepartments();
            break;
            case 'View All Roles':
            viewRole();
            break;
            case 'View All Employees':
            viewEmployees();
            break;
            case 'Add Department':
            addDepartment();
            break;
            case 'Add Role':
            addRole();
            break;
            case 'Add Employee':
            addEmployee();
            break;
            case 'Update Employee Role':
            updateEmployeeRole();
            break;
            case 'Update Manager':
            updateManager();
            break;
            default: dbConnection.end();
            console.log('Thank you for using the Employee DB Tracker');
            break;
        }
    })
}

// initalization of application
init();