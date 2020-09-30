import React from "react";
import {
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Reactmarkdown from 'react-markdown'

import Layout from "../../components/layout";

const GET_ARTICLES = gql`
  query Articles {
    articles {
      id
      title
      content
      image {
        url
      }
      published_at
      categories {
        name
      }
    }
  }
`;

export default () => {
  // const router = useRouter();
  // const { pageNum } = router.query;
  const { loading, error, data } = useQuery(GET_ARTICLES);  

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <Layout>
      <Container maxWidth="md">
        <div>          
          <Grid container justify="flex-start" spacing={8}>
            {data.articles.map((article) => (
                <>           
                  <Grid item xs={12} md={12} id={article.id}>
                  <Typography variant="subtitle2" gutterBottom>
                      {article.title}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                      {article.published_at}
                    </Typography>
                  </Grid>
                </>
            ))}
          </Grid>          
        </div>
      </Container>
    </Layout>
  );
};
