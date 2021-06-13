USE distyle;

-- TABLE USER
-- all pasword wil be encrypted using SHA1
CREATE TABLE users (
  id INT(11) NOT NULL,
  email VARCHAR(150) NOT NULL,
  username VARCHAR(16),
  password VARCHAR(60) NOT NULL,
  fullname VARCHAR(100) NOT NULL,
  role VARCHAR(20),
  logo VARCHAR(100),
  status VARCHAR(30)
);

ALTER TABLE users
  ADD PRIMARY KEY (id);

ALTER TABLE users
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

ALTER TABLE users
	ADD created_at timestamp NOT NULL DEFAULT current_timestamp;
DESCRIBE users;

SELECT * FROM users;

-- LINKS TABLE
CREATE TABLE links (
  id INT(11) NOT NULL,
  title VARCHAR(150) NOT NULL,
  url VARCHAR(255) NOT NULL,
  description TEXT,
  user_id INT(11),
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
);

ALTER TABLE links
  ADD PRIMARY KEY (id);

ALTER TABLE links
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

	
DESCRIBE links;


ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'andresdiaz123';

SELECT * FROM links;
SELECT * FROM users;
