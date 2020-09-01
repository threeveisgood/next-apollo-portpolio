import { useRouter } from "next/router";
import gql from "graphql-tag";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { useQuery } from "@apollo/react-hooks";
import Layout from "../../components/layout";
import { Container } from "@material-ui/core";
import styled from "styled-components";

const GET_POST = gql`
  query Post($id: ID!) {
    post(id: $id) {            
      id
      name
      description
      imgUrl
    }
  }
`;

const ContainerDiv = styled.div({
  flexGrow: '1'
})

const Image = styled.img({
  maxWidth: "100%",  
});

const ImageGrid = styled(Grid)({
  textAlign: "center"
});

const Post = () => {  
  const router = useRouter();
  const { id } = router.query;
  const { loading, error, data } = useQuery(GET_POST, {
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
            {data.post.name}
          </Typography>
        </Grid>
        <ImageGrid item xs={12}>
          <Image src="/images/deer.jpg" alt="Deer" />
        </ImageGrid>
        <Grid item xs={12}>
          <Typography variant="body1" gutterBottom>
            {data.post.description}
            Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem
            ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem
            ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem
            ipsumLorem ipsum
          </Typography>
        </Grid>
      </Grid>
      </Container>
    </Layout>
  );
};

export default Post;
