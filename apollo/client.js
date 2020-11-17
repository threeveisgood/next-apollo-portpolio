import {
    ApolloClient,
    InMemoryCache,
} from "@apollo/client"
import { useMemo } from 'react'

const GRAPHQL_URL = process.env.API_URL || "https://calm-dawn-07564.herokuapp.com/"//"http://localhost:1337"

let apolloClient

function createIsomorphicLink() {
    if (typeof window === "undefined") {
      const { SchemaLink } = require('@apollo/client/link/schema')
      const { schema } = require('./schema')
      return new SchemaLink({ schema })
    } else {
        const { HttpLink } = require('@apollo/client/link/http')
        return new HttpLink({uri: GRAPHQL_URL + "/graphql"});
    }
}

function createApolloClient() {
    return new ApolloClient({
        ssr: typeof window === "undefined",
        link: createIsomorphicLink(),
        cache: new InMemoryCache()
    })
}

export function initializeApollo(initialState = null) {
    const _apolloClient = apolloClient ?? createApolloClient()

    if (initialState) {
        _apolloClient.cache.restore(initialState)
    }

    if (typeof window === "undefined") return _apolloClient
    if (!apolloClient) apolloClient = _apolloClient

    return _apolloClient
}

export function useApollo(initialState) {
    const store = useMemo(() => initializeApollo(initialState), [initialState])
    return store
}

/*
in use case, _app.js : const client = useApollo(pageProps.initialApolloState)
    or const apolloClient = useApollo(pageProps.initialApolloState)
*/