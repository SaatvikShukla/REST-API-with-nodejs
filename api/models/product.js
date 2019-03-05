const mongoogse = require('mongoose');


const productSchema = mongoogse.Schema({
    _id : mongoogse.Types.ObjectId,
    name: String,
    price: Number
});

module.exports = mongoogse.model('Product', productSchema);