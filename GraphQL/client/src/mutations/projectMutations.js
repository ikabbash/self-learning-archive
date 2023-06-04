import { gql } from "@apollo/client";

const ADD_PROJECT = gql`
    mutation AddProject(
        $name: String!
        $description: String!
        $status: ProjectStatus!
        $clientId: ID!
    ) {
        addProject(
        name: $name
        description: $description
        status: $status
        clientId: $clientId
        ) {
        id
        name
        description
        status
        client {
            id
            name
            email
            phone
        }
        }
    }
`;
// $status: ProjectStatus! comes from the backend (schema file)
// where the enum was named ProjectStatus
// same idea goes to UpdateProject but it's ProjectStatusUpdate! due to schema

const DELETE_PROJECT = gql`
    mutation deleteProject($id: ID!) {
        deleteProject(id: $id) {
            id
        }
    }
`;

const UPDATE_PROJECT = gql`
    mutation UpdateProject(
        $id: ID!
        $name: String!
        $description: String!
        $status: ProjectStatusUpdate!
    ) {
        updateProject(
        id: $id
        name: $name
        description: $description
        status: $status
        ) {
        id
        name
        description
        status
        client {
            id
            name
            email
            phone
        }
        }
    }
`;

export { ADD_PROJECT, DELETE_PROJECT, UPDATE_PROJECT };