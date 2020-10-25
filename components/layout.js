import React from "react";
import Link from "next/link";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Divider from "@material-ui/core/Divider";
import { useRouter } from "next/router";

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    //display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    marginBottom: "10px",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
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
    ["@media (max-width:600px)"]: {
      display: "none",
    },
    marginTop: "17px"
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
  root: {
    display: "flex",
    //backgroundColor: "#F0EFF3",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    height: "55px",
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    boxShadow: "none",
    marginBottom: "0",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: "45px", //theme.spacing(7),
  },
  titleText: {
    color: "beige",
    textDecoration: "none"
  },
  tabs: {
    minHeight: "40px",
    maxHeight: "40px",
  },
  tabsContainer: {
    marginTop: "-10px",
    background: "linear-gradient(45deg, #161716 5%, #120f0f 90%)",
  },
}));

export const StyledA = styled.a`
  textdecoration: "none";
`;

export default function Header(props) {
  const classes = useStyles();
  const router = useRouter();

  const tabs = [
    {
      label: "PC",
      link: "/post",
    },
    {
      label: "Switch",
      link: "/post/5f686df2a460e43e08e73900",
    },
    {
      label: "PS5",
      link: "/post",
    },
    {
      label: "Moblie",
      link: "/post/5f686df2a460e43e08e73900",
    },
    {
      label: "Xbox",
      link: "/post/5f686df2a460e43e08e73900",
    },
    {
      label: "Anime",
      link: "/post/5f686df2a460e43e08e73900",
    },
  ];

  const handleClick = (link, e) => {
    e.preventDefault();
    router.push(link);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar>
          <Grid justify="center" container>
            <Grid item md={3}>
              <Link href="/">
                <a className={classes.titleText} >                  
                    <h2 style={{ marginBottom: "30px" }}>OmenBase</h2>
                </a>
              </Link>
            </Grid>
            <Grid item>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="
                Under Construction"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
            </Grid>
          </Grid>
          <div className={classes.grow} />
        </Toolbar>
        <Grid justify="center" container className={classes.tabsContainer}>
          <Tabs
            value={false}
            textcolor="primary" //can't resolve it, replace to textColor
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs"
            className={classes.tabs}
          >
            <Grid item>
              {tabs.map((tab, index) => (
                <Tab
                  value={index}
                  label={tab.label}
                  {...a11yProps(index)}
                  onClick={(e) => handleClick(tab.link, e)}
                />
              ))}
            </Grid>
          </Tabs>
        </Grid>
        <Divider />
      </AppBar>
      <main className={classes.content}>
        <Toolbar />
        {props.children}
      </main>
    </div>
  );
}
