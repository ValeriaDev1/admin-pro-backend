const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generateJWT } = require('./helpers/jwt');

const login = async(req, res = response) => {
    const { email, password } = req.body;

    try {
        //verificar email
        const userDB = await Usuario.findOne({ email });
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: "Email o contraseña no valida"
            })
        }
        //verificar password
        const validPassword = bcrypt.compareSync(password, userDB.password);
        if (!validPassword) {
            return res.status(404).json({
                ok: false,
                msg: "contraseña no valida"
            })
        }
        //Generar Token
        const token = await generateJWT(userDB.id);
        res.json({
            ok: true,
            msg: token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Algo salio mal! , hable con el administrador"
        })
    }
}

module.exports = {
    login
}