import React from 'react'
import { gql, useQuery } from '@apollo/client'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Typography from '@mui/material/Typography'

const employees = gql`
{
    Public_Employee {
      id
      firstName
      lastName
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
  return data.Public_Employee.map(({ id, firstName, lastName}) => (
    <div key={id}>
        <p>
            {firstName} | {lastName}
        </p>
    </div>
  ));
}
