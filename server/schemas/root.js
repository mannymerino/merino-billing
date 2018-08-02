'use strict';

const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLList,
    GraphQLSchema
} = graphql;

// import schemas
const { ClientModel, ClientSchema, ClientMutation } = require('./client');
const { ProjectModel, ProjectSchema, ProjectMutation } = require('./project');

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        client: {
            type: ClientSchema,
            args: {
                clientId: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return ClientModel.findById(args.clientId);
            }
        },
        clients: {
            type: GraphQLList(ClientSchema),
            resolve(parent, args) {
                return ClientModel.find({});
            }
        },
        project: {
            type: ProjectSchema,
            args: {
                projectId: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return ProjectModel.findById(args.projectId);
            }
        },
        projects: {
            type: GraphQLList(ProjectSchema),
            resolve(parent, args) {
                return ProjectModel.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: mapMutations([ClientMutation, ProjectMutation])
});

function mapMutations(mutations) {
    let mappedMutations = {};
    for (let i = 0; i < mutations.length; i++) {
        let mutation = mutations[i];
        mappedMutations = Object.assign(mutation, mappedMutations);
    }
    return mappedMutations;
}

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});