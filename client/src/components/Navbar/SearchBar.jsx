import React from 'react'

import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import NativeSelect from '@material-ui/core/NativeSelect';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
 const useStyles = makeStyles(theme => ({
  
  formControl: {
    height:'100%',
    minWidth: 80,
    border:"1px solid grey",
    borderTopLeftRadius:21,
    borderBottomLeftRadius:21,
    overflow:"hidden",
    background:"white",

  },
  selectEmpty: {
    paddingTop:3
    //marginLeft: theme.spacing(2),
  },
  searchIcon: {
    width: 25,
    height: 25,
  }
}));
export default function SearchBar() {
  const classes = useStyles();
  const [age, setAge] = React.useState(1);

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  
  const handleChange = event => {
    setAge(event.target.value);
  };
  return (
      <Paper
        className="SearchBox"
        elevation={2}
      >
        <FormControl className={classes.formControl}>
        <Select
          //value={state.age}
          className={classes.selectEmpty}
          value={age}
          onChange={handleChange}
          >
          <style jsx>{`
          .MuiSelect-icon {
            width: 19px;
            height: 19px;
          }
        `}</style>
          <MenuItem value={1}>Users</MenuItem>
          <MenuItem value={2}>Films</MenuItem>
          
        </Select>
        </FormControl>
        <InputBase
          style={{ marginLeft: 12, flex: 1 }}
          placeholder="I'm looking for"
        />
        <IconButton style={{ padding: 10 }} aria-label="Search">
          <SearchIcon className={classes.searchIcon}/>
        </IconButton>
      </Paper>

  )
}

