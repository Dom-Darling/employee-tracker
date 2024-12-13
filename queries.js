const { Client } = require('pg');

// Configure the database connection
const client = new Client({
  user: process.env.DATABASE_USER || 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  database: process.env.DATABASE_NAME || 'employee_tracker',
  password: process.env.DATABASE_PASSWORD || 'password',
  port: 5432,
});

client.connect();

module.exports = client;


// View all departments
async function viewDepartments() {
  const res = await client.query('SELECT * FROM department');
  console.table(res.rows);
}

// View all roles
async function viewRoles() {
  const res = await client.query(`
    SELECT role.id, role.title, role.salary, department.name AS department
    FROM role
    JOIN department ON role.department_id = department.id
  `);
  console.table(res.rows);
}

// View all employees
async function viewEmployees() {
  const res = await client.query(`
    SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department,
           role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id
  `);
  console.table(res.rows);
}

// Add a department
async function addDepartment() {
  const { name } = await inquirer.prompt({
    type: 'input',
    name: 'name',
    message: 'Enter the name of the department:',
  });
  await client.query('INSERT INTO department (name) VALUES ($1)', [name]);
  console.log(`Department ${name} added successfully.`);
}

// Add a role
async function addRole() {
  const { title, salary, departmentId } = await inquirer.prompt([
    { type: 'input', name: 'title', message: 'Enter the title of the role:' },
    { type: 'input', name: 'salary', message: 'Enter the salary for the role:' },
    { type: 'input', name: 'departmentId', message: 'Enter the department ID for the role:' },
  ]);
  await client.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, departmentId]);
  console.log(`Role ${title} added successfully.`);
}

// Add an employee
async function addEmployee() {
  const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
    { type: 'input', name: 'firstName', message: "Enter the employee's first name:" },
    { type: 'input', name: 'lastName', message: "Enter the employee's last name:" },
    { type: 'input', name: 'roleId', message: "Enter the employee's role ID:" },
    { type: 'input', name: 'managerId', message: "Enter the manager's ID (or leave blank):", default: null },
  ]);
  await client.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [firstName, lastName, roleId, managerId]);
  console.log(`Employee ${firstName} ${lastName} added successfully.`);
}

// Update an employee's role
async function updateEmployeeRole() {
  const { employeeId, roleId } = await inquirer.prompt([
    { type: 'input', name: 'employeeId', message: "Enter the employee's ID:" },
    { type: 'input', name: 'roleId', message: "Enter the new role ID for the employee:" },
  ]);
  await client.query('UPDATE employee SET role_id = $1 WHERE id = $2', [roleId, employeeId]);
  console.log(`Employee ID ${employeeId} updated successfully.`);
}

module.exports = { viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole };
