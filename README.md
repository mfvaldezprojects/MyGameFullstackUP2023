
MyGameFullstackUP2023
Repo con juego - Fullstack 2023


Instrucciones de Instalación

- Para correr el programa, primero descargue el repositorio con GIT PULL o desde la interfaz web.
  
1. Abra el repositorio en su editor de código preferido y en la consola ejecute NPM INSTALL para que el package manager instale las dependencias necesarias.
2. Añada las variables de entorno: 'PORT' para indicar el puerto local en donde se levantara la app, y 'MONGO_URI' para conectar a la BD en el archivo .env
3. En la terminal, ejecute el comando 'node index.js' para correr el programa. La consola indicara si el progama se esta ejecutando de forma correcta y en que puerto local.
4. Abriendo el navegador, ingresar a 'localhost:7000/' + endpoint, colocando despues de la barra el nombre del endpoint que se desea acceder.

Listado de Endpoints disponibles

Metodo: Get – Endpoint: "/users" 
Devuelve información de Usuarios


Metodo: Post - Endpoint: "/users" – Request body:

{
  username:username;
  password:password;
  mail:mail;
  preferred_name:preferred_name;
  name:name;
  lastname:lastname;
  isActive:isActive;
  role:role;
}
Crear un nuevo usuario

Metodo: Get – Endpoint: "users/:userId"
Obtener un Usuario buscando por su ID

Metodo: Get – Endpoint: "/equipments"
Obtener Trajes

Metodo: Get – Endpoint "/characters"
Obtener Personajes




