/**
 * TODO(developer): Uncomment these variables before running the sample.\
 * (Not necessary if passing values as arguments)
 */
const project = 'projectodemos';
const location = 'us-central1';
const aiplatform = require('@google-cloud/aiplatform');

// Imports the Google Cloud Prediction service client
const {PredictionServiceClient} = aiplatform.v1;

// Import the helper module for converting arbitrary protobuf.Value objects.
const {helpers} = aiplatform;

// Specifies the location of the api endpoint
const clientOptions = {
  apiEndpoint: 'us-central1-aiplatform.googleapis.com',
};
const publisher = 'google';
const model = 'chat-bison@001';


const redis = require('redis');

const REDISHOST = '10.3.1.3';
const REDISPORT = process.env.REDISPORT || 6379;
 
// Historia
var historia = [];
 
// Instantiates a client
const predictionServiceClient = new PredictionServiceClient(clientOptions);
const clientRedis = redis.createClient(REDISPORT, REDISHOST);
  clientRedis.on('error', err => console.error('ERR:REDIS:', err));
  clientRedis.on('connect', () => console.log('Connected to Redis'));
  
async function chatear(pregunta, sesion, historia) {
 
  var respuesta = "";  
    
  console.log("Historia" + JSON.stringify(historia));
  
  
  // Configure the parent resource
  const endpoint = `projects/${project}/locations/${location}/publishers/${publisher}/models/${model}`;
 

  // The instance.
  const prompt = {
  context:
    'Mi nombre es Jose. Soy un astronomo con conocimiento del sistema solar.',
  examples: [
    {
       input: {content: 'Cuantas lunas tiene Marte?'},
       output: {
        content: 'El planeta Marte tiene dos lunas, Phobos y Deimos.',
       },
    },
    {
      input: {content: 'How many moons does Mars have?'},
      output: {
        content: 'The planet Mars has two moons, Phobos and Deimos.',
      },
    },
  ],
  messages: historia,
  };

  const instanceValue = helpers.toValue(prompt);
  const instances = [instanceValue];

  const parameter = {
   temperature: 0.2,
   maxOutputTokens: 256,
   topP: 0.95,
   topK: 40,
  };
  const parameters = helpers.toValue(parameter);

  const request = {
   endpoint,
   instances,
   parameters,
  };

  // Predict request
  const [response] = await predictionServiceClient.predict(request);
   
     const predictions = response.predictions; 
  
     for (const prediction of predictions) {
     //console.log(`\t\tPrediction : ${JSON.stringify(prediction)}`);
      respuesta = prediction.structValue.fields.candidates.listValue.values[0].structValue.fields.content.stringValue;
     }

    return respuesta;
  }

  async function chatear1(pregunta, sesion) {


  
  /* clientRedis.on('ready', async function() {  
    var w = clientRedis.get(sesion, async function (err, res) {
    historia = JSON.parse(res);
    console.log("Sesion: " + sesion + "Historia: " + historia);
    
    callPredict(function (err, res) { 
      console.log("respuesta..." + res);
      historia.push({
        author: 'user',
        content: pregunta,
      });
    
      historia.push({
       author: 'bot',
       content: res,
      });
     var t =  clientRedis.set(sesion,JSON.stringify(historia));
     respuesta = res;

    }); 

  });
});*/

  return respuesta;
}

exports.chatear = chatear;