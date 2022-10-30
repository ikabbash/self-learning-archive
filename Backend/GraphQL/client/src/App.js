import Header from "./components/Header";
// Apollo is a client that works with GraphQL API
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
// we'll also use cache since we want the client to be shown
// right away in the list with no need of reloading the page

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Project from './pages/Project';

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
    <Router>
    <Header />

      <div className="container">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/projects/:id' element={<Project />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>

    </Router>
  </ApolloProvider>
  </>
  );
}

export default App;
