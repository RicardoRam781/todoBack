CREATE TABLE todo(
    id SERIAL PRIMARY KEY ,
    body VARCHAR(255),
    status BOOLEAN
);

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    uid TEXT,
    email VARCHAR(255)
);

ALTER TABLE todo 
ADD COLUMN id_user INT ;

ALTER TABLE todo
ADD CONSTRAINT id_user
FOREIGN KEY (id_user)
REFERENCES users(id);