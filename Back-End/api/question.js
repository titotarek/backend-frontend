const questionRouter = require('express').Router();
const userModel = require("../model/userModel");
const questionModel = require("../model/questionModel");
const answerModel = require("../model/answerModel");
const { isLogin } = require('../middleware/authMiddleware')


questionRouter.get('/', async (req, res) => {
    const question = await questionModel.find().populate('user').sort({ createdAt: -1 });
    res.json({
        question
    })
});

//api for add new question to data base
questionRouter.post('/add', isLogin, async (req, res) => {
    const { question, description } = req.body
    let errors = [];
    if (!question || !description) {
        errors.push({ msg: 'Please fill in all fields' })
    }
    if (question && question.length < 10) {
        errors.push({ msg: 'Question should be more than 10 characters' })
    }
    if (description && description.length < 15) {
        errors.push({ msg: 'Question should be more than 15 characters' })
    }
    if (errors.length > 0) {
        res.json({
            errors,
        })
    } else {
        id = res.locals.user.id
        user = await userModel.findById(id)
        const newQuestion = new questionModel({
            question,
            description,
            user: user
        })
        await newQuestion.save()
        res.json({
            question: newQuestion,
        })
    }
})

//api for show a question with question id 
questionRouter.get('/get/:id', async (req, res) => {
    const question = await questionModel.findById(req.params.id).populate('user')
    const answers = await answerModel.find({ question }).populate('user').sort({ createdAt: -1 });
    res.json({
        question,
        answers
    })
})

//api for delete a question 
questionRouter.post('/delete/:id', async (req, res) => {
    const question = await questionModel.findByIdAndDelete(req.params.id)
    await answerModel.deleteMany({ question })
    res.json({ msg: "delete" })
})

//api for update a question

questionRouter.post('/update/:id', async (req, res) => {
    const question = await questionModel.findByIdAndUpdate(req.params.id, req.body)
    res.json({
        msg: "update successful",
    })
}
)


module.exports = questionRouter;
