const Study = require('../models/Study');

exports.allStudies = (async (req, res) => {
    try{
        const studies = await Study.find({user: req.user._id});
        res.json(studies);
    }
    catch(err){
        res.json({message:"blad"});
    }
})

//Post new study
exports.newStudy = (async (req, res) => {
    const study = new Study({
        title: req.body.title,
        grades: req.body.grades,
        user : req.user._id,
        date: req.body.date
    });
    try{
        const savedStudy = await study.save();
        res.json(savedStudy);
    }catch(err){
        res.json({message: err});
    }
})

//Get study by id
exports.detailsStudy = (async (req, res) => {
    try{
        const study = await Study.findById(req.params.studyId);
        res.json(study);
    }catch(err){
        res.json(err);
    }
})

//Patch study by id
exports.updateStudy = (async (req, res) => {
    try{
        const patchedStudy = await Study.updateOne(
            {_id: req.params.studyId}, 
            {$set: {title: req.body.title, grades: req.body.grades}}
            );
        res.json(patchedStudy);
    }catch(err){
        res.json(err);
    }
})

//Delete study by id
exports.deleteStudy = (async (req, res) => {
    try{
        const removedStudy = await Study.deleteOne({_id: req.params.studyId});
        res.json(removedStudy);
    }catch(err){
        res.json(err);
    }
})
