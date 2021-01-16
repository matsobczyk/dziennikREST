const express = require('express');
const router = express.Router();
const Study = require('../models/Study');

//Get all studies
router.get('/', async (req, res) => {
    try{
        const studies = await Study.find();
        res.json(studies);
    }
    catch(err){
        res.json({message:"blad"});
    }
})

//Post new study
router.post('/', async (req, res) => {
    const study = new Study({
        title: req.body.title,
        grades: req.body.grades,
        user : req.body.user,
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
router.get('/:studyId', async (req, res) => {
    try{
        const study = await Study.findById(req.params.studyId);
        res.json(study);
    }catch(err){
        res.json(err);
    }
})

//Patch study by id
router.patch('/:studyId', async (req, res) => {
    try{
        const patchedStudy = await Study.updateOne(
            {_id: req.params.studyId}, 
            {$set: {title: req.body.title}}
            );
        res.json(patchedStudy);
    }catch(err){
        res.json(err);
    }
})

//Delete study by id
router.delete('/:studyId', async (req, res) => {
    try{
        const removedStudy = await Study.deleteOne({_id: req.params.studyId});
        res.json(removedStudy);
    }catch(err){
        res.json(err);
    }
})

//Delete all studies
router.delete("/", async (req, res) =>{
    try{
        const removedStudies = await Study.deleteMany({ title: /^mat/ });
        res.json(removedStudies);
    }catch(err){
        res.json(err);
    }
    
})

module.exports = router;