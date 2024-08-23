require('dotenv').config()


const config = {
    BucketName:process.env.BUCKET_NAME || '',
    EndPoint: process.env.ENDPOINT || '',
    DB_HOST : process.env.PGHOST || 'localhost',
    DB_USER : process.env.PGUSER || 'postgres',
    DB_PASSWORD: process.env.POSTGRES_PASSWORD || 'Loquillo39',
    DB_NAME: process.env.PGDATABASE || 'todolist',
    DB_PORT : process.env.PGPORT || 5432,
  
}

module.exports = config;