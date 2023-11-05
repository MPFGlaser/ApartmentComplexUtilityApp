import { Strategy as LocalStrategy } from 'passport-local';
import userService from '../../services/userService';

export const localStrategy = new LocalStrategy(
    { usernameField: 'email' },
    (email, password, done) => {
        // Check if the email exists
        userService.checkIfEmailExists(email).then((exists) => {
            if (!exists) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            // Get the user by email
            userService.getUserByEmail(email).then((user) => {
                userService
                    // Check if the password matches
                    .verifyPassword(user.password, password)
                    .then((isMatch) => {
                        if (isMatch) {
                            userService.generateToken(user).then((token) => {
                                return done(null, token);
                            });
                        } else {
                            return done(null, false, {
                                message: 'Incorrect password.',
                            });
                        }
                    });
            });
        });
    }
);
