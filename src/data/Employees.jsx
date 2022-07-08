import React from 'react'
import { useMutation, useSubscription } from '@apollo/client'
import {Button, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { deleteemployee, allemployees} from '../api/queries'

export default function Employees () {
    const [removeEmployee] = useMutation(deleteemployee);
    const { loading, error, data} = useSubscription(allemployees);
    if (loading) return (
        <Skeleton variant="rectangular" animation="wave" height={100}/>
    );
    if (error) return (
      console.log("ERROR in SigninBox ", { error })
    )
    const onClick = (id) => {
      removeEmployee({variables: {id: id}});
    }
  return (
    <TableContainer sx={{backgroundColor: 'primary.main'}}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>First name</TableCell>
            <TableCell>Last name</TableCell>
            <TableCell>Department</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            data.Public_Employee.map(({ id, firstName, lastName, department }) => (
              <TableRow key={id} value={id.value}>
                <TableCell>{id}</TableCell>
                <TableCell >{firstName}</TableCell>
                <TableCell >{lastName}</TableCell>
                <TableCell >{department.departmentName}</TableCell>
                <TableCell>
                  <Button variant="contained" color="error"
                    onClick={() => onClick(id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
