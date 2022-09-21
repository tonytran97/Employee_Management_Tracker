DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
    id INT NOT NULL,
    department_name VARCHAR(30) NOT NULL, 
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT,
    title VARCHAR(30) NOT NULL, 
    salary DECIMAL(18,2) NOT NULL,
    department_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES department(id)
    ON DELETE SET NULL
    
);

CREATE TABLE employee (
    id INT, 
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL, 
    role_id INT, 
    manager_id INT,
    FOREIGN KEY (employee_id) REFERENCES role(id)
    ON DELETE SET NULL
)