export const loginController = (req, res) => {
    res.json({ token: req.user });
};
