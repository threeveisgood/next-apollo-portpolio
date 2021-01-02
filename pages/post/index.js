import React, { useState } from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import styled from "styled-components";
import Layout from "../../components/layout";
import { initializeApollo } from "../../apollo/client";
import Postlist from "../../components/post/postList";

const GET_ARTICLES = gql`
  query Articles($start: Int!, $limit: Int!) {
    articles(start: $start, limit: $limit) {
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

const GET_AGGREGATE = gql`
  query ArticlesConnection {
    articlesConnection {
      aggregate {
        count
      }
    }
  }
`;

const ProgressWrapper = styled.div({
  width: "100%",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export default () => {
  const router = useRouter();

  const postCount = 8;
  const page = parseInt(router.query.page || "1", 10);
  const start = (page - 1) * postCount;

  const [pagination, setPagination] = useState(router.query.page);

  const handleChange = (event, value) => {
    setPagination(value);
    router.push({ pathname: `/post`, query: { page: `${value}` } });
  };

  const { loading: loadingA, error: errorA, data: dataA } = useQuery(
    GET_AGGREGATE
  );

  const { loading, error, data } = useQuery(GET_ARTICLES, {
    variables: { limit: postCount, start: start },
  });

  if (loading || loadingA)
    return (
      <ProgressWrapper>
        <CircularProgress color="primary" />
      </ProgressWrapper>
    );
  if (error || errorA) return `Error! ${error.message}`;

  const LastPage = Math.ceil(
    dataA.articlesConnection.aggregate.count / postCount
  );    
  const regex = /!\[[^\]]*\]\((.*?)\s*("(?:.*[^"])")?\s*\)/g;

  return (
    <Layout>
      {data.articles.map((article) => (
        <React.Fragment>
          <Postlist
            id={article.id}
            title={article.title}
            createdAt={article.createdAt}
            previewContent={article.content
              .replace(regex, "")
              .substring(0, 100)}
          />
        </React.Fragment>
      ))}
      <div>
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
    </Layout>
  );
};

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}
