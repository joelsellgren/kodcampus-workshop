module.exports = {
    home: async (req, res) => {
        const learningPaths = await LearningPath.find().lean();
        res.render('index', { title: 'KodCampus Start', learningPaths });
    },
};
