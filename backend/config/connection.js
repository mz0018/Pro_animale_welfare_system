// require('dotenv').config({ path: '../.env'});
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();

const mongo_uri = process.env.MONGO_URI;

const connect_to_mongo = async () => {

    try {
        await mongoose.connect(mongo_uri);
        console.log('Connected to mongoDB');
    } catch (error) {
        console.error('An error occured connecting to mongoDB: ', error);
        process.exit(1);
    }
    
}

module.exports = connect_to_mongo;
