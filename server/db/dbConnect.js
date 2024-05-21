const mongoose = require('mongoose');
require('dotenv').config();

async function dbConnect(){
    mongoose 
    .connect(process.env.URL)
    .then(() => {
        console.log('Connected MongoDB')
    })
    .catch((error) => {console.error(error)})
}

module.exports = dbConnect;