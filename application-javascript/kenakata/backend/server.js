const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
let Users = require('./models/user.model')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Connection established")
})

const userRouter = require('./routes/users');
app.use('/users', userRouter);

const jacketRouter = require('./routes/jacket');
app.use('/jacket', jacketRouter);

const sareeRouter = require('./routes/saree');
app.use('/saree', sareeRouter);

const shirtRouter = require('./routes/shirt');
app.use('/shirt', shirtRouter);

const fanRouter = require('./routes/fan');
app.use('/fan', fanRouter);

const bulbRouter = require('./routes/bulb');
app.use('/bulb', bulbRouter);

const tubelightRouter = require('./routes/tubelight');
app.use('/tubelight', tubelightRouter);

const batRouter = require('./routes/bat');
app.use('/bat', batRouter);

const ballRouter = require('./routes/ball');
app.use('/ball', ballRouter);

const footballRouter = require('./routes/football');
app.use('/football', footballRouter);



app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
})