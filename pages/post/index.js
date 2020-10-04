import React from "react";
import {
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useRouter } from 'next/router'
//import Reactmarkdown from 'react-markdown'

import Layout from "../../components/layout";

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

export default () => {
   const router = useRouter();

   const postCount = 3;
   const page = parseInt(router.query.page || '1', 10)
   const start = (page - 1) * 3
   const LastPage = Math.ceil(postCount / 3)

  const { loading, error, data } = useQuery(GET_ARTICLES,
    { variables: { limit: postCount, start: start }}
   );  

  console.log(page)

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <Layout>
      <Container maxWidth="sm">
        <div>          
          <Grid container justify="flex-start" spacing={8}>
            {data.articles.map((article) => (
                <>           
                  <Grid item xs={12} md={12} id={article.id}>
                  <Typography variant="subtitle2" gutterBottom>
                      {article.title}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                      {article.published_at}
                    </Typography>
                  </Grid>
                </>
            ))}
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