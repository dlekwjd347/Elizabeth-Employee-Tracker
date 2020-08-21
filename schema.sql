DROP DATABASE IF EXISTS employee_tracker_db;

CREATE DATABASE employee_tracker_db;

USE employee_tracker_db; 

CREATE TABLE department (
id INT AUTO_INCREMENT,
name VARCHAR(30) NOT NULL,
PRIMARY KEY(id)
);

CREATE TABLE role (
id INT auto_increment,
title VARCHAR(30) NOT NULL,
salary decimal(10,4) NOT NULL,
department_id INT NOT NULL,
PRIMARY KEY(id)
FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee (
id INT auto_increment, 
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT, 
manager_id INT NULL,
PRIMARY KEY(id)
FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE CASCADE
);