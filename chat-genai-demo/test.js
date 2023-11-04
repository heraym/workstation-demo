'use strict';
const http = require('http');
// REDIS Memorystore 
const redis = require('redis');

const REDISHOST = process.env.REDISHOST || '10.3.1.3';
const REDISPORT = process.env.REDISPORT || 6379;

console.log("Conectando a " + REDISHOST + " en puerto " + REDISPORT);
async function probar() {
  
       const redisClient = redis.createClient(REDISPORT, REDISHOST);
       redisClient.on('ready', async function() { 
         console.log('Redis is Ready');
        // var t =  redisClient.set("two",JSON.stringify([{ "uno":"one"},{"uno": "two"}]));
          
      
         var w = redisClient.get("two", function (err, res) {
            console.log(JSON.parse(res)[0]);
        });
         console.log("T:" + w );
       });
       
      
       redisClient.on('error', err => console.error('ERR:REDIS:', err));
       redisClient.on('connect', async function(){ 
         console.log('Connected to Redis');
       } );
       
        
      // var t = redisClient.get("uno");
       
        
    }
 probar();   
 