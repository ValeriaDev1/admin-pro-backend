const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
//const { validationResult } = require('express-validator');
const { generateJWT } = require('./helpers/jwt');

const getUser = async(req, res) => {
    const usuario = await Usuario.find({}, 'nombre email role google');

    res.json({
        ok: true,
        usuario,
        uid: req.uid
    })
}
const createUsers = async(req, res = response) => {

    const { email, password } = req.body;
    try {

        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }

        const usuario = new Usuario(req.body);
        //encriptar contraseña 
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        //guarda usuario
        await usuario.save();
        //Generar Token
        const token = await generateJWT(usuario.id);

        res.json({
            ok: true,
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs "
        })
    }
}

const updateUsers = async(req, res = response) => {
    //TODO : validar token y comprobar si el usuario es correcto

    const uid = req.params.id;
    try {
        const userDB = await Usuario.findById(uid);
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }
        const { password, google, email, ...campos } = req.body;

        if (userDB.email === email) {
            delete campos.email;
        } else {
            const existeEmail = await Usuario.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Exixte un usuario con ese email'
                })
            }
        }
        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });
        res.json({
            ok: true,
            usuarioActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado"
        })
    }
}

const deleteUser = async(req, res = response) => {
    const uid = req.params.id;
    try {
        const userDB = await Usuario.findById(uid);
        if (!userDB) {
            res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            })
        }
        await Usuario.findByIdAndDelete(uid);
        res.json({
            ok: true,
            uid
        })




    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}





module.exports = {
    getUser,
    createUsers,
    updateUsers,
    deleteUser
}