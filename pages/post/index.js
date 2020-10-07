import React from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useRouter } from "next/router";
import styled from "styled-components";
//import Reactmarkdown from 'react-markdown'

import Layout from "../../components/layout";

const PostGrid = styled(Grid)({
  //  padding: '8px !important'
});

const GET_ARTICLES = gql`
  query Articles($start: Int!, $limit: Int!) {
    articles(start: $start, limit: $limit) {
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

const GET_AGGREGATE = gql`
  query ArticlesConnection {
    articlesConnection {
      aggregate {
        count
        totalCount
     }
  }
}
`;

export default () => {
  const router = useRouter();

  const postCount = 3;
  const page = parseInt(router.query.page || "1", 10);
  const start = (page - 1) * postCount;

  const { loading, error, data } = useQuery(GET_ARTICLES, {
    variables: { limit: postCount, start: start },
  });

  const { loading: loadingA, error: errorA, data: dataA } = useQuery(GET_AGGREGATE);
  
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  console.log(data.articles)
  console.log(dataA.articlesConnection.aggregate.count);

  const LastPage = Math.ceil(dataA.articlesConnection.aggregate.count / postCount);
  
  return (
    <Layout>
      <Container maxWidth="sm">
        <div>
          <Grid
            container
            justify="flex-start"
            spacing={1}
            alignItems="center"
            justify="center"
          >
            {data.articles.map((article) => (
              <React.Fragment>
                <PostGrid item xs={9} md={9}>
                  <Typography variant="subtitle2" gutterBottom>
                    {article.title}
                  </Typography>
                </PostGrid>
                <PostGrid item xs={3} md={3}>
                  {article.published_at.substring(5, 10).replace("-", "/")}
                </PostGrid>
              </React.Fragment>
            ))}
          </Grid>
          <Grid
            container
            justify="flex-start"
            spacing={1}
            alignItems="center"
            justify="center"
            style={{ marginTop: "5vh" }}
          >
            <Grid item>
              <Pagination count={LastPage} color="primary" />
            </Grid>
          </Grid>
        </div>
      </Container>
    </Layout>
  );
};

// export default () => {
//    const router = useRouter();
//   // const { pageNum } = router.query;

//   console.log(router.query.page)

//   return (
//     <Layout>
//       <Container maxWidth="md">
//         <div>
//           <Grid container justify="flex-start" spacing={8}>
//             {data.articles.map((article) => (
//                 <>
//                   <Grid item xs={12} md={12} id={article.id}>
//                   <Typography variant="subtitle2" gutterBottom>
//                       {article.title}
//                     </Typography>
//                     <Typography variant="subtitle2" gutterBottom>
//                       {article.published_at}
//                     </Typography>
//                   </Grid>
//                 </>
//             ))}
//           </Grid>
//         </div>
//       </Container>
//     </Layout>
//   );
// };

// export const getStaticPaths = async () => {

//   const { loading, error, dataR } = useQuery(GET_ARTICLES);

//   if (loading) return "Loading...";
//   if (error) return `Error! ${error.message}`;

//   const paths = dataR.map(post =>
//     {
//      params: { id: post.id }
//     }
//   )

//   return {
//     paths,
//     fallback: true
//   }
// }

// export const getStaticProps = async () => {
//   const { data } = useQuery(GET_ARTICLES);
//   return { props: { data } };
// };
