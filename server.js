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

// Connect to Mysql Database
db.connect(function(err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log(`Connected to employees_db!`)
    startPrompt();
});


// Initialize Prompt
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
                'Add A Department',
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

// Show All Departments
showDept = () => {
    db.query('SELECT id, name AS department FROM department', (err, results) => {
        if (err) {
            console.log(err);
        }
        console.log('View All Departments \n');
        console.table(results);
        startPrompt();
    });
}

// Show All Roles
showRoles = () => {
    db.query('SELECT role.id, role.title, role.salary, department.name AS department FROM role INNER JOIN department ON role.department_id = department.id', (err, results) => {
        if (err) {
            console.log(err);
        }
        console.log('View All Roles \n');
        console.table(results);
        startPrompt();
    });
}

// Show All Employees
showEmployees = () => {
    db.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id', (err, results) => {
        if (err) {
            console.log(err);
        }
        console.log('View All Employees \n');
        console.table(results);
        startPrompt();
    });
}

// Add A Department
addDept = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'dept',
            message: 'What department do you want to add?'
        }
    ]).then (answer => {
        db.query('INSERT INTO department (name) VALUES (?)', answer.dept, (err, result) => {
            if (err) {
                console.log(err)
            }
            showDept();
    
        })
    })

};

// Add An Employee
addEmployee = () => {
    inquirer.prompt ([
        {
            type: 'input',
            name: 'firstName',
            message: `What is the employee's first name?`
        },
        { 
            type: 'input',
            name: 'lastName',
            message: `What is the employee's last name?`
        }
   ]).then(answer => {
    const input = [answer.firstName, answer.lastName]

    db.query('SELECT id, title FROM role', (err, results) => {
        if (err) {
            console.log(err);
        } const roles = results.map(({ id, title}) => ({ name: title, value: id }));

        inquirer.prompt([
            {
                type: 'list',
                name: 'role',
                message: `What is the employee's role?`,
                choices: roles
            }
        ]).then(roleChoice => {
            const role = roleChoice.role;
            input.push(role);

            db.query('SELECT * FROM employee', (err, results) => {
                if (err) {
                    console.log(err);
                } const manager = results.map(({ id, first_name, last_name}) => ({ name: first_name + " " + last_name, value: id }));

                inquirer.prompt([
                    {
                    type: 'list',
                    name: 'manager',
                    message: `Who is the employee's manager?`,
                    choices: manager
                    }
                ]).then(managerChoice => {
                    const manager = managerChoice.manager;
                    input.push(manager);

                    db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',input,(err, results) => {
                        if (err) {
                            console.log(err);
                        } console.log('Employee Added!')

                        showEmployees();
                    });
                })

            })
        })

    })
})
};

