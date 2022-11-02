import { createClient } from 'redis';
import dotenv from 'dotenv/config';

let client = createClient({
    url: process.env.REDIS_URI
  });
  
client.on('connect', function() {
    console.log('Conectado a Redis Server');
});

client.on('error', (err)=>{
    console.error(err.message)
});

const setValue = async (key, value) => {
    return await client.set(key, value , {
        EX: 10*60,
      });
};
  
const getValue = async (key) => {
    let val = await client.get(key);
    return val;
};

export {
    setValue,
    getValue,
    client
}