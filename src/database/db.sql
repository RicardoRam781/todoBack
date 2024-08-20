CREATE TABLE todo(
    id SERIAL PRIMARY KEY ,
    body VARCHAR(255),
    status BOOLEAN
);

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(255)
)