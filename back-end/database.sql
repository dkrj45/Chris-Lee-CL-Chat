CREATE TABLE USERS(
    id SERIAL PRIMARY KEY,
    username VARCHAR NOT NULL UNIQUE,
    passhash VARCHAR NOT NULL
);

INSERT INTO users(username, passhash) values($1,$2);