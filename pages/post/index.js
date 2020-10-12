import React, { useState, useEffect } from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import styled from "styled-components";
import Link from "next/link";

import Layout from "../../components/layout";
import { initializeApollo } from "../../apollo/client";

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

  const [pagination, setPagination] = useState(router.query.page);

  const handleChange = (event, value) => {
    setPagination(value);
    router.push("/post?page=" + value);
  };

  const { data: dataA } = useQuery(GET_AGGREGATE);

  const { loading, error, data } = useQuery(GET_ARTICLES, {
    variables: { limit: postCount, start: start },
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  // console.log(data.articles);
  // console.log(dataA.articlesConnection.aggregate.count);
  // console.log(router.query.page)

  const LastPage = Math.ceil(
    dataA.articlesConnection.aggregate.count / postCount
  );

  console.log(router.query.page);
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
                  <Typography id={article.id} variant="subtitle2" gutterBottom>
                    <Link href={`/post/${article.id}`}>
                      <a style={{ textDecoration: "none", color: "inherit" }}>
                        {article.title}
                      </a>
                    </Link>
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
              <Pagination
                count={LastPage}
                color="secondary"
                size="small"
                page={pagination}
                onChange={handleChange}
                shape="rounded"
                showFirstButton
                showLastButton
                renderItem={(item) => <PaginationItem {...item} />}
                defaultPage={page}
              />
            </Grid>
          </Grid>
        </div>
      </Container>
    </Layout>
  );
};

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  // await apolloClient.query({
  //   query: GET_ARTICLES,
  //   query: GET_AGGREGATE
  // })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}
