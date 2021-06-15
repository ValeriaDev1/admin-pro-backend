const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { bdconection, dbConnection } = require('./database/config');
//Crear servidor express
const app = express();

//Configurar CORS
app.use(cors());

//base de datos
dbConnection();
// Rutas 
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'hola mundo'
    })

})
app.listen(process.env.PORT, () => {
    console.log('Servidor corrriendo en puerto' + process.env.PORT);
})