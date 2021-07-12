const express = require('express');
const router = express.Router();
const inscriptionCtrl = require('../controllers/inscription');
const auth = require('../middlewares/auth');

router.get('/:id', auth.auth(['admin', 'user']), inscriptionCtrl.getInscription);
router.get('/', auth.auth(['admin']), inscriptionCtrl.getAllInscriptions);
router.put('/by_user/:id_user', auth.auth(['admin', 'user']), inscriptionCtrl.getInscriptionsByUser);

router.post('/', auth.auth(['admin', 'user']), inscriptionCtrl.createInscription);
router.put('/:id', auth.auth(['admin', 'user']), inscriptionCtrl.modifyInscription);
router.put('/:id', auth.auth(['admin', 'user']), inscriptionCtrl.cancelInscription);
router.get('/by_cathegorie/:id_cathegorie', auth.auth(['admin']), inscriptionCtrl.getInscriptionsByCategorie);
router.get('/by_session/:id_session', auth.auth(['admin']), inscriptionCtrl.getInscriptionsBySession);
router.get('/by_formation/:id_formation', auth.auth(['admin']), inscriptionCtrl.getInscriptionsByFormation);

module.exports = router;
