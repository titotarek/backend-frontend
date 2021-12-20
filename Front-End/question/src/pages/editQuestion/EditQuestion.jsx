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


const EditQuestion = () => {
    const [question, setQuestion] = useState('');
    const [description, setDescription] = useState('');
    let { id } = useParams();
    const history = useHistory()

    const handleSubmit = () => {
        const data = {
            question,
            description,
        }
        axios.post(`/api/question/update/${id}`, data)
            .then(res => {
                history.push(`/question/${id}`)
            })
            .catch(err => console.log(err))
    }
    return (
        <Card sx={{ maxWidth: 500, m: "auto", mt: 8 }}>
            <CardContent>
                <Box fullWidth sx={{ height: 60, backgroundColor: '#1976D2', mb: 5 }}>
                    <Typography sx={{ color: 'white', fontSize: 25, pt: 1.5 }}>
                        Edit your question
                    </Typography>
                </Box>

                <TextField
                    fullWidth
                    required
                    name="question"
                    value={question}
                    onChange={e => setQuestion(e.target.value)}
                    sx={{ mb: 3 }}
                    helperText="Please write your question"
                    id="demo-helper-text-aligned"
                    label="Question"
                />
                <TextField
                    fullWidth
                    required
                    name="description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    sx={{ mb: 3 }}
                    helperText="Please write your description"
                    id="demo-helper-text-aligned"
                    label="Description"
                />
            </CardContent>
            <CardActions >
                <Button onClick={handleSubmit} sx={{ m: "auto" }} size="small">Edit Question</Button>
            </CardActions>
        </Card>
    )
}

export default EditQuestion
