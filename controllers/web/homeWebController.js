const LearningPath = require('../../models/mongodb/learningPathModel');
const seedPaths = require('../../utils/seed-paths');

module.exports = {
    home: async (req, res) => {
        const learningPaths = await LearningPath.find().lean();

        /* seedPaths.seedPaths(); */

        req.session.flash = {
            type: 'success',
            message: 'Welcome to KodCampus',
        };

        res.render('home', { title: 'KodCampus Start', learningPaths });
    },
};
