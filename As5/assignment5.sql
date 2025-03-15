-- Question 1
WITH employee_country_sales AS (
    SELECT
        CONCAT(e.first_name, ' ', e.last_name) AS full_name,
        o.ship_country,
        SUM(od.unit_price * od.quantity * (1 - od.discount)) AS total_order_value,
        RANK() OVER (
            PARTITION BY o.ship_country
            ORDER BY SUM(od.unit_price * od.quantity * (1 - od.discount)) DESC
        ) AS country_rank
    FROM employees e
    JOIN orders o
        ON e.employee_id = o.employee_id
    JOIN order_details od
        ON o.order_id = od.order_id
    GROUP BY
        e.employee_id, e.first_name, e.last_name, o.ship_country
)
SELECT
    full_name,
    ship_country,
    total_order_value,
    country_rank
FROM employee_country_sales
WHERE country_rank <= 3
ORDER BY ship_country, country_rank;

-- Question 2
WITH product_sales AS (
    SELECT
        p.Product_Name,
        c.Category_Name,
        SUM(od.Unit_Price * od.Quantity * (1 - od.Discount)) AS total_sales
    FROM Products p
    JOIN Categories c
        ON p.Category_ID = c.Category_ID
    JOIN Order_Details od
        ON p.Product_ID = od.Product_ID
    GROUP BY p.Product_Name, c.Category_Name
)
SELECT
    Product_Name AS product_name,
    Category_Name AS category_name,
    total_sales,
    (total_sales / SUM(total_sales) OVER (PARTITION BY Category_Name)) * 100 AS category_percentage,
    (total_sales / SUM(total_sales) OVER ()) * 100 AS overall_percentage
FROM product_sales
ORDER BY Category_Name, total_sales DESC;

-- Question 3
SELECT
    c.Company_Name AS company_name,
    COUNT(DISTINCT cat.Category_ID) AS categories_ordered
FROM Customers c
JOIN Orders o 
    ON c.Customer_ID = o.Customer_ID
JOIN Order_Details od 
    ON o.Order_ID = od.Order_ID
JOIN Products p 
    ON od.Product_ID = p.Product_ID
JOIN Categories cat 
    ON p.Category_ID = cat.Category_ID
GROUP BY c.Company_Name
HAVING COUNT(DISTINCT cat.Category_ID) = (SELECT COUNT(*) FROM Categories)
ORDER BY c.Company_Name;


-- Question 4
WITH employee_orders AS (
    SELECT
        e.employee_id,
        CONCAT(e.first_name, ' ', e.last_name) AS full_name,
        o.order_date,
        SUM(od.unit_price * od.quantity * (1 - od.discount)) AS total_order_value
    FROM employees e
    JOIN orders o
        ON e.employee_id = o.employee_id
    JOIN order_details od
        ON o.order_id = od.order_id
    GROUP BY e.employee_id, e.first_name, e.last_name, o.order_date
)
SELECT
    full_name,
    order_date,
    total_order_value,
    AVG(total_order_value) OVER (
        PARTITION BY employee_id
        ORDER BY order_date
        ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
    ) AS three_order_moving_avg
FROM employee_orders
ORDER BY full_name, order_date;

-- Question 5
WITH product_sales AS (
  SELECT
    p.Product_Name AS product_name,
    c.Category_Name AS category_name,
    SUM(od.Unit_Price * od.Quantity * (1 - od.Discount)) AS total_sales
  FROM Products p
  JOIN Order_Details od 
    ON p.Product_ID = od.Product_ID
  JOIN Categories c 
    ON p.Category_ID = c.Category_ID
  GROUP BY p.Product_Name, c.Category_Name
),
ranked_products AS (
  SELECT
    product_name,
    category_name,
    total_sales,
    PERCENT_RANK() OVER (
      PARTITION BY category_name 
      ORDER BY total_sales DESC
    ) * 100 AS percentile_rank
  FROM product_sales
)
SELECT
  product_name,
  category_name,
  total_sales,
  percentile_rank
FROM ranked_products
WHERE percentile_rank <= 25
ORDER BY category_name, percentile_rank;