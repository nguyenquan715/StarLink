const mongoose = require('mongoose');

/* Connect to mongoDB */
const dbURI = 'mongodb://localhost/StarLink';
mongoose.connect(dbURI, {useNewUrlParser: true});

/* Listen connection events*/
mongoose.connection.on('connected', ()=>{
    console.log(`Mongoose connected to ${dbURI}`);
});
mongoose.connection.on('error', err =>{
    console.log(`Mongoose connection error: ${err}`);
});
mongoose.connection.on('disconnected', ()=>{
    console.log('Mongoose disconnected!');
});

/* Disconnect mongoDB when nodemon restart or app termination */
const gracefulShutdown = (msg, callback) => {
    mongoose.connection.close( () => {
        console.log(`Mongoose disconnected through ${msg}`);
        callback();
    });
}
process.once('SIGUSR2', ()=>{
    gracefulShutdown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});
process.on('SIGINT', ()=>{
    gracefulShutdown('app termination', ()=>{
        process.exit(0);
    });
});
process.on('SIGTERM', () => {
    gracefulShutdown('Heroku app shutdown', ()=>{
        process.exit(0);
    });
});

require('./locations');