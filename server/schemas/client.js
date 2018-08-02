'use strict';

const graphql = require('graphql');
const ClientModel = require('../models/client');
const ProjectModel = require('../models/project');
const {ProjectSchema} = require('./project');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const ClientSchema = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: { type: GraphQLID },
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
            type: GraphQLList(ProjectSchema),
            resolve(parent, args) {
                return ProjectModel.find({
                    clientId: parent.clientId
                });
            }
        }
    })
});

const ClientMutation = {
    addClient: {
        type: ClientSchema,
        args: {
            clientName: { type: new GraphQLNonNull(GraphQLString) },
            descriptor: { type: GraphQLString },
            primaryContact: { type: GraphQLString },
            address1: { type: new GraphQLNonNull(GraphQLString) },
            address2: { type: GraphQLString },
            city: { type: new GraphQLNonNull(GraphQLString) },
            state: { type: new GraphQLNonNull(GraphQLString) },
            zip: { type: new GraphQLNonNull(GraphQLString) },
            zipExt: { type: GraphQLString },
            notes: { type: GraphQLString },
            payOnly: { type: GraphQLBoolean }
        },
        resolve(parent, args) {
            let client = new ClientModel({
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

module.exports = {
    ClientModel,
    ClientSchema,
    ClientMutation
};