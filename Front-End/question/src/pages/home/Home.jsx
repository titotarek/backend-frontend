import { useEffect, useState } from 'react';
import axios from 'axios';
import './homeStyle.css';
import QuestionCard from './components/QuestionCard';

//package grid
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


const Home = () => {
    const [questions, setQuestions] = useState([]);


    useEffect(() => {
        async function fetchData() {
            const data = await axios.get('/api/question')
            setQuestions(data.data.question)
        }
        fetchData();

    }, [])
    return (
        <div>
            <Box sx={{ flexGrow: 1 , textAlign: 'center'}} className="boxDesign">
                <Grid sx={{ textAlign: 'center' }} container spacing={3} columns={15} >
                    {questions.map((question, index) => (
                        <QuestionCard question={question} key={index} />
                    ))}
                </Grid>
            </Box>
        </div>
    )
}

export default Home
