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

const DropDown = ({options, type, active, setActive, testID}) =>{

  const classes = useStyles();

  const handleChange = (event) => {
    setActive(event.target.value);
  };

  const unit = type==="Time Interval" ? "(Days)" : null
  
  return (
    <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">{type} {unit}</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={active}
          onChange={handleChange}
          label={type}
          data-testid={testID}
        >
        
          {options ? options.map((option, index) =>{
            return <MenuItem key={index} value={option} data-testid={`${testID}${index}`}>{option}</MenuItem>
          }) : null}

        </Select>
      </FormControl>
  )
}

export default DropDown;