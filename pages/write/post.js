import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useMutation, useLazyQuery, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Link from "next/link";
import { Formik } from "formik";
import * as Yup from "yup";

import {
  Container,
  Grid,
  Fab,
  Button,
  TextField,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";

import Layout from "../../components/layout";

const ProgressWrapper = styled.div({
  width: "100%",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const StyledContainer = styled(Container)({
  paddingTop: 64,
  display: "flex",
  flexWrap: "wrap",
});

const StyledLink = styled(Link)({
  textDecoration: "none",
});

const StyledFab = styled(Fab)({
  position: "fixed",
  right: 16,
  bottom: 16,
});

const FormWrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  "> div + div": {
    marginTop: 16,
  },
});

const SearchContainer = styled.div({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  marginBottom: "48px",
});

const POSTS = gql`
  query Posts {
    posts {
      id
      name
      description
      imgUrl
    }
  }
`;

const ADD_POST = gql`
  mutation AddPost($name: String!, $description: String!, $imgUrl: String!) {
    addPost(name: $name, description: $description, imgUrl: $imgUrl) {
      id
      name
      description
      imgUrl
    }
  }
`;

export default () => {
  const [open, setOpen] = useState(false);
  //const { loading, error, data } = useQuery(POSTS);
  const [addPost] = useMutation(ADD_POST, {
//    refetchQueries: ["Posts"],
    onCompleted: (result) => {
      setOpen(false);
    },
  });

 /* if (loading)
    return (
      <ProgressWrapper>
        <CircularProgress color="secondary" />
      </ProgressWrapper>
    );
  if (error) return <p>Error Occured</p>; */

  const handleClose = () => setOpen(false);

  const handleAddPost = (values) => {
    addPost({ variables: values  });
  };

  return ( 
    <Layout>
      <StyledContainer>
        <Grid container justify="flex-start" spacing={8}>
          {/* <TextField InputProps={{}} />
          <Button onClick={addPost} variant="outlined" />  */}
       <StyledFab color="primary" aria-label="add" onClick={() => setOpen(true)}>
         <AddIcon />
       </StyledFab>
       <Formik
        initialValues={{ name: "", price: "", imgUrl: "" }}
        validationSchema={Yup.object({
          name: Yup.string().required(),
          description: Yup.string().required(),
          imgUrl: Yup.string().required()
        })}
        onSubmit={(values) => {
          console.log("add post complete.")
          handleAddPost(values)
        }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                maxWidth="sm"
                fullWidth
            >
              <DialogTitle id="form-dialog-title">Write Post</DialogTitle>
              <DialogContent>
                <DialogContentText>This post is stored in MongoDB</DialogContentText>
                <FormWrapper>
                  <TextField
                    label="Post Name"
                    name="name"
                    variant="outlined"
                    onChange={props.handleChange}
                  />
                  <TextField
                    label="Description"
                    name="description"
                    variant="outlined"
                    multiline
                    onChange={props.handleChange}
                    error={props.errors.description}
                    helperText={props.errors.description}
                  />
                  <TextField
                    label="Image URL"
                    name="imgUrl"
                    variant="outlined"
                    onChange={props.handleChange}
                  />
                </FormWrapper>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  onClick={() => props.submitForm()}
                  variant="contained"
                  color="primary"
                >
                  Add
                </Button>
              </DialogActions>
            </Dialog>
            </form>
          )}
        </Formik>
        </Grid>
      </StyledContainer>
    </Layout>
  );
};
