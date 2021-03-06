import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import moment from "moment";
import Link from "next/link"

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  information: {
    fontSize: 11,
  },
});

export default ({ createdAt, title, previewContent, id }) => {  
  const classes = useStyles();

  return (
    <div id={id}>
      <Grid
        container
        justify="flex-start"
        alignItems="center"
        justify="center"
        spacing={1}
        style={{ marginTop: "10px" }}
      >
        <Grid item lg={3} md={4} xs={12} >
          <Link href={`../post/${id}`}>
            <a style={{ textDecoration: "none" }}>
              <Card className={classes.root}  style={{ background: 'linear-gradient(0deg, rgba(142,123,161,1) 0%, rgba(84,121,184,1) 100%)'}}>
                <CardContent>
                  <Typography
                    className={classes.information}
                    color="textSecondary"
                    gutterBottom
                    style={{ color: 'gainsboro' }}
                  >
                    Posted By Aracation &nbsp;
                    {moment(createdAt).locale("ko").fromNow()}
                  </Typography>
                  <Typography variant="h6" component="h2" style={{ color: 'floralwhite' }}>
                    {title}
                  </Typography>
                  <br />
                  <Typography variant="body2" component="p" style={{ color: 'white' }}>
                    {previewContent}..
                  </Typography>
                </CardContent>
              </Card>
            </a>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};
