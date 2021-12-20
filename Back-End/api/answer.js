const answerRouter = require('express').Router();
const questionModel = require("../model/questionModel");
const answerModel = require("../model/answerModel");

//api for add answer in question page (we have question id in url ) 
answerRouter.post('/:id', async (req, res) => {
    const { answer } = req.body
    let errors = [];

    if (!answer) {
        errors.push({ msg: 'Please fill in answer input' })
    }
    if (answer && answer.length < 10) {
        errors.push({ msg: 'Please write an answer more than 10 characters' })
    }
    const question = await questionModel.findById(req.params.id).populate('user')
    const answers = await answerModel.find({ question }).populate('user').sort({ createdAt: -1 });
    if (errors.length > 0) {
        res.json({
            errors,
            question,
            answers
        })
    } else {
        const newAnswer = new answerModel({
            answer,
            question,
            user: res.locals.user.id
        })
        await newAnswer.save()
        res.json({
            answer: newAnswer
        })
    }
})

//api for delete a answer
answerRouter.post('/:id/delete', async (req, res) => {
    await answerModel.findByIdAndDelete(req.params.id)
    res.json({
        msg: "deleted"
    })
})

//api for show an answer in new page
answerRouter.get('/:id/show-answer', async (req, res) => {
    const answer = await answerModel.findById(req.params.id)
    res.send({
        answer
    })
})

//api for edit(update) an answer then save it to DB
answerRouter.post('/:id/edit-answer', async (req, res) => {
    await answerModel.findById(req.params.id)
    await answerModel.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        msg: "updated successfully"
    })
})

module.exports = answerRouter;
