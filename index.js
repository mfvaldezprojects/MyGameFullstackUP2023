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
app.use(express.json());


//Levantar el server
http.listen(PORT,()=>{
    console.log(`Servidor funcionando. Escuchando en puerto ${PORT}`);
})


// LLamada a los controladores
const UserController = require('./controllers/user');
const EquipmentController = require('./controllers/equipment');
const CharacterController = require('./controllers/character');
const AuthController = require('./controllers/auth');
const Middleware = require('./middleware/auth-middleware');
const MailController = require('./controllers/mail');



//Accesso BD
/*
const { MongoClient, ServerApiVersion } = require ('mongodb');
const client = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })
client.connect(err => {
    console.log("conectando");
    client.close();
})
const collection = client.db('MyGameDB').collection('users');

*/

mongoose.connect(URI, { useNewUrlParser : true, useUnifiedTopology : true })
    .then (()=> {
        console.log("Conexion OK");
    })
    .catch((err)=> console.log(err));
app.use(cors());
app.use(express.json());




//Creacion del Endpoint que devuelve informacion de Usuarios

/*
app.get ("/users/:offset/:limit", async (req,res) => {

    let { limit = 5, offset = 0 } = req.params;
    console.log(limit);
    try{
        console.log(collection)
        let result = await collection.find().skip(parseInt(offset)).limit(parseInt(limit)).toArray();
        console.log(result);
        res.json({ users: result });
    }
    catch(error){
        console.log("Hubo un error");
        console.log(error);
        let response = { "status" : 500, "message" : "Error de Conexion." };
        res.json( { response : response })
    }
})
*/
 /* Para implementar verificacion con Token una vez que tenga el middleware de auth
 app.get("/users", Middleware.verify, async (req, res) => {
*/

app.get("/users", async (req, res) => {
    console.log("user api")
    let limit = 5//req.query.limit;
    let offset = 0//req.query.offset;
    console.log(limit)
    console.log(offset)
    try {
        const results = await UserController.getAllUsers(limit, offset);
        res.status(200).json(results);
    } 
    catch (error) {
        res.status(500).send("Se produjo un error. Por favor intente mas tarde.")
        
    }
})



// Endpoint para crear Usuario

/*  
app.get("/users/:id", async (req,res) =>{
    let { id = 0 } = req.params;
    console.log(id);
    res.json( { user : result} );
}) */

/*
app.get("users/:id", async (req, res) =>{
    let userID = req.params.id;

    try {
        user = await UserController.getUser(UserID);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send("Se produjo un error.");
    }
})
*/

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
            res.status(201).send("Usuario creado con exito!");
        }
        else {
            res.status(409).send("El usuario que intenta guardar ya existe.")
        }
    } catch (error) {
        res.status(500).send("Error al crear el usuario. Intentelo nuevamene.");
    }
})

// Obtener un Usuario
app.get("/users/:userId", async (req, res) => {
    console.log("Oteniendo usuario id `${userId}`")
    try {
        const results = await UserController.getUser(id);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).send("Se produjo un error. Por favor intente mas tarde.")

    }
})


// Obener Trajes
app.get("/equipments", async (req, res) => {
    try {
        const results = await EquipmentController.getAllEquipments();
        res.status(200).json(results);
    } catch (error) {
        res.status(500).send("Se produjo un error. Por favor intente mas tarde.")
    }
})

//Obtener Personajes
app.get("/characters", async (req, res) => {
    try {
        const results = await CharacterController.getAllCharacters();
        res.status(200).json(results);
    } catch (error) {
        res.status(500).send("Se produjo un error. Por favor intente mas tarde.")
    }
})