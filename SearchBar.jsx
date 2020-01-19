import React from 'react'

import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

class SearchBar extends React.Component {
  render() {
    return (
        <Paper
          className="SearchBox"
          elevation={2}
        >
          <InputBase
            style={{ marginLeft: 12, flex: 1 }}
            placeholder="I'm looking for"
          />
          <NativeSelect
            value={state.age}            
            name="age"
            className={classes.selectEmpty}
            inputProps={{ 'aria-label': 'age' }}
           >
            <option value={1}>Users</option>
            <option value={2}>Films</option>
            
          </NativeSelect>
          <IconButton style={{ padding: 10 }} aria-label="Search">
            <SearchIcon />
          </IconButton>
        </Paper>

    )
  }
}


export default SearchBar
