// Crear Server
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 5000;
const URI = process.env.MONGO_URI;
const mongoose = require('mongoose');
const cors = require('cors');

//Utilizar Json en el server
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

//Levantar el server
http.listen(PORT,()=>{
    console.log(`Servidor funcionando. Escuchando en puerto ${PORT}`);
})

// LLamada a los controladores
const UserController = require('./controllers/user');
const EquipmentController = require('./controllers/equipment');
const CharacterController = require('./controllers/character');
const CustomCharacterController = require('./controllers/customCharacter');
const AuthController = require('./controllers/auth');
const Middleware = require('./middleware/auth-middleware');
const MailController = require('./controllers/mail');

//Accesso BD
mongoose.connect(URI, { useNewUrlParser : true, useUnifiedTopology : true })
    .then (()=> {
        console.log("Conexion OK");
    })
    .catch((err)=> console.log(err));
app.use(cors());

//Creacion del Endpoint que devuelve informacion de Usuarios
 /* Para implementar verificacion con Token una vez que tenga el middleware de auth
 app.get("/users", Middleware.verify, async (req, res) => {
*/

app.get("/users", async (req, res) => {
    let limit = 5//req.query.limit;
    let offset = 0//req.query.offset;
    try {
        const results = await UserController.getAllUsers(limit, offset);
        res.status(200).json(results);
    } 
    catch (error) {
        res.status(500).send({"msg":"Se produjo un error. Por favor intente mas tarde"});
        
    }
})

// Endpoint para crear Usuario
app.post("/users", async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let mail= req.body.mail;
    let preferred_name = req.body.preferred_name;
    let name = req.body.name;
    let lastname = req.body.lastname;
    let isActive = req.body.isActive;
    let role = req.body.role;
    try {
        const result = await UserController.addUser(username, password, mail, preferred_name, name, lastname, isActive, role);
        if(result){
            res.status(201).send({"msg": "Usuario creado con exito!"});
        }
        else {
            res.status(409).send({"msg": "El usuario que intenta guardar ya existe."});
        }
    } catch (error) {
        res.status(500).send({"msg":"Error al crear el usuario. Intentelo nuevamene."});
    }
})

// Obtener un Usuario
app.get("/users/:userId", async (req, res) => {
    console.log("Oteniendo usuario id `${userId}`")
    try {
        const results = await UserController.getUser(id);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).send({"msg":"Se produjo un error. Por favor intente mas tarde."});
    }
})

app.post("/validateUser", async (req, res) => {
    let user = req.body.user;
    let password = req.body.password;
    try {
        const results = await UserController.validateUser(user, password);
        if (results.data == null){
            res.status(409).json(results);
        }
        else{
            res.status(201).json(results);
        }
    } catch (error) {
        res.status(500).send({"msg": "Se produjo un error. Por favor intente mas tarde"});
    }
})

// Obener Trajes
app.get("/equipments/:limit", async (req, res) => {
    let limit = req.query.limit;
    let offset = 0
    try {
        const results = await EquipmentController.getAllEquipments(limit, offset);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).send({"msg": "Se produjo un error. Por favor intente mas tarde."});
    }
})

//Obtener Personajes genericos (skins)
app.get("/characters/:limit", async (req, res) => {
    let limit = req.params.limit;
    let offset = 0 
    try {
        const results = await CharacterController.getAllCharacters(limit, offset);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).send({
                    "msg":"Se produjo un error. Por favor intente mas tarde."});
    }
})

//Obtener Personajes personalizado por el usuario
app.get("/customCharacters/:limit", async (req, res) => {
    let limit = req.params.limit;
    let offset = 0
    try {
        const results = await CustomCharacterController.getAllCustomCharacters(limit, offset);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).send({
            "msg": "Se produjo un error. Por favor intente mas tarde."
        });
    }
})

//Obtener Personajes personalizado por el usuario de un usuario
app.get("/customCharacterByUser/:limit/:user", async (req, res) => {    
    let limit = req.params.limit;
    let offset = 0
    let user = req.params.user;
    try {
        const results = await CustomCharacterController.getAllCustomCharactersByUser(limit, offset, user);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).send({
            "msg": "Se produjo un error. Por favor intente mas tarde."
        });
    }
})

//Crea personaje personalizado por el usuario
app.post("/customCharacter", async (req, res) => {
    console.log("/customCharacter")
    console.log(req.body)
    let name = req.body.name;
    let type = req.body.type;
    let gender = req.body.gender;
    let age = req.body.age;
    let image = req.body.image;    
    let item1 = {
                    item: req.body.item1,
                    category: req.body.category1,
                    color: req.body.color1,
                    accesories: req.body.accesories1,
                    traits: req.body.traits1,
                    image: req.body.image1
                 };
    let item2 = {
                    item: req.body.item2,
                    category: req.body.category2,
                    color: req.body.color2,        
                    image: req.body.image2
                };
    let item3 = {
                    item: req.body.item3,
                    category: req.body.category3,
                    color: req.body.color3,
                    image: req.body.image3
                };
    let username = req.body.username;
    try {
        const result = await CustomCharacterController.addCustomCharacter(name, type, gender, age, image, item1, item2, item3, username);
        if (result) {
            res.status(201).send({"msg":"Personaje creado con exito!"});
        } else {
            res.status(409).send({"msg":"El personaje que intenta guardar ya existe"});
        }
    } catch (error) {
        res.status(500).send({"msg":"Error al crear el personaje. Intentelo nuevamene"});
    }
})