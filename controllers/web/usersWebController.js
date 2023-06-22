const User = require('../../models/mysql/userModel');
const userLearningPathsModel = require('../../models/mongodb/userLearningPathModel');

module.exports = {
    home: async (req, res) => {
        const user = await User.findOne({
            where: { username: req.params.username }
        });

        if (!user) {
            res.render('error', { message: 'Användaren finns inte' });
        }

        const userLearningPaths = await userLearningPathsModel
            .findOne({
                userId: user.userId
            })
            .lean();

        const paths = userLearningPaths ? userLearningPaths.learningPaths : [];

        if (paths) {
            paths.forEach(path => {
                const completedSteps = path.learningPath.steps.filter(
                    step => step.done
                ).length;

                const totalSteps = path.learningPath.steps.length;

                path.progress = (completedSteps / totalSteps) * 100;

                path.completedSteps = completedSteps;
                path.totalSteps = totalSteps;
            });
        }

        res.render('users/single-user', {
            title: user.username,
            paths
        });
    }
};
