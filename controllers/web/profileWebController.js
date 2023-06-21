const User = require('../../models/mysql/userModel');
const { requireAuth } = require('../../utils/passport');

module.exports = {
    home: async (req, res) => {
        res.render('profile/home', { title: 'Din Profil' });
    },
};
