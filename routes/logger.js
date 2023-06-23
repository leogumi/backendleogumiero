// routes/logger.js

const express = require('express');
const router = express.Router();
const developmentLogger = require('../utils/logger').developmentLogger;
const productionLogger = require('../utils/logger').productionLogger;

router.get('/loggerTest', (req, res) => {
    // Ejemplos de logs para probar
    developmentLogger.debug('Este es un mensaje de debug');
    developmentLogger.info('Este es un mensaje de información');
    developmentLogger.warn('Este es un mensaje de advertencia');
    developmentLogger.error('Este es un mensaje de error');
    developmentLogger.fatal('Este es un mensaje fatal');

    // ...

    res.sendStatus(200);
});

module.exports = router;
