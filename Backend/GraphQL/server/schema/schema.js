// const { projects, clients } = require('../sampleData');
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType } = require('graphql');
// when you have different resources like projects, clients
// users, blog posts, etc.. you want to create a type for them

// Mongoose models
const Project = require('../models/Project');
const Client = require('../models/Client');

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
                // return clients.find(client => client.id === parent.clientId);
                // the parent is the project
                return Client.findById(parent.clientId);
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
                // return clients;
                return Client.find();
            }
        },
        // specific client query
        client: {
            type: ClientType,
            args: { id: {type: GraphQLID } },
            // when we have our return or response we need a resolver
            resolve(parentValue, args) {
                // return clients.find(client => client.id === args.id);
                return Client.findById(args.id);
            }
        },

        // same goes for projects
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args) {
                // return projects; // local way
                 // find is a mongoose func, if nothing specific then returns everything
                return Project.find();
            }
        },
        project: {
            type: ProjectType,
            args: { id: {type: GraphQLID } },
            resolve(parentValue, args) {
                // return projects.find(project => project.id === args.id);
                return Project.findById(args.id);
            }
        }
    }
})


// Mutations: if you want to add, change or delete data
// you'll have to make mutations
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // add client
        addClient: {
            type: ClientType,
            // fields you wanna add
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                phone: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                // new client using mongoose model
                const client = new Client({
                    name: args.name,
                    email: args.email,
                    phone: args.phone,
                });
                return client.save();
            }
        },
        // delete client
        deleteClient: {
            type: ClientType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                return Client.findByIdAndRemove(args.id);
            }
        },

        // add a project
        addProject: {
            type: ProjectType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLNonNull(GraphQLString) },
                status: { type: new GraphQLEnumType({
                    name: 'ProjectStatus',
                    values: {
                        'new': {value: 'Not Started'},
                        'progress': {value: 'In Progress'},
                        'completed': {value: 'Completed'},
                        }   
                    }), defaultValue: 'Not Started'
                },
                clientId: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                const project = new Project({
                    name: args.name,
                    description: args.description,
                    status: args.status,
                    clientId: args.clientId,
                });
                return project.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    // will take an object with query
    query: RootQuery, mutation
})