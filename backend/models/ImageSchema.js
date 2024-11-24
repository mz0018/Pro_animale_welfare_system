const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    vet_id: {type: mongoose.Schema.Types.ObjectId, required: true},
    image: {type: Buffer, required: true},
    contentType: {type: String, required: true},
    prod_name: {type: String, required: true},
    prod_price: {type: Number, required: true},
    prod_category: {type: String, required: true},
    prod_quantity: {type: Number, required: true},
    date_created: {type: Date, default: Date.now}
});

const ImageModel = mongoose.model("items", ImageSchema);

module.exports = ImageModel;