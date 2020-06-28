import React from 'react';
import Header from './header'
import { Container } from "@material-ui/core";

const layout = (props) => {
    return (
        <div>
          <Header />
          <Container>
           {props.children}        
          </Container>             
        </div>
    );
};

export default layout;