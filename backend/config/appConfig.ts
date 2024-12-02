import dotenv from 'dotenv';

dotenv.config();

const config = {
  jwtSecret: process.env.JWT_SECRET || 'defaultSecret', 
  port: 4000,
};

export default config;
