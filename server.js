var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Dlekwjd347",
  database: "employee_tracker_db"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

// function which prompts the user for what action they should take
function start() {
  inquirer
    .prompt({
      name: "menu",
      type: "list",
      message: "Please choose one of the following:",
      choices: [
        "View all Employees",
        "View all Departments",
        "View all Roles",
        "Add Employees",
        "Add Department",
        "Add Role",
        "Update Employee Role",
        "Exit"
      ]
    })
    .then(function (answer) {
      switch (answer.choices) {
        case "View All Employees":
          employeeView();
          break;
        case "View all employees":
          viewEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a Role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update employee role":
          updateEmployee();
          break;
        case "Exit":
          connection.end();
          break;
        default:
          start();
      }
    })
}
// View all employees 
function viewAllEmp(){

  // Query to view all employees
  let query = "SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, concat(m.first_name, ' ' ,  m.last_name) AS manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id ORDER BY ID ASC";

  // Query from connection
  connection.query(query, function(err, res) {
      if(err) return err;
      console.log("\n");

      // Display query results using console.table
      console.table(res);

      //Back to main menu
      mainMenu();
  });
}