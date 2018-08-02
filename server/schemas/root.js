'use strict';

const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLList,
    GraphQLSchema
} = graphql;
const { ClientType, ClientMutation } = require('./client');

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        client: {
            type: ClientType,
            args: {
                clientId: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return ClientType.findById(args.clientId);
            }
        },
        clients: {
            type: GraphQLList(ClientType),
            resolve(parent, args) {
                return ClientType.find({});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    clientMutation: ClientMutation
});