import { useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import axios from 'axios'

//add question card
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
//input
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const EditAnswer = () => {

    const [answer, setAnswer] = useState('');
    let { id, questionId } = useParams();
    const history = useHistory()

    const handleSubmit = () => {
        const data = {
            answer,
        }
        axios.post(`/api/answer/${id}/edit-answer`, data)
            .then(res => {
                history.push(`/question/${questionId}`)
            })
            .catch(err => console.log(err))
    }
    return (
        <Card sx={{ maxWidth: 500, m: "auto", mt: 8 }}>
            <CardContent>
                <Box fullWidth sx={{ height: 60, backgroundColor: '#1976D2', mb: 5 }}>
                    <Typography sx={{ color: 'white', fontSize: 25, pt: 1.5 }}>
                        Edit your answer
                    </Typography>
                </Box>
                <TextField
                    fullWidth
                    required
                    name="answer"
                    value={answer}
                    onChange={e => setAnswer(e.target.value)}
                    sx={{ mb: 3 }}
                    helperText="Please edit your answer"
                    id="demo-helper-text-aligned"
                    label="Answer"
                />
            </CardContent>
            <CardActions >
                <Button onClick={handleSubmit} sx={{ m: "auto" }} size="small">Edit Answer</Button>
            </CardActions>
        </Card>
    )
}

export default EditAnswer
