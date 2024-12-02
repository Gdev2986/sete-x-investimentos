import User from './backend/models/user';

declare namespace Express {
  export interface Request {
    user?: User; // Inclui todas as propriedades do modelo User do Sequelize
  }
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      id: string;
      role: string;
    };
  }
}
