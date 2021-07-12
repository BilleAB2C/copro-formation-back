const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const adminCtrl = require('../controllers/admin');

router.post('/login', adminCtrl.login);
router.post('/', adminCtrl.createAdmin);
router.get('/:id', auth.auth(['admin']), adminCtrl.getAdmin);
router.put('/:id', auth.auth(['admin']), adminCtrl.modifyAdmin);

module.exports = router;
