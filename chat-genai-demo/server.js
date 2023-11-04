const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const chat = require('./chat');

var corsOptions = {
  origin: 'chat-genai-front-xcowfeupla-uc.a.run.app',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.get('/', async function(req,res,next) {
  var pregunta = req.query.pregunta;
  var sesion = req.query.sesion;
  console.log("La pregunta es: " + pregunta);
  chat.chatear(pregunta, sesion, function (err, respuesta) { 
    res.send(respuesta);
  });
});

   
app.listen(8080, () => {
  console.log('Aplicacion Chat en puerto 8080!');
});
