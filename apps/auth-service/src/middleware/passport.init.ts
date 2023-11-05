import passport from 'passport';
import { jwtStrategy } from '@acua/microservice-shared';
import { localStrategy } from '../config/passport/local.strategy';

passport.use(localStrategy);
passport.use(jwtStrategy);

export default passport;
