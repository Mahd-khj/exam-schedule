// @ts-nocheck
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const path = require('path');

// __dirname is available in CommonJS by default

// Load .env
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  }
);

;(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully!');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
})();
export default sequelize;
