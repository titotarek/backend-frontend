import React, { useState } from 'react'
import axios from 'axios'
import { Redirect, useHistory } from "react-router-dom";

import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


const QuestionOption = ({ data }) => {
    const [redirect, setRedirect] = useState(false);
    const history = useHistory();

    const deleteQuestion = () => {
        axios.post(`/api/question/delete/${data.question._id}`)
            .then(res => {
                setRedirect(true)
            })
            .catch(err => console.log(err))
    }

    const editQuestion = () => {
        history.push(`/edit-question/${data.question._id}`)
    }

    if (redirect) { return <Redirect to="/" /> }
    return (
        <Box sx={{ height: 70, transform: 'translateZ(0px)', flexGrow: 1 }}>
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'absolute', bottom: 1, right: 16 }}
                icon={<SpeedDialIcon />}
                direction="left"
            >
                <SpeedDialAction
                    icon={<DeleteIcon />}
                    tooltipTitle="Delete"
                    onClick={deleteQuestion}
                />
                <SpeedDialAction
                    icon={<EditIcon />}
                    tooltipTitle="Edit"
                    onClick={editQuestion}
                />
            </SpeedDial>
        </Box>
    )
}

export default QuestionOption
