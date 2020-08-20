USE employee_db;

----- Department Seeds -----

INSERT INTO department (name) VALUES ("Engineering");
INSERT INTO department (name) VALUES ("Sales");
INSERT INTO department (name) VALUES ("Information Technology");
INSERT INTO department (name) VALUES ("Finance");

----- Role Seeds -----

INSERT INTO role (title, salary, department_id) VALUES ("Lead Engineer", 70, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Accountant", 50, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Salespersom", 50, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Software Engineer", 100, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Sales Lead", 100, 4);

----- Employees Seeds -----

INSERT INTO employee (first_name, last_name, role_id) VALUES ("John", "Smith", 2);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Layla", "Mouse", 1);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Adam", "Fortnite", 3);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Jane", "Doe", 4);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Wilson", "Ball", 5);