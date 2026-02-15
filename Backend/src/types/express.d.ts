//Este trozo de código sirve para que exista la propiedad "usuario" en el JWT en los requests.
import { JwtPayload } from './auth';

declare global {
  namespace Express {
    interface Request {
      usuario?: JwtPayload;
    }
  }
}