// packages needed for this application
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

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
    dbConnection.query('SELECT * FROM department', function(err, results) {
    // console.log(results);
    console.table('Departments', results);
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
            default: dbConnection.end();
            console.log('Thank you for using the Employee DB Tracker');
            break;
        }
    })
}

// initalization of application
init();