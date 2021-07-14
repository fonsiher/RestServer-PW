//Puerto

process.env.PORT = process.env.PORT || 3000;


//Base de datos

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
console.log(process.env.NODE_ENV);

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/Cafe'
} else {
    urlDB = 'mongodb+srv://fonsiher:8yaGsCCmg1BDMpJo@sully.aciue.mongodb.net/Cafe?retryWrites=true&w=majority'
}

process.env.URLDB = urlDB;