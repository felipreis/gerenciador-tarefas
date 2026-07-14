import 'dotenv/config'
import app from './app.js';
import sequelize from './config/database.js'
import User from './model/User.js'
import Project from './model/Project.js'
import Task from './model/Task.js';

const PORT = 3000;

async function startServer(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await User.sync();
        await Project.sync();
        await Task.sync();
        app.listen(PORT, () => {console.log(`Server online at port ${PORT}`)})
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

startServer();