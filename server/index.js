const express = require('express')
const cors = require('cors');
const app = express();
const port = 3030;
const UserRouter = require('./router/UserRouter');
const PhotoRouter = require('./router/PhotoRouter');
const dbConnect = require('./db/dbConnect');

app.use(cors());
dbConnect();

app.use(UserRouter);

app.use('/photos',PhotoRouter);

app.get('/', (req,res) => {
    res.send('back end pr6');
})


app.listen(port, function() {
    console.log(port);
})

