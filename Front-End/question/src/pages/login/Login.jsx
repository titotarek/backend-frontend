import React from 'react'
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
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
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            email,
            password,
        }
        setErrors([]);
        axios.post('/api/user/login', user)
            .then(res => {
                if (res.data.errors) {
                    setErrors(res.data.errors)
                } else {
                    document.cookie = res.data.token;
                    setEmail('')
                    setPassword('')
                    props.getData(res.data.user)
                    history.push('/');
                }
            })
            .catch(err => console.log(err))
    }
    return (
        <div>
            <Card sx={{ maxWidth: 500, m: "auto", mt: 10 }}>
                <CardContent>
                    <Box fullWidth sx={{ height: 60, backgroundColor: '#2196f3', mb: 5 ,textAlign: 'center'}}>
                        <Typography sx={{ color: 'white', fontSize: 25, pt: 1.5 }}>
                            Login to your account
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
                    <Typography sx={{ textAlign: 'left', fontSize: 14 }}>
                        Did not creat an account ?
                        <Link to="/signup">Sign up</Link>
                    </Typography>
                </CardContent>
                <CardActions >
                    <Button onClick={handleSubmit} sx={{ m: "auto" }} size="small">Login</Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default Login
