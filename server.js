const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

require('dotenv').config();

const db = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },

);

db.connect(function(err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log(`Connected to employees_db!`)
    startPrompt();
});

const startPrompt = () => {
    return inquirer.prompt ([
        {
            type: 'list',
            name: 'selection',
            message: 'Select an option below',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add A Departmnet',
                'Add A Role',
                'Add An Employee',
                'Update An Employee Role',
                'Quit'
            ]
        }
    ])

    .then((answers) => {
        const { selection } = answers;

        if (selection == 'View All Departments') {
            showDept();
        } else if (selection === 'View All Roles') {
            showRoles();
        } else if (selection === 'View All Employees') {
            showEmployees();
        } else if (selection === 'Add A Department') {
            addDept();
        } else if (selection === 'Add A Role') {
            addRole();
        } else if (selection === 'Add An Employee') {
            addEmployee();
        } else if (selection === 'Update An Employee Role') {
            updateEmployee();
        } else {
            db.end();
        }
    })    
}

showDept = () => {
    db.query('SELECT * FROM department', (err, results) => {
        if (err) {
            console.log(err);
        }
        console.log('View All Departments \n');
        console.table(results);
        startPrompt();
    });
}

showRoles = () => {
    db.query('SELECT * FROM role', (err, results) => {
        if (err) {
            console.log(err);
        }
        console.log('View All Roles \n');
        console.table(results);
        startPrompt();
    });
}

showEmployees = () => {
    db.query('SELECT * FROM employee', (err, results) => {
        if (err) {
            console.log(err);
        }
        console.log('View All Employees \n');
        console.table(results);
        startPrompt();
    });
}