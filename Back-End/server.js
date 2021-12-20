const express = require('express')
require('./config/mongoose')
const cookieParser = require('cookie-parser')

const userRouter = require('./api/user')
const questionRouter = require('./api/question')
const answerRouter = require('./api/answer')
const { checkUser } = require('./middleware/authMiddleware')


const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

//Routers
app.all('*', checkUser)
app.use("/api/question", questionRouter);
app.use("/api/answer", answerRouter);
app.use("/api/user", userRouter);

app.listen(8000, () => console.log('port 8000 ready'))