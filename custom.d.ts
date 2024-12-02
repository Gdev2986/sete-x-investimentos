import 'express'; // Garante a importação correta de tipos do Express

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
      };
    }
  }
}
