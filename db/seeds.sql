INSERT INTO department (name)
VALUES 
('IT'),
('Finance & Accounting'),
('Sales & Marketing'),
('Operations');

INSERT INTO role (title, salary, department_id)
VALUES
('Full Stack Developer', 80000, 1),
('Software Engineer', 120000, 1),
('Accountant', 10000, 2), 
('Finanical Analyst', 150000, 2),
('Marketing Coordindator', 70000, 3), 
('Sales Lead', 90000, 3),
('Project Manager', 100000, 4),
('Operations Manager', 90000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Mac', 'Miller', 2, null),
('Snoop', 'Dogg', 1, 1),
('Mary', 'JBlige', 4, null),
('Megan', 'TheeStallion', 3, 3),
('Tyler', 'TheCreator', 6, null),
('Post', 'Malone', 5, 5),
('Em', 'Inem', 7, null),
('Kanye', 'West', 8, 7);

