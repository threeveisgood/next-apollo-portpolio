import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "@material-ui/core/styles";
import { ThemeProvider as StyledProvider } from "styled-components";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";
import { useApollo } from '../apollo/client'

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const client = useApollo(pageProps.initialApolloState)

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>OmenCrib</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ApolloProvider client={client}>
        <StyledProvider theme={theme}>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </StyledProvider>
      </ApolloProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
