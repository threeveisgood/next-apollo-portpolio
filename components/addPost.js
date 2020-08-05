import React, { useState } from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Formik } from "formik";
import * as Yup from "yup";
import { makeStyles } from '@material-ui/core/styles';

import {
  Fab,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";

const useStyles = makeStyles((theme) => ({
    fab: {
      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
      position: "fixed",
      right: 16,
      bottom: 16,
    }
}))

const FormWrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  "> div + div": {
    marginTop: 16,
  },
});

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
  const classes = useStyles();
  const [open, setOpen] = useState(false);  
  const [addPost] = useMutation(ADD_POST, {
    refetchQueries: ["Posts"],
    onCompleted: (result) => {
      setOpen(false);
    },
  });

  const handleClose = () => setOpen(false);

  const handleAddPost = (values) => {
    addPost({ variables: values  });
  };

  return (      
      <> 
       <Fab className={classes.fab} color="primary" aria-label="add" onClick={() => setOpen(true)}>
         <AddIcon />
       </Fab>
       <Formik
        initialValues={{ name: "", price: "", imgUrl: "" }}
        validationSchema={Yup.object({
          name: Yup.string().required(),
          description: Yup.string().required(),
          imgUrl: Yup.string().required()
        })}
        onSubmit={(values) => {
          console.log("onSubmit")
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
        </>
  );
};
