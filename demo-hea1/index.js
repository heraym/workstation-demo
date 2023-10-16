// Quisiera un ejemplo de pagina web de Hello World con Nodejs Express

const express = require('express');
const app = express();

var variable1 = 1;

app.get('/', (req, res) => {
  variable1 = variable1 + 1;
  res.send('Hola Mundo!');
});

app.listen(8080, () => {
  console.log('Example app listening on port 8080!');
});

