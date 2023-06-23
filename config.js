mongodb + srv//leogumi:<leo123>@cluster0.vuhzhzi.mongodb.net/?retryWrites=true&w=majority

require('dotenv').config();

module.exports = {
    dbUsername: process.env.DB_LEOGUMI,
    dbPassword: process.env.DB_leo123,
    dbName: process.env.project0,

};


const LOG_LEVELS = {
    debug: 0,
    http: 1,
    info: 2,
    warning: 3,
    error: 4,
    fatal: 5,
};

module.exports = {
    // ...
    LOG_LEVELS,
};
