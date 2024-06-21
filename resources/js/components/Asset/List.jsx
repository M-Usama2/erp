import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import TableRow from '@mui/material/TableRow';
import { Download } from '@mui/icons-material';

function List({ assets, handleEdit, handleDelete }) {

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: null
    });

    const params = useParams();


    return (
        <div className='contain-table'>
            <div style={{ marginTop: '30px', fontWeight: '200', fontSize: '18px', color: 'white', backgroundColor: '#4b8df8', width: '100%', padding: '7px 15px' }}>
                <BusinessCenterIcon style={{ fontSize: '20px', }} /> Asset List
            </div>

            <div style={{ marginTop: '', border: '1px solid #4b8df8', padding: '10px' }}>

                <TableContainer>
                    <Table sx={{ minWidth: '100%' }} size="small" aria-label="Asset List">
                        <TableHead>
                            <TableRow>
                                <TableCell>NO.</TableCell>
                                <TableCell>NAME</TableCell>
                                <TableCell>ID/MODEL</TableCell>
                                <TableCell>COST</TableCell>
                                <TableCell>DOCUMENT</TableCell>
                                <TableCell>ACTIONS</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {assets.length > 0 ? (
                                assets.map((asset, i) => (
                                    <TableRow key={asset.id}>
                                        <TableCell>{i + 1}</TableCell>
                                        <TableCell>{asset.name}</TableCell>
                                        <TableCell>{asset.identity}</TableCell>
                                        <TableCell>{asset.cost}</TableCell>
                                        <TableCell>
                                            {
                                                asset.document ?
                                                    <a href={asset.document} download={true}><Download color='primary' /></a>
                                                    : '-'
                                            }
                                        </TableCell>
                                        <TableCell className="text-left">
                                            <Link
                                                to={`/assets/${asset.id}`}

                                                className="button muted-button edit"
                                                style={{ marginRight: '10px', color: 'white', background: '#8e44ad', padding: '7px 9px', textAlign: 'center', fontSize: '13px', fontWeight: '200', border: 'none', borderRadius: '0' }}
                                            >
                                                <EditIcon style={{ color: 'white', marginBottom: '3px', fontSize: '15px' }} /> View/Edit

                                            </Link>
                                            <button
                                                onClick={() => handleDelete(asset.id)}
                                                className="button muted-button delete"
                                                style={{ fontWeight: '200', color: 'white', padding: '7px 9px', fontSize: '13px', border: 'none', borderRadius: '0', background: '#c63927' }}
                                            >
                                                <DeleteIcon style={{ marginBottom: '3px', color: 'white', fontSize: '15px' }} /> Delete
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7}>No Asset</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>
        </div>

    )
}

export default List
