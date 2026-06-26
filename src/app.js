import express from 'express'
import router from './routes/routes.js';
import './config/testConnection.js'

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(router);

app.listen(PORT, () => {console.log(`Server online at port ${PORT}`)} )


