import express from 'express'
import router from './routes/routes.js';
import sequelize from './config/database.js'
import User from './model/User.js'

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(router);

async function startServer(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        User.sync()
        console.log("Table User create")
        app.listen(PORT, () => {console.log(`Server online at port ${PORT}`)} )
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

startServer();



