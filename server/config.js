//Puerto

process.env.PORT = process.env.PORT || 3000;


//Base de datos

process.env.NODE_ENV = process.env.NODE_ENV || 'devs';
console.log(process.env.NODE_ENV);

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/Cafe'
} else {
    urlDB = process.env.BDD_URL
}

process.env.URLDB = urlDB;