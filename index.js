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
    // console.log(results);
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
    console.log(results);
    console.table('Available Roles', results);
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
            default: dbConnection.end();
            console.log('Thank you for using the Employee DB Tracker');
            break;
        }
    })
}

// initalization of application
init();