import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Grid, Fab, Button, TextField } from "@material-ui/core";
import { Link } from "next/link";
import { Formik } from "formik";
import * as Yup from "yup";

import Layout from "../../components/layout";


export default () => {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);

  const { users } = data

  return (
    <Layout>
      <div>
        <h1>writePost</h1>
        <Grid container justify="flex-start" spacing={8}>
        {posts.map((post, i) => (
            <Grid item xs={12} md={4}>
              <div key={i}>{post.name}</div>
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
  );
};
