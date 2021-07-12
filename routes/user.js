const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const userCtrl = require('../controllers/user');

router.post('/', userCtrl.createUser);
router.get('/:id', userCtrl.getUser);
router.get('/', userCtrl.getAllUsers);
router.post('/login', userCtrl.login);
router.put('/:id', userCtrl.modifyUser);
router.delete('/:id', userCtrl.deleteUser);

module.exports = router;
