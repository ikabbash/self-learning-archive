import { gql } from '@apollo/client';

const ADD_CLIENT = gql`
    mutation addClient($name: String!, $email: String!, $phone: String!) {
        addClient(name: $name, email: $email, phone: $phone) {
            id
            name
            email
            phone
        }
    }
`;

const DELETE_CLIENT = gql`
    mutation deleteClient($id: ID!) {
        deleteClient(id: $id) {
            id
            name
            email
            phone
        }
    }
`;

// mutation deleteClient($id: ID!) is the args
// the list below without commas are the return

export { DELETE_CLIENT, ADD_CLIENT };