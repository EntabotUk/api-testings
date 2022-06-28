import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client";
import { Box } from "@mui/system";
import Employees from "./data/Employees";


const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'https://entabot-playground.hasura.app/v1/graphql',
    headers: {
      'x-hasura-admin-secret': 'UOXCdo3WAj2nvcgILWrbMVtyaPonBNmX5c4Ui6mgdDDHzo2aHt0IuFpmWDxO4cw6'
      }
  })
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Box>
      <Employees />
      </Box>
    </ApolloProvider>
  );
}

export default App;
