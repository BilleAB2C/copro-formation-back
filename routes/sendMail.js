const express = require('express');
const router = express.Router();
const sendMailCtrl = require('../controllers/sendMail');

router.post('/informations', sendMailCtrl.sendMailContact);
router.post('/devis', sendMailCtrl.sendMailDevis);

module.exports = router;
