import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react'

export default function InterviewRow({ interview, handleDelete, index, handleOpenNote }) {

    const [open, setOpen] = useState(true);
    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{interview.time_in}</TableCell>
                <TableCell>{interview.time_out}</TableCell>
                <TableCell>{interview.dated}</TableCell>
                <TableCell>
                    <IconButton onClick={() => handleDelete(interview.id)} size='small' color='primary' >
                        <DeleteIcon style={{ color: '#C70039' }} />
                    </IconButton>
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 2, width: '100%' }}>
                            <div className='row'>
                                <div className='col-6'><Typography><h5>Interview Notes</h5></Typography></div>
                                <div className='col-6 text-right'>
                                    <label></label>
                                    <button onClick={() => handleOpenNote(interview.id)} className='btn btn-sm btn-primary'>Add Note</button>
                                </div>
                            </div>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Note</TableCell>
                                        <TableCell>Pass</TableCell>
                                        <TableCell>Time</TableCell>
                                        <TableCell>Dated</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        interview.notes.map((note) =>
                                            <TableRow>
                                                <TableCell>{note.note}</TableCell>
                                                <TableCell>{note.pass ? 'Yes' : 'No'}</TableCell>
                                                <TableCell>{note.timed}</TableCell>
                                                <TableCell>{note.dated}</TableCell>
                                            </TableRow>
                                        )
                                    }
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    )
}
