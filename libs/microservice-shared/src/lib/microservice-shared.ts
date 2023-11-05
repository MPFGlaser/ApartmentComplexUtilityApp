export function microserviceShared(): string {
    return 'microservice-shared';
}

export { validate } from './middleware/validate';
export { jwtStrategy } from './config/passport/jwt.strategy';
