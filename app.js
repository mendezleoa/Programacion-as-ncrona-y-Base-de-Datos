let express = require('express');
let mongoose = require('mongoose');

let app = express();
app.use(express.json());

const routes = require('./routes/index');

const uri = 'mongodb://127.0.0.1:27017/storageprod';
const db = mongoose.connection;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .catch(err => console.log(err));

db.once('open', _ => {
    console.log('Database esta conectada en: ', uri);
});

db.on('error', err => {
    console.log(err);
});

app.use('/', routes)

let nport = 5000;

app.listen(nport, () => {
    console.log('Servidor iniciado en el puerto: ' + nport);
});

module.exports = app;