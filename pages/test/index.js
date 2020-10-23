import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../../components/layout";
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";

import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 11,
  },
});

export default () => {
  const classes = useStyles();

  return (
    <Layout>
      <div>
        <Grid
          container
          justify="flex-start"
          alignItems="center"
          justify="center"
          spacing={1}
        >
          <Grid item md={4}>
            <Card className={classes.root}>
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Posted By Aracation &nbsp;2일전
                </Typography>
                <Typography variant="h5" component="h2">
                  belent
                </Typography>
                <br />
                <Typography variant="body2" component="p">
                  well meaning and kindly.
                  {'"a benevolent smile"'}hello my friend im affd
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};
