import { useState } from 'react';
import { Redirect } from "react-router-dom";
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
//alert
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';



function AddQuestion() {
    const [question, setQuestion] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState([]);
    const [redirect, setRedirect] = useState(false);

    const handleSubmit = () => {
        const data = {
            question,
            description,
        }
        setErrors([]);

        axios.post('/api/question/add', data)
            .then(res => {
                console.log(res)
                if (res.data.errors) {
                    setErrors(res.data.errors)
                } else {
                    setQuestion('')
                    setDescription('')
                    setRedirect(true)
                }
            })
            .catch(err => console.log(err))
    }
    if (redirect) { return <Redirect to="/" /> }
    return (
        <Card sx={{ maxWidth: 500, m: "auto", mt: 8 }}>
            <CardContent>
                <Box fullWidth sx={{ height: 60, backgroundColor: '#1976D2', mb: 5 ,textAlign: 'center'}}>
                    <Typography sx={{ color: 'white', fontSize: 25, pt: 1.5 }}>
                        Ask your question
                    </Typography>
                </Box>
                {
                    errors.map((error) => (
                        <Stack sx={{ width: '100%', mb: 4 }} spacing={2}>
                            <Alert severity="error">{error.msg}</Alert>
                        </Stack>
                    ))
                }
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
                <Button onClick={handleSubmit} sx={{ m: "auto" }} size="small">Add Question</Button>
            </CardActions>
        </Card>
    )
}

export default AddQuestion
