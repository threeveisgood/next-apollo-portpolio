import { useRouter } from "next/router";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { gql, useQuery } from "@apollo/client";
import Layout from "../../components/layout";
import { Button, Container } from "@material-ui/core";
import styled from "styled-components";
import moment from "moment";
import Reactmarkdown from "react-markdown";
import Divider from '@material-ui/core/Divider';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const GET_ARTICLE = gql`
  query ARTICLE($id: ID!) {
    article(id: $id) {
      id
      title
      content
      createdAt
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
`;

const AuthorName = styled.span({
  fontWeight: 500,
});

const RecommendButton = styled(Button)({
  background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
  color: "whitesmoke",
  width: "6vh",
  marginTop: "4vh"
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
      <Container maxWidth="sm">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography
              variant="h5"
              gutterBottom
              style={{ fontWeight: 500 }}
            >
              {data.article.title}
            </Typography>
            <AuthorName>Aracation&nbsp;&nbsp;·&nbsp;&nbsp;</AuthorName>
            <Typography variant="overline" gutterBottom>
              {moment(data.article.createdAt).locale("ko").fromNow()}
            </Typography>
            <Divider style={{ marginTop: '5px' }}/>
          </Grid>          
          <Grid item xs={12}>
            <StyledReactmarkdown source={data.article.content} />
          </Grid>
        </Grid>
        <Grid container justify="center">
          <RecommendButton centered variant="contained">
            <ThumbUpIcon />&nbsp;&nbsp;0
          </RecommendButton>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Post;
