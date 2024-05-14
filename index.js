const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
require('dotenv').config(); // Load environment variables from .env file

const app = express();

// Set strictQuery to false to prepare for the change
mongoose.set('strictQuery', false);

// Connect to MongoDB
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })


app.use(bodyParser.json());
app.use(cors());
app.use('/api', routes);

app.listen(process.env.PORT, () => {
    console.log(`GHOST IS WORKING ON THIS PORT ---> http://localhost:${process.env.PORT}/api/`);
});