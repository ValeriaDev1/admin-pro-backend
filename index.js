const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { bdconection, dbConnection } = require('./database/config');
//Crear servidor express
const app = express();

//Configurar CORS
app.use(cors());

//lectura y parseo del body 
app.use(express.json());
//base de datos
dbConnection();
// Rutas 

app.use('/api/users', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/hospitals', require('./routes/hospital'));
app.use('/api/doctors', require('./routes/doctor'));



app.listen(process.env.PORT, () => {
    console.log('Servidor corrriendo en puerto' + process.env.PORT);
})