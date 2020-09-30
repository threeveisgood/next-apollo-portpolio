import { useRouter } from "next/router";
import gql from "graphql-tag";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { useQuery } from "@apollo/react-hooks";
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

const Image = styled.img({
  maxWidth: "100%",  
});

const ImageGrid = styled(Grid)({
  textAlign: "center"
});

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
      <Container maxWidth="md">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            {data.article.title}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            {data.article.published_at}
          </Typography>
        </Grid>
        <ImageGrid item xs={12}>
          <Image src="/images/deer.jpg" alt="Deer" />
        </ImageGrid>
        <Grid item xs={12}>
         <Reactmarkdown source={data.article.content} />
        </Grid>
      </Grid>
      </Container>
    </Layout>
  );
};

export default Post;
