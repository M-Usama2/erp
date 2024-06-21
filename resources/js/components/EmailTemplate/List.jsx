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
import {connect} from 'react-redux'

function List({ templates, handleEdit, handleDelete, role, permission }) {

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: null
    });

    const params = useParams();

    const checkPermission = (name) => role?.includes("super-admin") || permission?.includes(name);

    return (
        <div className='contain-table'>
             <div style={{ marginTop:'30px',fontWeight: '200',fontSize: '18px',color: 'white',backgroundColor: '#4b8df8', width: '100%', padding: '7px 15px'}}>
             <BusinessCenterIcon style={{fontSize: '20px', }} /> Email Template List
            </div>

            <div style={{marginTop: '',border: '1px solid #4b8df8', padding: '10px'}}>

        <TableContainer>
    <Table sx={{minWidth: '100%'}} size="small" aria-label="Email Template List">
      <TableHead>
        <TableRow>
          <TableCell>NO.</TableCell>
          <TableCell>TITLE</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
                    {templates.length > 0 ? (
                        templates.map((template, i) => (
                            <TableRow key={template.id}>
                                <TableCell>{i + 1}</TableCell>
                                <TableCell>{template.title}</TableCell>
                                <TableCell className="text-left">
                                    {checkPermission("edit email-template") ? (
                                        <Link
                                        to={`/templates/${template.id}`}

                                        className="button muted-button edit"
                                        style={{ marginRight: '10px',color: 'white', background: '#8e44ad', padding: '7px 9px', textAlign: 'center',fontSize: '13px', fontWeight: '200',border: 'none', borderRadius: '0' }}
                                        >
                                        <EditIcon  style={{ color: 'white', marginBottom: '3px',fontSize: '15px'}} /> View/Edit

                                    </Link>
                                    ) : null}
                                    
                                    {checkPermission("delete email-template") ? (
                                        <button
                                        onClick={() => handleDelete(template.id)}
                                        className="button muted-button delete"
                                        style={{ fontWeight: '200',color: 'white', padding: '7px 9px', fontSize: '13px', border: 'none', borderRadius: '0', background: '#c63927'}}
                                        >
                                        <DeleteIcon style={{ marginBottom: '3px',color: 'white', fontSize: '15px' }} /> Delete
                                    </button>
                                    ) : null}
                                    
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={7}>No Email Template</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            </TableContainer>

            </div>
        </div>

    )
}

const mapStateToProps = (state) => ({
    role: state.role.currentRole,
    permission: state.permission.currentPermission,
});
  
export default connect(mapStateToProps)(List);
