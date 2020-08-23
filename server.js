const mysql = require("mysql");
const inquirer = require("inquirer");
const table = require("console.table");
const promisemysql = require("promise-mysql");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "Dlekwjd347",
  database: "employee_tracker_db",
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

// function which prompts the user for what action they should take
// Create a switch case
const start = () => {
  inquirer
    .prompt({
      name: "menu",
      type: "list",
      message: "Please choose one of the following:",
      choices: [
        "View All Employees",
        "View All Departments",
        "View All Roles",
        "Add Employees",
        "Add Department",
        "Add Role",
        "Update Employee Role",
        "Update Employee Managers",
        "View Employee by Manager",
        "Remove Employee",
        "Remove Role",
        "Remove Department",
        "View Budget by Department",
        "Exit",
      ],
    })
    .then(function (answer) {
      switch (answer.menu) {
        case "View All Employees":
          employeeView();
          break;
        case "View All Departments":
          departmentView();
          break;
        case "View All Roles":
          roleView();
          break;
        case "Add Employees":
          addEmployee();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Add Role":
          addRole();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "Update Employee Managers":
          updateEmployeeManager();
          break;
        case "View Employee by Manager":
          employeebyManagerView();
          break;
        case "Remove Employee":
          employeeRemove();
          break;
        case "Remove Role":
          roleRemove();
          break;
        case "Remove Department":
            deptRemove();
          break;
        case "View Budget by Department":
          viewBudget();
          break;
        case "Exit":
          exit();
          break;
      }
    });
};

// ------------------------------------
//            FUNCTIONS
//  -----------------------------------

// Function that SELECTS ALL FROM role in our schema.sql/mysql workbench.
// Connection.query helps us to connect the query
// This will go for all of the functions created
const employeeView = () => {
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    console.log("\n");
    console.table(res);
    console.log("\n");
    start();
  });
}

const departmentView = () => {
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    console.log("\n");
    console.table(res);
    console.log("\n");
    start();
  });
}

const roleView = () => {
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    console.log("\n");
    console.table(res);
    console.log("\n");
    start();
  });
}

const addEmployee = () => {
  //empty array to push inputs inside of
  let employeeList = [];
  let employeeIdList = [];
  //empty array to push inputs inside of
  let managerList = [];
  let managerIdList = [];
  let roleIdList = [];
  connection.query("SELECT * FROM employee_tracker_db.role", function (err, res) {
    if (err) 
    console.log(err);
    for (var i = 0; i < res.length; i++) {
      employeeList.push(res[i].title);
      employeeIdList.push(res[i].id.toString());
      roleIdList.push(res[i].role_id);

    }
    connection.query("SELECT * FROM employee_tracker_db.employee", function (err, res) {
      if (err) 
      console.log(err);
      for (var i = 0; i < res.length; i++) {
        managerList.push(res[i].first_name + " " + res[i].last_name);
        managerIdList.push(res[i].id.toString());
      }

      // Build out the inquirer prompt to add employee's first name and last name
      inquirer
        .prompt([
          {
            type: "input",
            name: "firstName",
            message: "What is the Employee's first name?",
          },
          {
            type: "input",
            name: "lastName",
            message: "What is the Employee's last name?",
          },
          {
            type: "input",
            name: "role",
            message: "What is the Employee's Role ID?",
          },
          {
            type: "list",
            name: "managerId",
            message: "What is the Employee's Manager?",
            choices: managerList,
          },
        ])
        .then((val) => {
          connection.query(
            "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);",
            [
              val.firstName,
              val.lastName,
              val.role,
              managerIdList[managerList.indexOf(val.managerId)],
            ],
            function (err, res) {
              if (err) throw err;
              console.log("\n");
              console.log("Successfully added Employee");
              console.log("\n");
              start();
            }
          );
        });
    });
  });
}

const addDepartment = () => {
  let departmentList = [];
  let departmentIdList = [];

  connection.query("SELECT * FROM employee_tracker_db.department", function (
    err,
    res
  ) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      departmentList.push(res[i].name);
      departmentIdList.push(res[i].id.toString());
    }

        inquirer
          .prompt([
            {
              type: "input",
              name: "department",
              message: "Enter Department Name",
            },
          ])
          .then((val) => {
            connection.query(
              "INSERT INTO department SET ?",
              {
                name: val.department,
              },
              function (err, res) {
                if (err) throw err;
                console.log("\n");
                console.log("successfully added Department");
                console.log("\n");
                start();
              }
            );
          });
      }
    );
  };

const addRole = () => {
  let roleList = [];
  let roleIdList = [];

  let salaryList =[];
  let deptIdList =[];

  connection.query("SELECT role.id, title, salary, department_id FROM role LEFT JOIN department ON role.department_id = department.id;", function (
    err,
    res
  ) {
    if (err) console.log(err);
    for (var i = 0; i < res.length; i++) {
      roleList.push(res[i].title);
      roleIdList.push(res[i].id.toString());
      salaryList.push(res[i].salary);
      deptIdList.push(res[i].department_id)
    }

        inquirer
          .prompt([
            {
              type: "input",
              name: "title",
              message: "Enter Role Name"
            },
            {
              type: "number",
              name: "salary",
              message: "Enter Salary"
            },
            {
              type: "input",
              name: "deptId",
              message: "Enter Department ID"
            },
          ])
          .then((val) => {
            connection.query(
              "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [val.title, val.salary, val.deptId], function (err, res) {
                if (err) throw err;
                console.log("\n");
                console.log("successfully added Role");
                console.log("\n");
                start();
              }
            );
          });
      }
    );
    }


const updateEmployeeRole = () => {
  
  inquirer
    .prompt({
      name: "id",
      type: "input",
      message: "Enter employee ID",
    })
    .then(function (answer) {
      var id = answer.id;
      inquirer
        .prompt({
          name: "roleId",
          type: "input",
          message: "Enter role ID",
        })
        .then(function (answer) {
          var roleId = answer.roleId;
          var query = "UPDATE employee SET role_id=? WHERE id=?";
          connection.query(query, [roleId, id], function (err, res) {
            if (err) {
              console.log(err);
            }
            console.log('updating employee role');
            start();
          });
        });
    });
}

const updateEmployeeManager = () => {
  inquirer
    .prompt({
      name: "empID",
      type: "input",
      message: "Enter employee ID",
    })
    .then(function (answer) {
      var empid = answer.empID;
      inquirer
        .prompt({
          name: "manID",
          type: "input",
          message: "Enter manager ID",
        })
        .then(function (answer) {
          var manId = answer.manID;
          var query = "UPDATE employee SET manager_id=? WHERE id=?";
          connection.query(query, [manId, empid], function (err, res) {
            if (err) {
              console.log(err);
            }
            console.log('updating employee manager');
            console.table(res);
            start();
            
          });
        });
    });

}

const employeebyManagerView = () => {
  inquirer
  .prompt({
    name: "manID",
    type: "input",
    message: "Enter manager ID",
  }).then (function(response) {
    var manID = response.manID;
    var query = "SELECT * FROM employee AS manager LEFT JOIN employee AS e ON manager.id = e.manager_id WHERE manager.id = ?";
    connection.query(query, manID, function (err, res) {
        if (err) {
          console.log(err);
        }
        console.table(res);
        start();
    });
  }
  )}

const employeeRemove = () => {
  connection.query("SELECT employee.first_name, employee.last_name FROM employee", (err, results) => {
    if (err) throw err;
    // console.log(' ');
    inquirer.prompt([
      {
        name: 'IDtoRemove',
        type: 'input',
        message: 'Enter the Employee ID of the person to remove:'
      }
    ]).then((answer) => {
      connection.query(`DELETE FROM employee where ?`, { id: answer.IDtoRemove });
      console.log("Your Employee has been removed");
      start();
    })
  })
}

const roleRemove = ()  => {
  query = `SELECT * FROM role`;
  connection.query(query, (err, results) => {
      if (err) throw err;

      inquirer.prompt([
          {
              name: 'removeRole',
              type: 'list',
              choices: function () {
                  let choiceArray = results.map(choice => choice.title);
                  return choiceArray;
              },
              message: 'Select a Role to remove:'
          }
      ]).then((answer) => {
          connection.query(`DELETE FROM role WHERE ? `, { title: answer.removeRole });
          start();

      })

  })
}
const deptRemove = () => {
  const deptList = ["Engineering", "Sales", "Information Technology", "Finance"]
  query = `SELECT * FROM department`;
  connection.query(query, (err, results) => {
      if (err) throw err;

      inquirer.prompt([
          {
              name: 'dept',
              type: 'list',
              choices: deptList,
              message: 'Select the department to remove:'
          }
      ]).then((answer) => {
          connection.query(`DELETE FROM department WHERE ? `, answer.dept)
          start();
      })
  })
}

const viewBudget = () => {
const deptIndex = ["Engineering", "Sales", "Information Technology", "Finance", "Design"]
  inquirer
    .prompt({
      name: "dptList",
      type: "list",
      message: "Choose a department to see the budget",
      choices: deptIndex
    }).then(function (response) {
      var dptList = response.dptList;
      var query = "SELECT name, SUM(salary) FROM department LEFT JOIN role ON department.id = role.department_id INNER JOIN employee ON role.id = employee.role_id GROUP BY ?;"
      connection.query(query, dptList, function (err, res) {
        if (err) {
          console.log(err);
        }
        console.table(res);
        start();
      });
    }
    )
}

function exit() {
  connection.end();
}