CREATE TABLE users (
  id VARCHAR(212) PRIMARY KEY NOT NULL,
  created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (id) VALUES ('abc123');
INSERT INTO users (id) VALUES ('5bb0259bc3baed1adc9a096c');

DROP TABLE users;