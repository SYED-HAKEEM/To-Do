import { Box, Button, Divider, IconButton, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import UndoOutlinedIcon from '@mui/icons-material/UndoOutlined';
import RedoOutlinedIcon from '@mui/icons-material/RedoOutlined';
import Masonry from '@mui/lab/Masonry';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PushPinIcon from '@mui/icons-material/PushPin';

export default function Main() {
    const [noteInput, setNoteInput] = useState({
        title: '',
        body: '',
        created: new Date(),
        userId: 1,
        pinned: false,
        bgcolor: '#ffffff'
    })
    const [allNotes, setAllNotes] = useState([])
    const [pinnedNotes, setPinnedNotes] = useState([])
    const save = () => {
        setAllNotes(prev => [...prev, noteInput])
        setNoteInput({
            title: '',
            body: '',
            created: new Date(),
            userId: 1,
            pinned: false,
            bgcolor: '#ffffff'
        })
    }
    const savep = () => {
        setPinnedNotes(prev => [...prev, noteInput])
        setNoteInput({
            title: '',
            body: '',
            created: new Date(),
            userId: 1,
            pinned: false,
            bgcolor: '#ffffff'
        })
    }
    const remove = (index) => {
        setAllNotes(
            (prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]
        )
    }
    const removep = (index) => {
        setPinnedNotes(
            (prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]
        )
    }
    const pin = (index) => {
        setPinnedNotes(
            (prev) => [...prev, allNotes[index]]
        )
        remove(index)
    }
    const unpin = (index) => {
        setAllNotes(
            (prev) => [...prev, pinnedNotes[index]]
        )
        setPinnedNotes(
            (prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]
        )
    }
    return (
        <div>
            <Box className='noteInputWrapper'>
                <Box sx={{ display: 'flex', flexDirection: 'row', }}>
                    {/*<input type='text' placeholder='Title' style={{ flexGrow: 1 }} />*/}
                    <TextField value={noteInput.title} label="Title" variant="standard" sx={{ flexGrow: 1 }} onChange={(e) => setNoteInput((prev) => ({ ...prev, title: e.target.value }))} />
                    <IconButton>
                        <PushPinOutlinedIcon/>
                    </IconButton>
                </Box>

                <Box>
                    <TextField
                        id="outlined-textarea"
                        fullWidth
                        placeholder="Notes"
                        multiline
                        value={noteInput.body}
                        onChange={(e) => setNoteInput((prev) => ({ ...prev, body: e.target.value }))}
                    />
                </Box>

                <Box sx={{ display: 'flex', width: '475px', justifyContent: 'space-between' }}>
                    <IconButton>
                        <AddAlertOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <PersonAddAltOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <ColorLensOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <ImageOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <ArchiveOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <UndoOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <RedoOutlinedIcon />
                    </IconButton>
                    <Box sx={{ width: 50 }}></Box>
                    <Button onClick={save}>
                        close
                    </Button>
                </Box>
            </Box>
            {/*Pinned Notes */}
            {
                pinnedNotes.length!==0
                ?
                <Typography variant="h5"> Pinned Notes</Typography>
                :''
            }
            <Box>
                <Masonry columns={{ xs: 1, sm: 2, md: 4 }} spacing={3}>
                    {
                        pinnedNotes.length !== 0
                            ?
                            pinnedNotes.map((ele, index) =>
                                <Box className="singlenote" key={index}>
                                    <Box>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: "center" }}>
                                            <Typography sx={{ flexGrow: 1, fontWeight: 500 }}>
                                                {ele.title}
                                            </Typography>
                                            <IconButton className="pinbutton" onClick={() => unpin(index)}>
                                                <PushPinIcon />
                                            </IconButton>
                                        </Box>
                                        <Box className="notebody">
                                            <Typography variant="body1">
                                                {ele.body}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box className="iconbuttonshidden" sx={{ height: '40px', marginTop: '20px' }}>

                                    </Box>
                                    <Box className="iconbuttons" sx={{ justifyContent: 'space-between', marginTop: '20px' }}>
                                        <IconButton>
                                            <AddAlertOutlinedIcon />
                                        </IconButton>
                                        <IconButton>
                                            <PersonAddAltOutlinedIcon />
                                        </IconButton>
                                        <IconButton>
                                            <ColorLensOutlinedIcon />
                                        </IconButton>
                                        <IconButton>
                                            <ImageOutlinedIcon />
                                        </IconButton>
                                        <IconButton>
                                            <ArchiveOutlinedIcon />
                                        </IconButton>
                                        <IconButton onClick={() => removep(index)}>
                                            <DeleteOutlineIcon />
                                        </IconButton>
                                    </Box>
                                </Box>)
                            :''
                    }
                </Masonry>
            </Box>
            <Divider/>
            {/*Unpinned Notes */}
            {
                allNotes.length===0
                ?
                <Typography variant="h5"> Add Notes</Typography>
                :<Typography variant="h5"> Notes</Typography>
            }
            <Box sx={{
                //display: 'flex',
                //flexWrap: 'wrap;'
                width: '100%'
            }}>
                {/*notes */}
                <Masonry columns={{ xs: 1, sm: 2, md: 4 }} spacing={3}>
                    {
                        allNotes.length !== 0
                            ?
                            allNotes.map((ele, index) =>
                                <Box className="singlenote" key={index}>
                                    <Box>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: "center" }}>
                                            <Typography sx={{ flexGrow: 1, fontWeight: 500 }}>
                                                {ele.title}
                                            </Typography>
                                            <IconButton className="pinbutton" onClick={() => pin(index)}>
                                                <PushPinOutlinedIcon />
                                            </IconButton>
                                        </Box>
                                        <Box className="notebody">
                                            <Typography variant="body1">
                                                {ele.body}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box className="iconbuttonshidden" sx={{ height: '40px', marginTop: '20px' }}>

                                    </Box>
                                    <Box className="iconbuttons" sx={{ justifyContent: 'space-between', marginTop: '20px' }}>
                                        <IconButton>
                                            <AddAlertOutlinedIcon />
                                        </IconButton>
                                        <IconButton>
                                            <PersonAddAltOutlinedIcon />
                                        </IconButton>
                                        <IconButton>
                                            <ColorLensOutlinedIcon />
                                        </IconButton>
                                        <IconButton>
                                            <ImageOutlinedIcon />
                                        </IconButton>
                                        <IconButton>
                                            <ArchiveOutlinedIcon />
                                        </IconButton>
                                        <IconButton onClick={() => remove(index)}>
                                            <DeleteOutlineIcon />
                                        </IconButton>
                                    </Box>
                                </Box>)
                            : ''
                    }
                </Masonry>
            </Box>
        </div>
    )
}