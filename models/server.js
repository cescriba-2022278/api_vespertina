const  express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuarioPath = '/api/usuarios';
        this.animalPath = '/api/animales';
        this.authPath = '/api/login';

        this.conectarDB();
        this.middlewares();
        this.routers();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        this.app.use(express.static('public'));
        this.app.use(cors());
        this.app.use(express.json());
    }

    routers(){
        this.app.use(this.authPath,require('../routes/auth.routes'));
        this.app.use(this.usuarioPath, require('../routes/user.routes'));
        this.app.use(this.animalPath, require('../routes/animal.routes'));
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('Servidor ejecutrandose y escuchando el puerto', this.port)
        });
    }
}

module.exports = Server;