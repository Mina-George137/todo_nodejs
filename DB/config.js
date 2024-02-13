const mongoose = require('mongoose');

const initConnection = () => {
    return mongoose.connect(process.env.CONNECTION_STRING)
        .then(() => console.log('connected'))
        .catch(() => console.log('error'));
}

module.exports = initConnection;
