const User = require('../../models/mysql/userModel');
const bcrypt = require('bcrypt');

module.exports = {
    home: async (req, res) => {
        if (req.user) {
            return res.redirect('/profile');
        }
        res.render('login/home', { title: 'Logga in / Registrera' });
    },

    registerUser: async (req, res) => {
        const username = req.body.username;

        const existingUser = await User.findOne({ where: { username } });

        if (existingUser) {
            req.session.flash = {
                type: 'danger',
                message: 'User already exists'
            };
            return res.redirect('/login');
        }

        const password = req.body.password;
        const confirmPassword = req.body['confirm-password'];

        if (password !== confirmPassword) {
            req.session.flash = {
                type: 'danger',
                message: 'Passwords do not match'
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
        req.session.flash = { type: 'success', message: 'Du är nu inloggad!' };
        res.redirect('/profile');
    }
};
