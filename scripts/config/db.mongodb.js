const mongoose = require('mongoose');

const mongodb = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1/webservice');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

module.exports = mongodb;