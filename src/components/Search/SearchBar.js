import React, { useState } from 'react';
import useAutocomplete from '@material-ui/lab/useAutocomplete'
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import { useHistory,useLocation } from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search';
import { List, ListItem } from '@material-ui/core';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // marginTop:"1rem"
  },
 
 
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
 
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  label: {
    display: 'block',
  },
  input: {
    width: 200,
  },
  listbox: {
    width: '100%',
    
    maxWidth: 300,
    backgroundColor: theme.palette.background.paper,
    
    margin: 0,
    padding: 0,
    zIndex: 1,
    position: 'absolute',
    listStyle: 'none',
   
    overflow: 'auto',

  },
}));

export default function SearchAppBar() {
    const history = useHistory()
  const classes = useStyles();
  const category = [];
  const [open,setOpen] = useState(false)
  const Data = useSelector((state)=>state.post.posts)
  Data.map(e=>e.category.map(a=>category.includes(a) === true ? <></>:category.push(a)))
  // console.log(category);
  const {
  
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: 'use-autocomplete-demo',
    options: category,
    getOptionLabel: (option) => option,
  });
  
  return (
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search???"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onClick={()=>setOpen(false)}
              inputProps={{ 'aria-label': 'search' }}
              {...getInputProps()}
            />
          {open === false ? groupedOptions.length > 0 ? (
        <List className={classes.listbox} {...getListboxProps()}>
          {groupedOptions.map((option, index) => (
            <ListItem button style={{color:"black"}} {...getOptionProps( option, index )}
            onClick={()=>{
              setOpen(true)
                console.log("option")
                history.push("/search_by_category",option)
              }
             }
            >{option}</ListItem>
          ))}
        </List>
      ) : null:<></> }
            
          </div>
     );
}
