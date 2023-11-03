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

// Historia
var historia = [];
 

// Instantiates a client
const predictionServiceClient = new PredictionServiceClient(clientOptions);

async function callPredict(pregunta) {
  // Configure the parent resource
  const endpoint = `projects/${project}/locations/${location}/publishers/${publisher}/models/${model}`;
  historia.push({
    author: 'user',
    content: pregunta,
  });

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
  var respuesta = "";
  for (const prediction of predictions) {
    //console.log(`\t\tPrediction : ${JSON.stringify(prediction)}`);
    respuesta = prediction.structValue.fields.candidates.listValue.values[0].structValue.fields.content.stringValue;
  }

  historia.push({
    author: 'bot',
    content: respuesta,
  });

  return respuesta;
}

exports.callPredict = callPredict;