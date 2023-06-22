const userLearningPathModel = require('../../models/mongodb/userLearningPathModel');

module.exports = {
    completeStep: async (req, res) => {
        const { pathId, stepId, done } = req.body;
        const userId = req.user.userId;

        const userLearningPath = await userLearningPathModel.findOne({
            userId,
        });

        console.log(userLearningPath.learningPaths);
        const learningPath = userLearningPath.learningPaths.find(
            (x) => x._id == pathId
        );

        const step = learningPath.learningPath.steps.find(
            (x) => x._id == stepId
        );

        step.done = done;

        await userLearningPath.save();

        res.sendStatus(200);
    },
};
