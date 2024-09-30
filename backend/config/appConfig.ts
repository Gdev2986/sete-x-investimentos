interface AppConfig {
    port: string | number;
    jwtSecret: string;
  }
  
  const config: AppConfig = {
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || 'mysecretkey',
  };
  
  export default config;
  