import 'express'; // Garante a importação correta de tipos do Express

declare namespace Express {
  export interface Request {
    user?: {
      id: string;
      role: string;
    };
  }
}

