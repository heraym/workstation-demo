const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const chat = require('./chat');

app.get('/', async function(req,res,next) {
  var pregunta = req.query.pregunta;
  console.log("La pregunta es: " + pregunta);
  var respuesta = await chat.callPredict(pregunta);
  res.send(respuesta);
});

   
app.listen(8080, () => {
  console.log('Aplicacion Chat en puerto 8080!');
});
