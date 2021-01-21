const router = require('express').Router();
const verification = require('../middlewares/verifyToken');
const StudiesController = require('../controllers/studies');
const statisticsRoute = require('../routes/statistics');
router.use('/statistics', statisticsRoute);


router.get('/', verification, StudiesController.allStudies);
router.post('/', verification, StudiesController.newStudy);
router.get('/:studyId', verification,  StudiesController.detailsStudy);
router.patch('/:studyId', verification,  StudiesController.updateStudy);
router.delete('/:studyId', verification,  StudiesController.deleteStudy);

module.exports = router;