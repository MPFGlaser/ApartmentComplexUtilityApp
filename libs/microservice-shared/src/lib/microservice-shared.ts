export function microserviceShared(): string {
  return 'microservice-shared';
}

export { validate } from './middleware/validate';
export { authenticated } from './middleware/authenticateToken';
export { auth } from './config/firebase-admin';
export { jwtStrategy } from './config/passport/jwt.strategy';
