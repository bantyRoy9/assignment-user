const express = require('express')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser')

const app = express();
dotenv.config({ path:'./config.env' })


app.use(express.json({ limit: '14kb' }));
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

const usersRoute = require('./routes/userRoute');
app.use('/user', usersRoute);

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));
}


const DB = process.env.MONGODB_URL
mongoose.connect(DB).then(()=> {
    console.log('database is connected');
});


const PORT =process.env.PORT || 8000;
app.listen(PORT,()=>{console.log(`surver running on port ${PORT}`);})

