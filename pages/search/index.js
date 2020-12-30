import React, { useState } from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import styled from "styled-components";
import Layout from "../../components/layout";
import { initializeApollo } from "../../apollo/client";
import PostList from "../../components/post/postList";

const GET_SEARCH_RESULT = gql`
  query Articles($start: Int!, $limit: Int!, $where: JSON!) {
    articles(start: $start, limit: $limit, where: $where) {
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

const GET_SEARCH_AGGREGATE = gql`
  query ArticlesConnection($where: JSON!) {
    articlesConnection(where: $where) {
      aggregate {
        count
      }
    }
  }
`;

const ProgressWrapper = styled.div({
  width: '100%',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: "center"
})


export default () => {
  const router = useRouter();

  const postCount = 6;
  const page = parseInt(router.query.page || "1", 10);
  const start = (page - 1) * postCount;
  const { search_value } = router.query;
  const searchValue = { title_contains: search_value };

  const [pagination, setPagination] = useState(page);

  const handleChange = (event, value) => {
    setPagination(value);
    router.push({
      pathname: `/search`,
      query: { search_value: `${search_value}`, page: `${value}` },
    });
  };

  const { data: dataA } = useQuery(GET_SEARCH_AGGREGATE, {
    variables: { where: searchValue },
    fetchPolicy: "network-only",    
  });

  const { loading, error, data } = useQuery(GET_SEARCH_RESULT, {
    variables: { limit: postCount, start: start, where: searchValue },
  });

  if (loading) return <ProgressWrapper><CircularProgress color="primary" /></ProgressWrapper>;
  if (error) return `Error! ${error.message}`;

  const LastPage = Math.ceil(
    dataA.articlesConnection.aggregate.count / postCount
  );

  console.log(LastPage);
  const regex = /!\[[^\]]*\]\((.*?)\s*("(?:.*[^"])")?\s*\)/g;

  return (
    <Layout>
      {data.articles.map((article) => {
        console.log(article.content.replace(regex, ""));
      })}
      {data.articles.map((article) => (
        <React.Fragment>
          <PostList
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

export async function getServerSideProps() {
  const apolloClient = initializeApollo();

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}
