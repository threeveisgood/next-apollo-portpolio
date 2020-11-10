import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Link from "next/link";
import SearchBarMobile from "./searchBarMobile";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(25),
      width: "auto",
    },
    marginBottom: "10px",
    height: "30px",
    //erase search bar !!
    ["@media (min-width:600px)"]: {
      display: "none",
    },
    marginTop: "17px",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    /* padding: theme.spacing(1, 1, 1, 0), */
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  mobile: {
    ["@media (min-width:615px)"]: {
      display: "none",
    },
  },
  titleText: {
    color: "beige",
    textDecoration: "none",
  },
  searchButton: {
    marginTop: '20px'
  }
}));

export const SearchMobile = () => {  
  const classes = useStyles();

  return (    
    <Grid container className={classes.mobile} justify="space-between">
      <Grid item align="center">
        <Link href="/">
          <a className={classes.titleText}>
            <h2 style={{ marginBottom: "30px" }}>OmenBase</h2>
          </a>
        </Link>
      </Grid>
      <Grid item className={classes.searchButton} justify="flex-end">
        <SearchBarMobile />
      </Grid>
    </Grid>

  );
};