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
          <h1>writePost</h1>
          <Grid container justify="flex-start" spacing={8}>
            {data.posts.map((post, i) => (
              <Grid item xs={12} md={4}>
                <div key={i}>
                  <div>{post.name}</div>
                  <div>{post.description}</div>
                  <div>{post.id}</div>
                  <div>{post.imgUrl}</div>
                </div>
              </Grid>
            ))}
          </Grid>
          <AddPost />
        </div>
        <div>
          <h1>writePost</h1>
          <Grid container justify="flex-start" spacing={8}>
            {data.posts.map((post, i) => (
                <>           
                  <Grid item sm={3}>
                    <Typography variant="subtitle2" gutterBottom>
                      {post.name}
                    </Typography>
                  </Grid>
                  <Grid item sm={3}>
                    {post.description}
                  </Grid>
                  <Grid item sm={3}>{post.id}</Grid>
                  <Grid item sm={3}>{post.imgUrl}</Grid>                
                </>
            ))}
          </Grid>
          <AddPost />
        </div>
      </Container>
    </Layout>
  );
};
