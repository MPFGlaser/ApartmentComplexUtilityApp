import userService from '../services/userService';

export const registerController = (req, res) => {
    userService
        .registerUser(req.body)
        .then((result) => res.send(result))
        .catch((error) => res.status(500).send(error));
};
