
import swaggerJSDoc from 'swagger-jsdoc';

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


   // Swagger definition
   const swaggerOptions = {
       swaggerDefinition: {
           openapi: '3.0.0',
           info: {
               title: 'API Gerenciador de Tarefas',
               version: '1.0.0',
               description: 'API documentation using Swagger',
           },
           servers: [
               {
                   url: `http://localhost:3000`,
               },
           ],
      components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT', 
            },
        },
    },
       },
       apis: [join(__dirname, '../routes/*.js')], 
   };

const swaggerSpec = swaggerJSDoc(swaggerOptions);
export default swaggerSpec;