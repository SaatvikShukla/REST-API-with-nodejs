const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoogse = require('mongoose');

const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

mongoogse.connect('mongodb://saatvik:' + process.env.MONGODB_ATLAS_PW + '@practice-cluster-shard-00-00-jatze.mongodb.net:27017,practice-cluster-shard-00-01-jatze.mongodb.net:27017,practice-cluster-shard-00-02-jatze.mongodb.net:27017/test?ssl=true&replicaSet=practice-cluster-shard-0&authSource=admin&retryWrites=true', { useNewUrlParser: true })

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-type, Accept, Authorization");
    if (req.method === 'OPTIONS'){
        res.header("Access-Control-Allow-Headers", "PUT, POST, PATCH, DELETE, GET");
        res.status(200).json({});
    }
    next();
});

app.use('/products', productRoutes );
app.use('/orders', orderRoutes );

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404 ;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error : {
            message: error.message
        }
    });
});

module.exports = app; 