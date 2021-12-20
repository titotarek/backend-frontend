import React from 'react'
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'


import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
//input
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [errors, setErrors] = useState([]);
    const history = useHistory()

    const handleSubmit = () => {
        const user = {
            username,
            email,
            password,
            password2
        }
        setErrors([]);
        axios.post('/api/user/signup', user)
            .then(res => {
                if (res.data.errors) {
                    setErrors(res.data.errors)
                } else {
                    setUsername('')
                    setEmail('')
                    setPassword('')
                    setPassword2('')
                    history.push('/login');
                }

            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <Card sx={{ maxWidth: 500, m: "auto", mt: 5 }}>
                <CardContent>
                    <Box fullWidth sx={{ height: 60, backgroundColor: '#2196f3', mb: 5,textAlign: 'center' }}>
                        <Typography sx={{ color: 'white', fontSize: 25, pt: 1.5 }}>
                            SignUp in our website
                        </Typography>
                    </Box>
                    {
                        errors.map((error, index) => (
                            <Stack key={index} sx={{ width: '100%', mb: 4 }} spacing={2}>
                                <Alert severity="error">{error.msg}</Alert>
                            </Stack>
                        ))
                    }
                    <TextField
                        fullWidth
                        sx={{ mb: 3 }}
                        required
                        name="username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        type="text"
                        helperText="Please write your username"
                        id="username"
                        label="Username"
                    />
                    <TextField
                        fullWidth
                        sx={{ mb: 3 }}
                        required
                        name="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        type="email"
                        helperText="Please write your email"
                        id="email"
                        label="Email"
                    />
                    <TextField
                        fullWidth
                        sx={{ mb: 3 }}
                        required
                        name="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                        helperText="Please write your password."
                        id="password"
                        label="Password"
                    />
                    <TextField
                        fullWidth
                        sx={{ mb: 3 }}
                        required
                        name="password2"
                        value={password2}
                        onChange={e => setPassword2(e.target.value)}
                        type="password"
                        helperText="Please write your password again."
                        id="password2"
                        label="Repeat password"
                    />
                    <Typography sx={{ textAlign: 'left', fontSize: 14 }}>
                        Did you creat an account before?
                        <Link to="/login">Login</Link>
                    </Typography>
                </CardContent>
                <CardActions >
                    <Button onClick={handleSubmit} sx={{ m: "auto" }} size="small">SignUp</Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default Signup
