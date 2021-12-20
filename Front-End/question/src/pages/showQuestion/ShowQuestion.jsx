import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ShowQuestionCard from './components/ShowQuestionCard';

const ShowQuestion = (props) => {
    let { id } = useParams();
    const [data, setData] = useState(null);
    const user = props.user;

    useEffect(() => {
        async function fetchData() {
            const data = await axios.get(`/api/question/get/${id}`)
            setData(data.data)
        }
        fetchData();
    }, [])

    return (
        <div>
            <ShowQuestionCard data={data} user={user} />
        </div>
    )
}

export default ShowQuestion
