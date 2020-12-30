import Head from "next/head";
import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

import Layout from "../components/layout";
import { initializeApollo } from "../apollo/client";
import Postlist from "../components/post/postList";
import LoadingProgress from "../components/loadingProgress";


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
        totalCount
      }
    }
  }
`;

export default function Home() {
  const router = useRouter();

  const postCount = 15;
  const page = parseInt(router.query.page || "1", 10);
  const start = (page - 1) * postCount;

  const [pagination, setPagination] = useState(router.query.page);

  const handleChange = (event, value) => {
    setPagination(value);
    router.push({ pathname: `/post`, query: { page: `${value}` } })
  };

  const { data: dataA } = useQuery(GET_AGGREGATE, {
    fetchPolicy: "network-only"
  });

  const { loading, error, data } = useQuery(GET_ARTICLES, {
    variables: { limit: postCount, start: start },
  });

  if (loading) return <LoadingProgress />;
  if (error) return `Error! ${error.message}`;

  const LastPage = Math.ceil(
    dataA.articlesConnection.aggregate.count / postCount
  );

  const regex = /!\[[^\]]*\]\((.*?)\s*("(?:.*[^"])")?\s*\)/g
  return (
    <div className="container">
      <Head>
        <title>OmenCrib</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
      <Layout>
      {data.articles.map((article) => (
        <React.Fragment>
          <Postlist
            id={article.id}
            title={article.title}
            createdAt={article.createdAt}
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
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}
