'use strict'

const { generateJWT } = require('../helpers/create-jwt');
const Usuarios = require('../models/user.model');
const bcrypt = require('bcrypt');

const createUser = async(req, res) => {
    const {name, email, password} = req.body;
    try{
        let usuario = await Usuarios.findOne({email});
        if(usuario){
            return res.status(400).send({
                message: 'Un usuario ya existe con este correo', 
                ok: false, 
                usuario: usuario,
            });
        }
        usuario = new Usuarios(req.body);

        //Encriptacion de contrasenia
        const saltos = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, saltos);

        //Guardar usuarios 
        usuario = await usuario.save();

        res.status(200).send({
            message: `Usuario ${name} creado correctamente`, 
            ok: true, 
            usuario: usuario,
        })


    }catch(err){
        console.log(err)
        res.status(500).json({
            ok: false, 
            message: `No se ha creado el usuario: ${name}`, 
            error: err,
        });
    }

}

const loginUser = async(req, res) => {
    const {email, password} = req.body;
    try{
        const user = await Usuarios.findOne({email});
        if(!user){
            return res
            .status(400)
            .send({ok: false, message: 'Debe de registrarse'});
        }
        const validPassword = bcrypt.compareSync(
            password, 
            user.password
        )
        if(!validPassword){
            return res 
            .status(400)
            .send({ok: false, message: 'Password incorrecto'});
        }
        const token = await generateJWT(user.id, user.name, user.email);
        res.json({
            ok:  true,
            uId: user.id, 
            name: user.name, 
            email: user.email, 
            token, 
            message: `Usuario logeado correctamente, Bienvenido ${user.name}`
        })
    }catch(err){
        throw new Error(err);
    }
}

const editUser = async(req, res) => {
    try{
        const id = req.params.id;
        const userEdit = {...req.body};
        //Encriptar la contrasenia 
        userEdit.password = userEdit.password
        ? bcrypt.hashSync(userEdit.password, bcrypt.genSaltSync())
        : userEdit.password;

        const userComplete = await Usuarios.findByIdAndUpdate(id, userEdit, {new: true,});

        if(userComplete){
            const token = await generateJWT(userComplete.id, userComplete.name, userComplete.email);
            return res.status(200).send({
                message: 'Perfil actualizado correctamente', userComplete, token
            });
        }else {
            res.status(404).send({
                message: 'Este usuario no existe en la base de datos'
            });
        }
    }catch(err){
        throw new Error(err);
    }
}

const deleteUser = async (req, res) => {
    try{
        //Obtener el id por token 
        const userId = req.user.id;

        //Buscar el usuario para eliminar en la DB
        const client = await Usuarios.findById(userId);

        // Si el cliente no existe, tirara error  
        if(!client){
            return res.status(400).json({message: 'Cliente no encontrado'});
        }

        //Eliminar el cliente en la DB 
        await client.remove();

        res.json({message: 'Cliente eliminado correctamente'})
    }catch(error){
        console.log(error);
        res.status(500).send('Error en el servidor');
    }

}
module.exports = {createUser, loginUser, editUser, deleteUser};