
import express from 'express'
import router from './routes/routes.js';
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './docs/swagger.js'
import cors from 'cors'

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export default app;



