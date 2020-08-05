import { useRouter } from 'next/router'
import  gql from 'graphql-tag'
import { useQuery } from "@apollo/react-hooks";
import Layout from '../../components/layout'

const GET_POST = gql`
  query Post($id: ID!) {
    post(id: $id) {    
      id
      name
      description
      imgUrl
    }
  }
`

const Post = () => {      
  const router = useRouter()
  const { id } = router.query
  const { loading, error, data } = useQuery(GET_POST, {
      variables: { id }
  })

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return <Layout>
      <h3>Post: {id}</h3>
      <h4>Name: {data.post.name}</h4>
      <h4>Description: {data.post.description}</h4>
  </Layout>
}

export default Post