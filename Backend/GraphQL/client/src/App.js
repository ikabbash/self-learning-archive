import Header from "./components/Header";
// Apollo is a client that works with GraphQL API
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
// we'll also use cache since we want the client to be shown
// right away in the list with no need of reloading the page

import Clients from "./components/Clients";
import AddClientModal from "./components/AddClientModal";


// to avoid getting the following error when using deleteClient:
//  "Cache data may be lost when replacing the clients field of a Query object"
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          }
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          }
        }
      }
    }
  }
});

// to wrap the provider around everything
const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  // cache: new InMemoryCache(), // before the Stackoverflow solution
  cache,
});

function App() {
  return (
  <>
  <ApolloProvider client={client}>
    <Header />
      <div className="container">
        <AddClientModal />
        <Clients />
      </div>
  </ApolloProvider>
  </>
  );
}

export default App;
