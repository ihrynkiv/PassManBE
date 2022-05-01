module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT || '3005',
  db_port: process.env.PORT || '5432',
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
  db_password: process.env.POSTGRES_PASSWORD || 'root',
  db_host: process.env.POSTGRESL_HOST || 'localhost',
  db_username: process.env.POSTGRES_USERNAME || 'vanya',
  db_name: process.env.POSTGRES_DATABASE || 'passman',
  db_dialect: process.env.POSTGRES_DIALECT || 'postgres',
};