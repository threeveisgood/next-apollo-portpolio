import React from "react";
import styled from "styled-components";
import Layout from "../../components/layout";
import Grid from "@material-ui/core/Grid";

const index = () => {
  return (    
       <Layout>
        <Grid
          container
          justify="flex-start"
          alignItems="center"
          justify="center"
          spacing={1}
        >
          <Grid container item md={4} xs={12}>            
           <Grid item xs={9}>
            <div>오늘 출시되는 dddd</div>
            </Grid>
            <Grid item xs={3}>
            <div>10 분 전</div>
            </Grid>
          </Grid>
        </Grid>      
        </Layout>
  );
};

export default index;
