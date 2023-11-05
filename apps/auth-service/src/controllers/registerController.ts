import userService from '../services/userService';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const registerController = (req, res, next) => {
    userService
        .registerUser(req.body)
        .then((result) => res.send(result))
        .catch((error) => res.status(500).send(error));
};
