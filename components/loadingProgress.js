import React from 'react';
import styled from "styled-components";
import { CircularProgress } from "@material-ui/core"; 

const ProgressWrapper = styled.div({
    width: '100%',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: "center"
  })
  
const loadingProgress = () => {
    return (
        <div>
          <ProgressWrapper><CircularProgress color="secondary" /></ProgressWrapper>            
        </div>
    );
};

export default loadingProgress;
