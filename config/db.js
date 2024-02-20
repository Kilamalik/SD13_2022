const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
    try {
        await mongoose.connect(db);   /* await before mongoose.connect returns a promise*/ /* the usemewurl parser and create idnex is not nessary */   
        

        console.log('MongoDB connected');
    } catch(error) {
        console.error(error.message);
        // Exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB;