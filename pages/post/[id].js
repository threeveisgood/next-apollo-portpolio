import { useRouter } from "next/router";
import Head from "next/head";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { gql, useQuery } from "@apollo/client";
import Layout from "../../components/layout";
import List from "../../components/categoriesPostList/list";
import { Button, Container, CircularProgress } from "@material-ui/core";
import styled from "styled-components";
import moment from "moment";
import Reactmarkdown from "react-markdown";
import Divider from "@material-ui/core/Divider";
import RelationList from "../../components/relationPostList/relationList";

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
      recommend
    }
  }
`;

const StyledReactmarkdown = styled(Reactmarkdown)`
  img {
    max-width: 100%;
    height: auto;
  }
`;

const ProgressWrapper = styled.div({
  width: '100%',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: "center"
})

const AuthorName = styled.span({
  fontWeight: 500,
});

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const { loading, error, data } = useQuery(GET_ARTICLE, {
    variables: { id },
  });

  if (loading) return <ProgressWrapper><CircularProgress color="secondary" /></ProgressWrapper>;
  if (error) return `Error! ${error.message}`;
  
  //console.log(data.article.categories[0].name);
  return (
    <>
      <Head>
        <title>{data.article.title}</title>
      </Head>
      <Layout>
        <Container maxWidth="sm">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom style={{ fontWeight: 500 }}>
                {data.article.title}
              </Typography>
              <AuthorName>Aracation&nbsp;&nbsp;·&nbsp;&nbsp;</AuthorName>
              <Typography variant="overline" gutterBottom>
                {moment(data.article.createdAt).locale("ko").fromNow()}
              </Typography>
              <Divider style={{ marginTop: "5px" }} />
            </Grid>
            <Grid item xs={12}>
              <StyledReactmarkdown source={data.article.content} />
            </Grid>
          </Grid>      
        </Container>        
        <div style={{ marginTop: '9vh' }}>
        <RelationList gameCategory={data.article.categories[0].name} />
        </div>
      </Layout>
    </>
  );
};

export default Post;
