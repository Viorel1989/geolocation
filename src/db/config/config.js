require("dotenv").config();

module.exports = {
  development: {
    // username: process.env.POSTGRES_USER,
    // password: process.env.POSTGRES_PASSWORD,
    // database: process.env.POSTGRES_DB,
    // host: "host.docker.internal",
    dialect: "postgres",
    use_env_variable: "DATABASE_URL",
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
  },
};
