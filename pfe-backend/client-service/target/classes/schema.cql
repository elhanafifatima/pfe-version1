CREATE KEYSPACE IF NOT EXISTS vitalis_keyspace
WITH replication = {
    'class': 'SimpleStrategy',
    'replication_factor': '1'
};

USE vitalis_keyspace;

CREATE TABLE IF NOT EXISTS clients (
    id TEXT PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    phone TEXT,
    birth_date TEXT,
    password TEXT
);

CREATE INDEX IF NOT EXISTS ON clients (email);

