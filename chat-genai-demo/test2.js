const chat = require('./chat');
const redis = require('redis');

const REDISHOST = '10.3.1.3';
const REDISPORT = process.env.REDISPORT || 6379;
var pregunta = "Cuantos planetas hay en el sistema solar?";
  var sesion = "10";
const clientRedis = redis.createClient(REDISPORT, REDISHOST);
  clientRedis.on('error', err => console.error('ERR:REDIS:', err));
  clientRedis.on('connect', () => console.log('Connected to Redis'));
  var historia = [];
  clientRedis.on('ready', async function() { 
  var w = clientRedis.get(sesion, async function (err, res) {
    historia = JSON.parse(res);
    if (historia == null) {
        historia = [];
      }
      
      historia.push({
        author: 'user',
        content: pregunta,
      });
    test();
  });
});

async function test() {

  console.log("La pregunta es: " + pregunta);
 respuesta = await chat.chatear(pregunta, sesion, historia);

    console.log("respuesta" + respuesta);
    historia.push({
        author: 'bot',
        content: respuesta,
       });
     var t = await clientRedis.set(sesion,JSON.stringify(historia));
 };
// Ejemplo que funciona
 
 