import { useRouter } from "next/router";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { gql, useQuery } from "@apollo/client";
import Layout from "../../components/layout";
import { Container } from "@material-ui/core";
import styled from "styled-components";
import Reactmarkdown from 'react-markdown'

const GET_ARTICLE = gql`
  query ARTICLE($id: ID!) {
    article(id: $id) {            
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

const StyledReactmarkdown = styled(Reactmarkdown)`
  img {
    max-width: 100%;
    height: auto;
  }
`

const Post = () => {  
  const router = useRouter();
  const { id } = router.query;
  const { loading, error, data } = useQuery(GET_ARTICLE, {
    variables: { id },
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <Layout>
      <Container maxWidth="sm">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            {data.article.title}
          </Typography>
          <Typography variant="overline" gutterBottom>
            {data.article.published_at}
          </Typography>
        </Grid>
        <Grid item xs={12}>
         <StyledReactmarkdown source={data.article.content} />
        </Grid>
      </Grid>
      </Container>
    </Layout>
  );
};

export default Post;
