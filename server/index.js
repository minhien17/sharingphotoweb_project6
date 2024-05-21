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

// làm sao để khi chạy index nó khởi tạo package.json 

// nó không cần tải lại express là do chạy package của cái khác ??

// các thư viện cài về ở đâu mà chỉ cần vài dòng package là chạy được?

//tai sao express va cors dung duoc