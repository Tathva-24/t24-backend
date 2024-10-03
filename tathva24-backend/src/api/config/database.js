// strapi-api/config/database.js

const path = require('path');

const database=({ env })=>{
  
  let temp;
  
  if(env("ENVIRONMENT","DEVELOPMENT")==="PRODUCTION"){
    temp={
      connection: {
        client: 'postgres',
        connection: {
          host: env('DATABASE_HOST'),
          port: env.int('DATABASE_PORT'),
          database: env('DATABASE_NAME'),
          user: env('DATABASE_USERNAME'),
          password: env('DATABASE_PASSWORD'), // Not required
          ssl: {
            rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false),
          },
        },
        debug: false,
      },
    }
  }
  else{

    temp={
      connection: {
        client: 'sqlite',
        connection: {
          filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
        },
        useNullAsDefault: true,
      }
    }  

  }
  return temp
}




module.exports =database
