import dotenv from 'dotenv';

dotenv.config();
const config = {
  jwtSecret: process.env.JWT_SECRET || 'defaultSecret', 
};


export default config;
