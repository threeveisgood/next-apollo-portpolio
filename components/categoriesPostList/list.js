import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import styled from "styled-components";

import Layout from "../layout";
import { initializeApollo } from "../../apollo/client";
import PostList from "../post/postList";


const GET_ARTICLES = gql`
  query Articles($start: Int!, $limit: Int!, $where: JSON!) {
    articles(start: $start, limit: $limit, where: $where) {
      id
      title
      content
      published_at
      categories {
        name
      }
    }
  }
`;

const GET_AGGREGATE = gql`
  query CategoriesConnection($where: JSON!) {
    categoriesConnection(where: $where) {
      aggregate {
        count
        totalCount
      }
    }
  }
`;

export default ({ gameCategory }) => {
  const router = useRouter();

  const postCount = 8;
  const page = parseInt(router.query.page || "1", 10);
  const start = (page - 1) * postCount;
  const category = { categories: { name: `${gameCategory}` }}
  const categoryAggregate = { name: `${gameCategory}` }

  const [pagination, setPagination] = useState(router.query.page);

  const handleChange = (event, value) => {
    setPagination(value);
    router.push(`/${gameCategory}?page=` + value);
  };

  const { data: dataA } = useQuery(GET_AGGREGATE, {
      variables: { where: categoryAggregate }
  });

  const { loading, error, data } = useQuery(GET_ARTICLES, { //
    variables: { limit: postCount, start: start, where: category },
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const LastPage = Math.ceil(
    dataA.categoriesConnection.aggregate.count / postCount
  );

  //Markdown Image Regex 
  const regex = /!\[[^\]]*\]\((.*?)\s*("(?:.*[^"])")?\s*\)/g

  return (
    <Layout>
      {data.articles.map((article) => {
        console.log(article.content.replace(regex, '')) 
      })}
      {data.articles.map((article) => (
        <React.Fragment>
          <PostList
            id={article.id}
            title={article.title}
            published_at={article.published_at}
            previewContent={(article.content.replace(regex, '').substring(0,100))}            
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
