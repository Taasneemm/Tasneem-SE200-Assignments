DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS borrowers;

-- Task 1
CREATE TABLE books (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    author VARCHAR(50) NOT NULL,
    publication_year INTEGER,
    isbn VARCHAR(13) UNIQUE,
    price DECIMAL(8,2),
    stock INTEGER
);

CREATE TABLE borrowers (
    borrower_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    registration_date DATE
);


-- Task 2

INSERT INTO books (title, author, publication_year, isbn, price, stock) VALUES
('To Kill a Mockingbird', 'Harper Lee', 1960, '9780446310789', 12.99, 5),
('1984', 'George Orwell', 1949, '9780451524935', 9.99, 8),
('Pride and Prejudice', 'Jane Austen', 1813, '9780141439518', 7.99, 10),
('The Great Gatsby', 'F. Scott Fitzgerald', 1925, '9780743273565', 11.99, 6),
('One Hundred Years of Solitude', 'Gabriel García Márquez', 1967, '9780060883287', 14.99, 4),
('The Catcher in the Rye', 'J.D. Salinger', 1951, '9780316769174', 8.99, 7),
('To the Lighthouse', 'Virginia Woolf', 1927, '9780156907392', 10.99, 3),
('Brave New World', 'Aldous Huxley', 1932, '9780060850524', 11.99, 5),
('The Hobbit', 'J.R.R. Tolkien', 1937, '9780261102217', 13.99, 9),
('Fahrenheit 451', 'Ray Bradbury', 1953, '9781451673319', 9.99, 6);


INSERT INTO borrowers (first_name, last_name, email, registration_date) VALUES
('John', 'Doe', 'john.doe@email.com', '2024-01-15'),
('Jane', 'Smith', 'jane.smith@email.com', '2024-02-03'),
('Michael', 'Johnson', 'michael.j@email.com', '2024-01-22'),
('Emily', 'Brown', 'emily.brown@email.com', '2024-03-10'),
('David', 'Wilson', 'david.wilson@email.com', '2024-02-18'),
('Sarah', 'Taylor', 'sarah.t@email.com', '2024-01-30'),
('Robert', 'Anderson', 'robert.a@email.com', '2024-03-05'),
('Lisa', 'Martinez', 'lisa.m@email.com', '2024-02-12'),
('William', 'Thomas', 'william.t@email.com', '2024-01-19'),
('Jennifer', 'Garcia', 'jennifer.g@email.com', '2024-03-01');


-- Task 3
SELECT *
FROM books
WHERE publication_year > 1950;

SELECT *
FROM borrowers
WHERE EXTRACT(YEAR FROM registration_date) = 2024;

SELECT SUM(stock) AS total_stock
FROM books;

SELECT CONCAT(first_name, ' ', last_name) AS full_name
FROM borrowers;

-- Task 4
SELECT title, ROUND(price * stock, 2) AS inventory_value
FROM books;

SELECT CONCAT(author, ': ', title) AS author_title
FROM books;

SELECT UPPER(title) AS uppercase_title
FROM books;

-- Task 5
SELECT *
FROM books
WHERE price BETWEEN 10 AND 20;

SELECT *
FROM borrowers
WHERE last_name LIKE 'S%';

SELECT *
FROM books
WHERE stock < 5;

-- Task 6

select * from books
WHERE publication_year < 1960 AND price < 10;

SELECT * FROM borrowers
WHERE EXTRACT(YEAR FROM registration_date) = 2024
AND email LIKE '%@email.com';


-- Task 7
UPDATE books
SET price = price * 1.10;

SELECT * FROM books;

DELETE FROM borrowers
WHERE EXTRACT(YEAR FROM registration_date) < 2023;


-- Task 8

SELECT * FROM books
ORDER BY price DESC
LIMIT 5;

SELECT * FROM borrowers
ORDER BY registration_date DESC
LIMIT 5 OFFSET 2;

-- Task 9

SELECT author, COUNT(*) AS book_count
FROM books
GROUP BY author
HAVING COUNT(*) > 2;

SELECT publication_year, ROUND(AVG(price), 2) AS avg_price
FROM books
GROUP BY publication_year
HAVING COUNT(*) > 3;





