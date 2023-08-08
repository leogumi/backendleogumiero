const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.post('/premium/:uid', usersController.actualizarRolPremium);

const express = require('express');
const usersController = require('../controllers/usersController');
const uploadDocuments = require('../middlewares/uploadDocuments');

router.post('/:uid/documents', uploadDocuments.array('documents'), usersController.subirDocumentos);

module.exports = router;
