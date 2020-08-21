USE employee_db;

----- Department Seeds -----

INSERT INTO department (name) VALUES ("Engineering");
INSERT INTO department (name) VALUES ("Sales");
INSERT INTO department (name) VALUES ("Information Technology");
INSERT INTO department (name) VALUES ("Finance");

----- Role Seeds -----

INSERT INTO role (title, salary, department_id) VALUES ("Lead Engineer", 70, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Accountant", 50, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Salesperson", 50, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Software Engineer", 100, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Sales Lead", 100, 4);

----- Employees Seeds -----

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Elizabeth", "Lee", 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Johnson", "Pham", 4, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Sarah", "Abouelela", 3, 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Bobby", "Sporman", 5, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Andrea", "Gamez", 1, 4);