const LearningPath = require('../../models/mongodb/learnPathModel');

module.exports = {
    home: async (req, res) => {
        const learningPaths = await LearningPath.find().lean();

        req.session.flash = {
            type: 'success',
            message: 'Welcome to KodCampus',
        };

        res.render('home', { title: 'KodCampus Start', learningPaths });
    },
};
