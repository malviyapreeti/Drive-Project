const mongoose = require('mongoose');

function connectToDB() {

    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log('Connected to DB');
        })
        .catch((error) => {
            console.log('Database connection error:', error);
        });

}

module.exports = connectToDB;