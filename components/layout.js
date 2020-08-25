import React from "react";
import Link from "next/link";
import { fade, makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";
import { Container, Paper } from "@material-ui/core";
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
    display: "none",
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
    backgroundColor: "ghostwhite",
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
    marginTop: theme.spacing(7),
  },
  titleText: {
    color: "beige",
  },
  tabs: {
    minHeight: "37px",
    maxHeight: "37px",
  },
  wrapper: {
    paddingBottom: "10px",
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
      label: "Post List",
      link: "/post",
    },
    {
      label: "React",
      link: "/post/5ef874da2ba15915f42606a7",
    },
    {
      label: "Next.js",
      link: "/post",
    },
    {
      label: "Apollo",
      link: "/post/5ef874da2ba15915f42606a7",
    },
    {
      label: "Express",
      link: "/post/5ef874da2ba15915f42606a7",
    },
    {
      label: "MongoDB",
      link: "/post/5ef874da2ba15915f42606a7",
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
            <Grid justify='center' container>
            <Grid item md={3}>
            <Typography className={classes.title} variant="h6" noWrap>
              <Link href="/">
                <StyledA className={classes.titleText}>Threeveisgood</StyledA>
              </Link>
            </Typography>
            </Grid>
            <Grid item>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="
                Under construction"
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
        <Grid justify="center" container>
          <Tabs
            value={false}
            textColor="primary"
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
