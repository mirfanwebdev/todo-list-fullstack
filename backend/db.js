const { Pool } = require("pg");

const pool = new Pool({
  user: "your_postgres_user",
  host: "localhost",
  database: "todo_db",
  password: "your_postgres_password",
  port: 5432,
});

module.exports = pool;
