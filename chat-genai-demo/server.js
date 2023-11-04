const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const chat = require('./chat');

const redis = require('redis');

const REDISHOST = '10.3.1.3';
const REDISPORT = process.env.REDISPORT || 6379;

var historia = [];

app.get('/', function(req,res,next) {
  var pregunta = req.query.pregunta;
  var sesion = req.query.sesion;
  console.log("Conectando a Redis..");
  
/*  const clientRedis = redis.createClient(REDISPORT, REDISHOST);

  clientRedis.on('error', err => console.error('ERR:REDIS:', err));
  clientRedis.on('connect', () => console.log('Connected to Redis'));
  clientRedis.on('ready', async function() { 
    console.log("Redis ready"); });
     var w = clientRedis.get(sesion, async function (err, res) {
       historia = JSON.parse(res);
       if (historia == null) {
         historia = [];
       }
      
       historia.push({
          author: 'user',
          content: pregunta,
       });
       callChat(res);
      
     }); */
     historia.push({
      author: 'user',
      content: pregunta,
   });
   callChat(res, pregunta, sesion);
});

async function callChat(res, pregunta, sesion) {

  console.log("La pregunta es: " + pregunta);
  respuesta = await chat.chatear(pregunta, sesion, historia);

    console.log("respuesta" + respuesta);
    historia.push({
        author: 'bot',
        content: respuesta,
       });
//     var t = await clientRedis.set(sesion,JSON.stringify(historia));
     res.send(respuesta);
 };
   
app.listen(8080, () => {
  console.log('Aplicacion Chat en puerto 8080!');
});
