
# MyGameFullstackUP2023

Repositorio con juego de rol - Fullstack 2do Cuatrimestre 2023


## Deployment

__Instrucciones de instalación__

_Descargar repositorio con __git pull__ https://github.com/mfvaldezprojects/MyGameFullstackUP2023.git o desde la opcion para descargar el codigo en la web_


#### Paquetes requeridos para el funcionamiento del proyecto

```bash
  npm install
```

#### Añadir las variables de entorno

Para indicar el puerto local en donde se levantara la app 

`PORT`



Para conectar a la BD en el archivo __.env__

`MONGO_URI`



#### Correr el programa en LocalHost

La consola indicara si el progama se esta ejecutando de forma correcta y en el puerto local, de acuerdo a lo seteado en el __.env__

```bash
  node index.js
```








## API Reference

En el navegador, ingresar a ___'localhost:7000/'___ + __endpoint__, colocando despues de la barra el nombre del endpoint que se desea acceder.

#### Get Users

Devuelve información de Usuarios

```http
  GET /users
```



#### Post User

Crea un usuario en la BD de usuarios

```http
  POST /users
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :------------------- |
| `username`| `string` | **Required**.  |
| `password`| `string` | **Required**.  |
| `mail`    | `string` | **Required**.  |
| `preferred_name`| `string` | **Required**. |
| `name`    | `string` | **Required**.  |
| `lastname`| `string` | **Required**.  |
| `isActive`| `string` | **Required**.  |
| `role`    | `string` | **Required**.  |



#### Get User by ID

Devuelve el Usuario con el ID enviado como parámetro

```http
  GET /users/:userId
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |



#### Get Equipment

Lista los trajes disponibles

```http
  GET /equipments
```

#### Get Characters

Lista los personajes existentes

```http
  GET /characters
```
