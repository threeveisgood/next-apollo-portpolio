import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import moment from "moment";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 11,
  },
});

export default ({ published_at, title, previewContent }) => {
  const classes = useStyles();
  
  return (
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
                  Posted By Aracation &nbsp;{moment(published_at, "YYYYMMDD").locale("ko").fromNow()}
                </Typography>
                <Typography variant="h6" component="h2">
                  {title}
                </Typography>
                <br />
                <Typography variant="body2" component="p">
                  {previewContent}..
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
  );
};
