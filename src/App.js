import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/link-ws";
import { Box, Button, Container } from "@mui/material";
import React from "react";
import NewEmployee from "./components/NewEmployee";
import Employees from "./data/Employees";



const wsLink = new WebSocketLink({
  uri: `ws://entabot-playground.hasura.app/v1/graphql`,
  options:{
    reconnect: true,
    connectionParams: {
      headers: {
        'x-hasura-admin-secret': 'UOXCdo3WAj2nvcgILWrbMVtyaPonBNmX5c4Ui6mgdDDHzo2aHt0IuFpmWDxO4cw6'
        },
    }
  },
})

const httpLink = new HttpLink({
  uri: 'https://entabot-playground.hasura.app/v1/graphql',
  headers: {
    'x-hasura-admin-secret': 'UOXCdo3WAj2nvcgILWrbMVtyaPonBNmX5c4Ui6mgdDDHzo2aHt0IuFpmWDxO4cw6'
    },
})
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return(
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink
})

function App() {
  const [open, setOpen] = React.useState(false);
  return (
    <ApolloProvider client={client}>
      <Container>
      <Button variant="contained" onClick={() => setOpen(true)}>Add new employee</Button>
      <NewEmployee show={open} close={() => setOpen(false)}/>
      <Box mt={1}>
      <Employees />
      </Box>
      </Container>
    </ApolloProvider>
  );
}

export default App;
