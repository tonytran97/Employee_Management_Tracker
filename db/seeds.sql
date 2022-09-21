INSERT INTO department (name)
VALUES ('Sales'),
       ('Engineering'),
       ('Finance'),
       ('Legal');

-- mysql> select * from department;
-- +----+-------------+
-- | id | name        |
-- +----+-------------+
-- |  1 | Sales       |
-- |  2 | Engineering |
-- |  3 | Finance     |
-- |  4 | Legal       |
-- +----+-------------+

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Lead', 100000, 1),
       ('Salesperson', 80000, 1),
       ('Lead Engineer', 150000, 2),
       ('Software Engineer', 120000, 2),
       ('Account Manager', 160000, 3),
       ('Accountant', 125000, 3),
       ('Legal Team Lead', 250000, 4),
       ('Lawyer', 190000, 4);

-- mysql> select * from role;       
-- +----+-------------------+-----------+---------------+
-- | id | title             | salary    | department_id |
-- +----+-------------------+-----------+---------------+
-- |  1 | Sales Lead        | 100000.00 |             1 |
-- |  2 | Salesperson       |  80000.00 |             1 |
-- |  3 | Lead Engineer     | 150000.00 |             2 |
-- |  4 | Software Engineer | 120000.00 |             2 |
-- |  5 | Account Manager   | 160000.00 |             3 |
-- |  6 | Accountant        | 125000.00 |             3 |
-- |  7 | Legal Team Lead   | 250000.00 |             4 |
-- |  8 | Lawyer            | 190000.00 |             4 |
-- +----+-------------------+-----------+---------------+

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Joseph', 'Wong', 1, NULL),
       ('Amanda', 'May', 2, 1),
       ('Brent', 'Lawrence', 3, NULL),
       ('Linda', 'Foster', 4, 3),
       ('Jack', 'Davis', 5, NULL),
       ('Phillip', 'Chan', 6, 5), 
       ('Michelle', 'Rivera', 7, NULL),
       ('Kathleen', 'Key', 8, 7);

-- mysql> select * from employee;   
-- +----+------------+-----------+---------+------------+
-- | id | first_name | last_name | role_id | manager_id |
-- +----+------------+-----------+---------+------------+
-- |  1 | Joseph     | Wong      |       1 |       NULL |
-- |  2 | Amanda     | May       |       2 |          1 |
-- |  3 | Brent      | Lawrence  |       3 |       NULL |
-- |  4 | Linda      | Foster    |       4 |          3 |
-- |  5 | Jack       | Davis     |       5 |       NULL |
-- |  6 | Phillip    | Chan      |       6 |          5 |
-- |  7 | Michelle   | Rivera    |       7 |       NULL |
-- |  8 | Kathleen   | Key       |       8 |          7 |
-- +----+------------+-----------+---------+------------+