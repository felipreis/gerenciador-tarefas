
import express from 'express'
import router from './routes/routes.js';
import sequelize from './config/database.js'
import User from './model/User.js'
import Project from './model/Project.js'
import Task from './model/Task.js';
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './docs/swagger.js'



const app = express();
const PORT = 3000;

app.use(express.json());
app.use(router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

async function startServer(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await User.sync();
        await Project.sync();
        await Task.sync();
        console.log("Table User create")
        app.listen(PORT, () => {console.log(`Server online at port ${PORT}`)} )
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

startServer();



