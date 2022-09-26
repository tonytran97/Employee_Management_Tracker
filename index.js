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
            // come back to this, works only if you put the correct department id
            // need to somehow make a list of the departments
            type: 'input',
            message: 'Which department does this role belong to?',
            name: 'department'
        },
    ])
    .then((choices) => {
        let sql = `
        INSERT INTO role (title, salary, department_id)
        VALUES ('${choices.role}', ${choices.salary}, ${choices.department})`;
        console.log(sql);
        dbConnection.query(sql, function(err, results) {
        console.log("err = "+ err)
        console.log("results = "+ results)
        console.log(`${choices.role} has been added to the database.`);
        init();
        })
    });
}

// initation
const init = () => {
    console.log('Welcome to our Employee Database!'),
    inquirer.prompt([
        {
            type: 'list', 
            message: `What would you like to do?`,
            choices: ['View All Employees', 'Add Employee', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Exit'], 
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
            default: dbConnection.end();
            console.log('Thank you for using the Employee DB Tracker');
            break;
        }
    })
}

// initalization of application
init();