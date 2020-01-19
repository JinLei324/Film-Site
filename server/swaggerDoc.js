const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        "openapi": '3.0.0', // Specification (optional, defaults to swagger: '2.0')
        "info": {
            "title": 'FilmLyfe-API', // Title (required)
            "version": '1.0.0', // Version (required)
        },
        "servers": [
            {
                "url": "http://localhost:8080",
                "description": "Development server"
            },
            {
                "url": "http://115.187.33.12:9000",
                "description": "Staging server"
            },
        ]
        ,
        "securityDefinations": {
            "bearerAuth": {
                "type": "apiKey",
                "name": "Authorization",
                "scheme": 'bearer',
                "in": "header"
            },
        },
    },
    // Path to the API docs
    apis: ["./app/models/*.js", './app/routes/*.js'],


};
const swaggerSpec = swaggerJSDoc(options);
module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
        explorer: false
    }));
}