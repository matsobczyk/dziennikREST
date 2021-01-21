const router = require('express').Router();
const Study = require('../models/Study');
const verification = require('../middlewares/verifyToken');
const math = require('mathjs');


router.get('/', (req, res) => {
    res.send('Welcome to Statistics for Student Grades app!')
})

router.get('/median', verification, async (req, res) => {
    try{
        const studies = await Study.find({user: req.user._id});
        var result = studies.map(item => {
            var mappedItem = {
                "title": item.title,
                "median": math.median(item.grades)
            }
            return mappedItem;
        })
        res.json(result);
    }
    catch(err){
        res.json(err);
    }
})
router.get('/mean', verification, async (req, res) => {
    try{
        const studies = await Study.find({user: req.user._id});
        var result = studies.map(item => {
            var mappedItem = {
                "title": item.title,
                "mean": math.mean(item.grades)
            }
            return mappedItem;
        })
        res.json(result);
    }
    catch(err){
        res.json(err);
    }
})

module.exports = router;