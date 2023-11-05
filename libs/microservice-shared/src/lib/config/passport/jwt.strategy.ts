import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

if (process.env['JWT_PUBLIC_KEY'] === undefined) {
    throw new Error('JWT_PUBLIC_KEY environment variable not set');
}

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    secretOrKey: process.env['JWT_PUBLIC_KEY'].replace(/\\n/g, '\n'),
    algorithms: ['RS256'],
};

export const jwtStrategy = new JwtStrategy(opts, (jwt_payload, done) => {
    // Verify the JWT payload
    if (jwt_payload?.user) {
        return done(null, jwt_payload.user);
    } else {
        return done(null, false);
    }
});
