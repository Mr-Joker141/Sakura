const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//import routes
const labRoutes = require('./routes/lab');

//app middleware
app.use(bodyParser.json());
app.use(cors());

//route middleware
app.use(labRoutes);

const PORT = 8000;
const DB_URL = 'mongodb+srv://admin:admin123@cluster0.lrnpf.mongodb.net/lab?retryWrites=true&w=majority'

mongoose.connect(DB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() =>{
    console.log('DB Connected');
})
.catch((err) => console.log('DB Connection error',err));

app.listen(PORT, () => {
    console.log(`App is Running on ${PORT}`);
});


