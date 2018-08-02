'use strict';

const graphql = require('graphql');
const Client = require('../models/client');
const ProjectType = require('./schemas/project');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLID,
    GraphQLScalarType, // for dates?
    GraphQLList,
    GraphQLNonNull
} = graphql;

const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        clientId: { type: GraphQLID },
        clientName: { type: GraphQLString },
        descriptor: { type: GraphQLString },
        primaryContact: { type: GraphQLString },
        address1: { type: GraphQLString },
        address2: { type: GraphQLString },
        city: { type: GraphQLString },
        state: { type: GraphQLString },
        zip: { type: GraphQLString },
        zipExt: { type: GraphQLString },
        notes: { type: GraphQLString },
        payOnly: { type: GraphQLBoolean },
        projects: {
            type: GraphQLList(ProjectType),
            resolve(parent, args) {
                return Project.find({
                    clientId: parent.clientId
                });
            }
        }
    })
});

const ClientMutation = new GraphQLObjectType({
    name: 'ClientMutation',
    fields: {
        addClient: {
            type: ClientType,
            args: {
                clientName: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                descriptor: {
                    type: GraphQLString
                },
                primaryContact: { 
                    type: GraphQLString
                },
                address1: { 
                    type: new GraphQLNonNull(GraphQLString)
                },
                address2: { 
                    type: GraphQLString
                },
                city: { 
                    type: new GraphQLNonNull(GraphQLString)
                },
                state: { 
                    type: new GraphQLNonNull(GraphQLString)
                },
                zip: { 
                    type: new GraphQLNonNull(GraphQLString)
                },
                zipExt: { 
                    type: GraphQLString
                },
                notes: { 
                    type: GraphQLString
                },
                payOnly: { 
                    type: GraphQLBoolean
                }
            },
            resolve(parent, args) {
                let client = new Client({
                    clientName: args.clientName,
                    descriptor: args.descriptor,
                    primaryContact: args.primaryContact,
                    address1: args.address1,
                    address2: args.address2,
                    city: args.city,
                    state: args.state,
                    zip: args.zip,
                    zipExt: args.zipExt,
                    notes: args.notes,
                    payOnly: args.payOnly,
                });
                return client.save();
            }
        }
    }
});

module.exports = {
    ClientType,
    ClientMutation
};