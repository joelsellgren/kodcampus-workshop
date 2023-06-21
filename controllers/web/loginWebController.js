const User = require('../../models/mysql/userModel');
const bcrypt = require('bcrypt');

module.exports = {
    home: async (req, res) => {
        res.render('login/home', { title: 'Logga in / Registrera' });
    },

    registerUser: async (req, res) => {
        const username = req.body.username;

        const existingUser = await User.findOne({ where: { username } });

        if (existingUser) {
            req.session.flash = {
                type: 'danger',
                message: 'User already exists',
            };
            return res.redirect('/login');
        }

        if (req.body.password !== req.body.confirmPassword) {
            req.session.flash = {
                type: 'danger',
                message: 'Passwords do not match',
            };
            return res.redirect('/login');
        }

        const passwordHash = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({ username, passwordHash });

        if (user) {
            req.session.flash = { type: 'success', message: 'User created' };
        }

        res.redirect('/login');
    },
    loginUser: async (req, res) => {
        res.redirect('/profile');
    },
};
