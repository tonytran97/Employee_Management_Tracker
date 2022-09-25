// packages needed for this application
const inquirer = require('inquirer');

// initation
const init = () => {
    console.log('Welcome to our Employee Database!'),
    inquirer.prompt([
        {
            type: 'list', 
            message: `What would you like to do?`,
            choices: ['View All Employees', 'Add Employee', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department'], 
            name: 'start',
        },
    ])
}

// initalization of application
init();