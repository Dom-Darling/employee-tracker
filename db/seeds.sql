-- Departments
INSERT INTO department (name) VALUES ('Engineering'), ('HR'), ('Finance');

-- Roles
INSERT INTO role (title, salary, department_id) VALUES
('Software Engineer', 120000, 1),
('HR Specialist', 70000, 2),
('Accountant', 80000, 3);

-- Employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, NULL),
('Emily', 'Davis', 3, 1);
