import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Fab,
  Button,
  TextField,
  Typography,
} from "@material-ui/core";
import { useMutation, useLazyQuery, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Link } from "next/link";
import { Formik } from "formik";
import * as Yup from "yup";

import Layout from "../../components/layout";
import AddPost from "../../components/addPost";

const GET_POSTS = gql`
  query Posts {
    posts {
      id
      name
      description
      imgUrl
      category
      date
    }
  }
`;

export default () => {
  const { loading, error, data } = useQuery(GET_POSTS);
  const [open, setOpen] = useState(false);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  //const { users } = data

  return (
    <Layout>
      <Container maxWidth="md">
        <div>          
          <Grid container justify="flex-start" spacing={8}>
            {data.posts.map((post) => (
                <>           
                  <Grid item xs={12} md={6} id={post.id}>
                  <Typography variant="subtitle2" gutterBottom>
                      {post.name}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                      {post.date}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    {post.description}
                  </Grid>
                </>
            ))}
          </Grid>
          <AddPost />
        </div>
      </Container>
    </Layout>
  );
};
