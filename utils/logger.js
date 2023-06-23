// utils/logger.js

const winston = require('winston');
const { LOG_LEVELS } = require('../config');

// Configurar el logger de desarrollo
const developmentLogger = winston.createLogger({
    level: 'debug',
    transports: [
        new winston.transports.Console(),
    ],
});

// Configurar el logger de producción
const productionLogger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'errors.log', level: 'error' }),
    ],
});

module.exports = {
    developmentLogger,
    productionLogger,
};
