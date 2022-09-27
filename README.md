# Employee Management Tracker

## Description

---

This is a command line application designed for the management of a company's employees. Features include the ability to view all the departments, job roles, or even the employees themselves.

## Table of Contents

---

- [Installation](#installation)
- [Usage](#usage)
- [Technology](#technology)
- [Demonstration](#demonstration)
- [Future Development](#future-development)
- [Authors](#authors)
- [Notes](#notes)

## Installation

---

    - Download or clone this repository,
    - Make sure to have Node.js installed,
    - Open up your integrated terminal and type "npm install" or "npm i" to install the required npm packages. (Inquirer, MySQL2, console.table)
    - dotenv is listed as a dependency, however, it's purpose was only to hide my personal credientials, which creates the connection to the MySQL database

## Usage

---

After installation of the dependencies, you should go to line 13 of the index.js file and replace process.env.DB_PASSWORD with your own personal password to login to the MySQL database.

With the built-in database, you can use the application exactly as is. You are welcome to build off the database and change them as necessary for personal usage. Just be aware that if you do intend to be doing more outside of changing the values, it may require some refactoring in the index.js file as needed.

Before initalizing the application, you would need to open up the integrated terminal and type in the following command

    mysql -u root -p

You will then be prompted to input your password from MySQL. From there, you will then run the two following commands to create the database and to provide in data for the tables.

    source db/schema.sql;
    source db/seeds.sql;

Now that the database has been created and the connection has been made, you can now start the application by running the following command in the terminal.

    node index.js

Selecting any of the prompts will direct you to that purpose.

To exit the application...

    - you can either finish through the current prompt and select the Exit option, or
    - press Ctrl + C at anytime to close out the application

## Technology

---

Technology used to build the application:

    - Javascript
    - Node.js
    - Inquirer.js
    - console.table
    - MySQL

## Demonstration

---

[Demonstration Video](https://drive.google.com/file/d/1uhsbcT7Lk1hlUbWAYj5oQZPJ1vTuHJzG/view)

## Future Development

---

Aside from polishing up the user interface...

Intend to add more functionality to this application:

    - Allow the user to delete departments, roles and/or employees
    - View the total utilized budget of the department

## Authors

---

- Tony Tran
  - [GitHub](https://github.com/tonytran97)
