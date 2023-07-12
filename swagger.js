const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Ecommerce de Pelotas',
            version: '1.0.0',
            description: 'Documentación de la API del proyecto de ecommerce de pelotas',
        },
    },
    apis: ['./routes/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = function (app) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
