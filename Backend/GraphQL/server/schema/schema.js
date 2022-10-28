const { projects, clients } = require('../sampleData');
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList } = require('graphql');
// when you have different resources like projects, clients
// users, blog posts, etc.. you want to create a type for them

// client type
const ClientType = new GraphQLObjectType({
    name: 'Client',
    // fields is a function that returns an object
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString }
    })
});

// project type
const ProjectType = new GraphQLObjectType({
    name: 'project',
    // fields is a function that returns an object
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        // relationships between different types or resources
        client: {
            type: ClientType,
            resolve(parent, args) {
                return clients.find(client => client.id === parent.clientId);
            }
        }
    })
});



// to make a query say we want to get a client by ID
// root query object
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    // an object that'll pertain queries
    // say fetch a client
    fields: {
        // a query to get all clients
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args) {
                return clients;
            }
        },
        // specific client query
        client: {
            type: ClientType,
            args: { id: {type: GraphQLID } },
            // when we have our return or response we need a resolver
            resolve(parentValue, args) {
                return clients.find(client => client.id === args.id);
            }
        },

        // same goes for projects
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args) {
                return projects;
            }
        },
        project: {
            type: ProjectType,
            args: { id: {type: GraphQLID } },
            resolve(parentValue, args) {
                return projects.find(project => project.id === args.id);
            }
        }
    }
})

module.exports = new GraphQLSchema({
    // will take an object with query
    query: RootQuery
})