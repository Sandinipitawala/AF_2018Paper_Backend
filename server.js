const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyparser = require('body-parser');
const subjectAPI = require('./src/api/subject.api');
const courseAPI = require('./src/api/course.api');

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyparser.json());

//environmental variables
const PORT = process.env.PORT || 8099;
const MONGODB_URI = process.env.MONGODB_URI;

//creating the mongodb connection
mongoose.connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useFindAndModify: false
}, (error) => {
    if (error){
        console.log('Database Error: ', error.message);
    }
});

mongoose.connection.once('open',() =>{
    console.log('Database Synced');
});

app.route('/').get((req,res) => {
    res.send('SLIIT AF FINAL API BY SE2021 BATCH');
});

app.use('/subject', subjectAPI());
app.use('/course', courseAPI());

app.listen(PORT, () => {
    console.log('Server is up and running on ${PORT}');
});

