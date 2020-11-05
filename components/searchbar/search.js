import React from "react";
import { makeStyles, fade } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { useRouter } from "next/router";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";

const useStyles = makeStyles((theme) => ({
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
}));

const validationSchema = yup.object({
  search: yup.string().required(),
});

export const Search = () => {
  const router = useRouter();
  const classes = useStyles();

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <Formik initialValue={{ search: "" }} validationSchema={validationSchema}>
        {() => (
          <form autoComplete="off">
            <InputBase
              placeholder=""
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              name="search"
              inputProps={{ "aria-label": "search" }}
            />
          </form>
        )}
      </Formik>
    </div>
  );
};
