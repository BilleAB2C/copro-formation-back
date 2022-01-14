const express = require('express');
const router = express.Router();
const formationCtrl = require('../controllers/formation');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

router.get('/for_home', formationCtrl.getFormationsForHome);
router.get('/:id', formationCtrl.getFormation);
router.get('/image/images/:id', formationCtrl.getFormationImage);
router.get('/pdf/PDFs/:id', formationCtrl.getFormationPDF);

router.get('/', formationCtrl.getAllFormations);
router.get('/by_cathegorie/:id_cathegorie', formationCtrl.getFormationByCategorie);
router.post('/', auth.auth(['admin']), formationCtrl.createFormation);

router.put('/:id', auth.auth(['admin']), formationCtrl.modifyFormation);
router.put('/image/:id', auth.auth(['admin']), formationCtrl.modifyImageFormation);
router.put('/pdf/:id', auth.auth(['admin']), formationCtrl.modifyPDFFormation);

router.delete('/:id', auth.auth(['admin']), formationCtrl.deleteFormation);
router.get('/image/:id', formationCtrl.getFormationImage);

module.exports = router;
