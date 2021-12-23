const express = require('express');
const router = express.Router();
const formationCtrl = require('../controllers/formation');
const auth = require('../middlewares/auth');

router.get('/for_home', formationCtrl.getFormationsForHome);
router.get('/:id', formationCtrl.getFormation);
router.get('/', formationCtrl.getAllFormations);
router.get('/by_cathegorie/:id_cathegorie', formationCtrl.getFormationByCategorie);
router.post('/', auth.auth(['admin']), formationCtrl.createFormation);
router.put('/:id', auth.auth(['admin']), formationCtrl.modifyFormation);
router.delete('/:id', auth.auth(['admin']), formationCtrl.deleteFormation);

module.exports = router;
