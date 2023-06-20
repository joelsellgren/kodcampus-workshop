const User = require('../../models/mysql/userModel');

module.exports = {
    home: async (req, res) => {
        res.render('login/home', { title: 'Logga in / Registrera' });
    },

    registerUser: async (req, res) => {
        const username = req.body.username;

        const existingUser = await User.findOne({ where: { username } });

        if (existingUser !== null) {
            res.redirect('/login');
        }

        User.create({
            username,
            passwordHash: 'invalid hash',
        });
        res.render('login/home');
    },
};
