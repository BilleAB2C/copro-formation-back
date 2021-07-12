const express = require('express');
const router = express.Router();
const sessionCtrl = require('../controllers/session');
const auth = require('../middlewares/auth');

router.get('/:id', sessionCtrl.getSession);
router.get('/', sessionCtrl.getAllSessions);
router.post('/', auth.auth(['admin']), sessionCtrl.createSession);
router.put('/:id', sessionCtrl.modifySession);
router.delete('/:id', sessionCtrl.deleteSession);
router.get('/by_cathegorie/:id_cathegorie', sessionCtrl.getSessionsByCategorie);
router.get('/by_formation/:id_cathegorie', sessionCtrl.getSessionsByFormation);
router.get('/by_date/:date', sessionCtrl.getSessionsByDate);

module.exports = router;
