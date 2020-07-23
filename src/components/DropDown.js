import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const DropDown = ({drivers, type, activeDriver, setActiveDriver}) =>{

  const classes = useStyles();

  const handleChange = (event) => {
    setActiveDriver(event.target.value);
  };
  
  return (
    <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Select {type}</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={activeDriver}
          onChange={handleChange}
          label={type}
        >
        
          {drivers ? drivers.map((driver, index) =>{
            return <MenuItem key={index} value={driver}>{driver}</MenuItem>
          }) : null}

        </Select>
      </FormControl>
  )
}

export default DropDown;