import { useMutation, useQuery } from '@apollo/client';
import { Alert, AlertTitle, Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, Skeleton, TextField} from '@mui/material';
import React, { useState } from 'react'
import { department, insertemployee } from '../api/queries';


const NewEmployee = (props) => {

    const [addEmployee] = useMutation(insertemployee);   
    const onSubmit = (e) => {
        e.preventDefault();
        props.close();
        addEmployee({ variables: { firstName: e.target.firstName.value, lastName: e.target.lastName.value, age: e.target.age.value, deptId:  e.target.deptId.value}});
      }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const [ dept, setValue ] = useState('');
    const handleChange = (e) => {
        e.preventDefault();
        setValue(e.target.value)
      };
    
    const { loading, error, data} = useQuery(department);
    if (loading) return (
        <Skeleton variant="rectangular" animation="wave" height={100}/>
    );
    if (error) return (
        <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        This is an error alert — <strong>check it out!</strong>
        </Alert>
    )
    return (
        <Modal
            open={props.show}
            onClose={props.close}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <form onSubmit={onSubmit}>
            <Box sx={style}>
                <Box m={1} pt={1}>
                <TextField fullWidth id="outlined-basic" label="First name" variant="outlined" name='firstName'/>
                </Box>
                <Box m={1} pt={1}>
                <TextField fullWidth id="outlined-basic" label="Last name" variant="outlined" name='lastName'/>
                </Box>
                <Box m={1} pt={1}>
                <TextField fullWidth id="outlined-basic" label="Age" variant="outlined" name='age'/>
                </Box>
                <Box m={1} pt={1}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Department</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={dept}
                        label="Department"
                        onChange={handleChange}
                        name= 'deptId'
                    >
                        {
                            data.Public_Department.map(({id, departmentName}) =>(
                                <MenuItem value={id} key={id}>{departmentName}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                </Box>
                <Box sx={{ display: 'flex' }} m={2} pt={3} justifyContent="space-between">
                <Button variant="contained" type='submit'>Submit</Button>
                <Button variant="contained" onClick={props.close}>Cancel</Button>
                </Box>

            </Box>
            </form>
        </Modal>
    )
}

export default NewEmployee
