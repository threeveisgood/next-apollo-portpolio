import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { useRouter } from "next/router";
import SearchIcon from "@material-ui/icons/Search";

import { Button, Dialog, DialogTitle, DialogContent } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import DialogActions from "@material-ui/core/DialogActions";

const FormWrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  "> div + div": {
    marginTop: 16,
  },
});

const validationSchema = yup.object({
  search: yup.string().max(50).required(),
});

const handleKeyPress = (submit, e) => {    
    if (e.key === "Enter") {
      submit()
    }
  };

export default () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  return (
    <>
      <span onClick={() => setOpen(true)}>
        <SearchIcon />
      </span>
      <Formik
        initialValues={{ search: null }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          await router.push({
            pathname: `/search`,
            query: { search_value: `${values.search}` },
          });
        }}
      >
        {({ handleSubmit }) => (
          <Form autoComplete="off">
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
              maxWidth="sm"
              fullWidth
            >
              <DialogTitle id="form-dialog-title">Search</DialogTitle>
              <DialogContent>
                <FormWrapper>
                  <Field
                    component={TextField}
                    label="Search"
                    name="search"
                    onKeyPress={(e => handleKeyPress(handleSubmit, e))}
                    //inputProps={{ "aria-label": "search" }}
                  />
                </FormWrapper>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  취소
                </Button>
              </DialogActions>
            </Dialog>
          </Form>
        )}
      </Formik>
    </>
  );
};
