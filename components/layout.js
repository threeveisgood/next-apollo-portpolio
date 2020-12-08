import React from "react";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Divider from "@material-ui/core/Divider";
import { useRouter } from "next/router";
import { Search } from "./searchbar/search";
import { SearchMobile } from "./searchbar/searchMobile";

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
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    marginBottom: "10px",
  },
  root: {
    display: "flex",
    background: 'linear-gradient(0deg, rgba(142,123,161,1) 0%, rgba(84,121,184,1) 100%)',    
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    height: "55px",
    background: "linear-gradient(0deg, rgba(142,123,161,1) 0%, rgba(84,121,184,1) 100%)",
    boxShadow: "none",
    marginBottom: "0",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: theme.spacing(3),
  },
  titleText: {
    color: "ghostwhite",
    textDecoration: "none",
  },
  tabs: {
    minHeight: "40px",
    maxHeight: "40px",
  },
  tabsContainer: {
    marginTop: "-10px",
    background: "linear-gradient(45deg, #161716 5%, #120f0f 90%)",
  },
  desktop: {
    ["@media (max-width:615px)"]: {
      display: "none",
    },
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
      label: "전체 목록",
      link: "/post",
    },
    {
      label: "PC",
      link: "/pc",
    },
    {
      label: "Switch",
      link: "/nintendo",
    },
    {
      label: "PS5",
      link: "/playstation",
    },
    {
      label: "Moblie",
      link: "/mobile",
    },
    {
      label: "Xbox",
      link: "/xbox",
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
          <Grid justify="center" container className={classes.desktop}>
            <Grid item md={3}>
              <Link href="/">
                <a className={classes.titleText}>
                  <h2 style={{ marginBottom: "30px" }}>OmenCrib</h2>
                </a>
              </Link>
            </Grid>
            <Grid item>
              <Search />
            </Grid>
          </Grid>
            <SearchMobile />
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
                <Link href={`${tab.link}`}>
                  <a style={{ textDecoration: "none" }}>
                    <Tab
                      value={index}
                      label={tab.label}
                      {...a11yProps(index)}
                      onClick={(e) => handleClick(tab.link, e)}
                    />
                  </a>
                </Link>
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
