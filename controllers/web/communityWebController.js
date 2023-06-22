const User = require('../../models/mysql/userModel');

module.exports = {
    home: async (req, res) => {
        let users = await User.findAll();

        users = users.map((user) => user.dataValues);

        res.render('community/home', { title: 'Codecampus Community', users });
    },
};
