import React from 'react'
import { gql, useQuery } from '@apollo/client'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

const employees = gql`
{
  Public_Employee {
    id
    firstName
    lastName
    department {
      departmentName
    }
  }
}
`;

export default function Employees () {
    const { loading, error, data} = useQuery(employees);
    if (loading) return (
        <Alert severity="info">
        <AlertTitle>Info</AlertTitle>
        This is an info alert — <strong>check it out!</strong>
        </Alert>
    );
    if (error) return (
        <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        This is an error alert — <strong>check it out!</strong>
        </Alert>
    )
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>First name</TableCell>
            <TableCell>Last name</TableCell>
            <TableCell>Department</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            data.Public_Employee.map(({ id, firstName, lastName, department }) => (
              <TableRow>
                <TableCell>{id}</TableCell>
                <TableCell >{firstName}</TableCell>
                <TableCell >{lastName}</TableCell>
                <TableCell >{department.departmentName}</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
