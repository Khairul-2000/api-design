import * as dotenv from 'dotenv';
dotenv.config();

import config from './config';

import app from './server';


app.listen(config.port, ()=>{
    console.log(`Server is running on port http://localhost:${config.port}`);
})







// const http = require('http');
// const server = http.createServer((req, res)=>{
//     if(req.method=="GET" && req.url=="/"){


//         res.statusCode = 200;
//         res.end("Hello world");
//     }
// })


// server.listen(3001, ()=>{
//     console.log("Server is running on port http://localhost:3001")
// })