import React, { useState, useEffect } from "react";
import styled from "styled-components";

import {
  Container,
  Grid,
} from "@material-ui/core";

import Layout from "../../components/layout";
import Editor from "../../components/write/editor";

const StyledContainer = styled(Container)({
  paddingTop: 64,
  display: "flex",
  flexWrap: "wrap",
});


export default () => {
  return (
    <Layout>      
      <StyledContainer>        
        <Grid container justify="flex-start" spacing={8}>
          <Editor /> 
        </Grid>
      </StyledContainer>
    </Layout>
  );
};
