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
        role.title AS Job_Title,
        role.id AS Role_ID_Number,
        department.name AS Department,
        role.salary AS Salary
    FROM role
    INNER JOIN department 
    ON role.department_id = department.id`;
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
        e.manager_id AS Manager
    FROM employee e
    INNER JOIN role r
    ON e.role_id = r.id
    INNER JOIN employee i
    ON e.manager_id = i.id`;
    dbConnection.query(sql, function(err, results) {
    console.table('Employees', results);
    init();
})};

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
            default: dbConnection.end();
            console.log('Thank you for using the Employee DB Tracker');
            break;
        }
    })
}

// initalization of application
init();