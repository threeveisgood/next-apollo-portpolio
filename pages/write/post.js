import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";


const GET_SEARCH_AGGREGATE = gql`
  query ArticlesConnection($where: JSON!) {
    articlesConnection(where: $where) {
      aggregate {
        count        
      }
    }
  }
`;


export default () => {
  const router = useRouter();
  
   const { search } = router.query;

  const value2 = { title_contains: search }

  const { loading, error, data } = useQuery(GET_SEARCH_AGGREGATE, {
    variables: { where: value2 }
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  
  console.log(`${data.articlesConnection.aggregate.count}`)

  return (
    <div></div>
  );
};
