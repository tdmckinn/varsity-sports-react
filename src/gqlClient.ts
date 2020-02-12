import { SubscriptionClient } from 'subscriptions-transport-ws'
import {
  cacheExchange,
  createClient,
  debugExchange,
  fetchExchange,
  subscriptionExchange,
} from 'urql'

 const subscriptionClient = new SubscriptionClient(
  process.env.REACT_APP_GRAPHQL_WS_URL!,
  {}
)

const client = createClient({
  url: process.env.REACT_APP_GRAPHQL_URL!,
  exchanges: [
    debugExchange,
    cacheExchange,
    fetchExchange,
    subscriptionExchange({
      forwardSubscription: (operation) => subscriptionClient.request(operation),
    }),
  ],
})

export { client }
