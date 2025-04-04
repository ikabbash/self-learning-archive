import { gql } from '@apollo/client';

// just like in the graphql UI on browser
const GET_CLIENTS = gql`
    query getClients {
        clients {
            id
            name
            email
            phone
        }
    }
`;

export { GET_CLIENTS };