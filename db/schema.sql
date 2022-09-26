DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;
USE employees_db; 

CREATE TABLE department (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL, 
    salary DECIMAL NOT NULL,
    department_id INTEGER,
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
);

CREATE TABLE employee (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER, 
    INDEX role_ind (role_id),
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE SET NULL,
    manager_id INTEGER,
    FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);

