import React from 'react'
import AnswerCard from './AnswerCard';
import { useState } from 'react';
import axios from 'axios'
import { useParams, useHistory } from 'react-router-dom';

import Alert from '@mui/material/Alert';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import QuestionOption from './QuestionOption';

const ShowQuestionCard = ({ data, user }) => {

    const history = useHistory();
    let { id } = useParams();
    const [answer, setAnswer] = useState('');
    const [errors, setErrors] = useState("");

    const handleSubmit = () => {
        const data = {
            answer
        }
        setErrors('');
        axios.post(`/api/answer/${id}`, data)
            .then(res => {
                if (res.data.errors) {
                    setErrors(res.data.errors[0].msg)
                } else {
                    setAnswer('')
                    window.location.reload(false);
                }
            })
            .catch(err => console.log(err))
    }

    const onClick = () => {
        history.push('/login')
    }

    return (
        <Card sx={{ maxWidth: 600, m: "auto", mt: 10 ,textAlign: 'center'}}>
            {user && data && data.question.user._id === user._id &&
                <QuestionOption data={data} />
            }
            <CardContent data={data}>
                <Box direction="row" spacing={1} fullWidth sx={{ height: 60, backgroundColor: '#1976D2', mb: 1 }}>
                    <Typography sx={{ color: 'white', fontSize: 22, pt: 1.8 }}>
                        {data && data.question.question}
                    </Typography>
                </Box>
                <Typography sx={{ fontSize: 22, color: "#333", mb: 1 }} >
                    {data && data.question.description}
                </Typography>
                {errors &&
                    <Stack sx={{ width: '100%', mb: 1, mt: 3 }} spacing={2}>
                        <Alert severity="error">{errors}</Alert>
                    </Stack>
                }
                <Stack direction="row" spacing={1} sx={{ mt: 3 ,textAlign: 'center'}}>
                    <TextField
                        sx={{ mb: 3, width: "400px" }}
                        required
                        type="email"
                        name="answer"
                        value={answer}
                        onChange={e => setAnswer(e.target.value)}
                        helperText="Please write your answer"
                        id="demo-helper-text-aligned"
                        label="Answer"
                    />
                    {data && user &&
                        <Button onClick={handleSubmit} sx={{ width: "120px", height: "55px" }} variant="contained">Send</Button>
                    }
                    {data && !user &&
                        <Button onClick={onClick} sx={{ width: "120px", height: "55px" }} variant="contained">Send</Button>
                    }
                </Stack>
                <AnswerCard data={data} user={user} />
            </CardContent>
        </Card>
    )
}

export default ShowQuestionCard
