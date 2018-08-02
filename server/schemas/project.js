'use strict';

const graphql = require('graphql');
const ProjectModel = require('../models/project');
const {ClientSchema, ClientModel} = require('./client');
// const {InvoiceSchema, InvoiceModel} = require('./invoice');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLScalarType, // for dates?
    GraphQLList,
    GraphQLNonNull
} = graphql;

const ProjectSchema = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        startDate: { type: GraphQLString }, // TODO: GraphQLScalarType?
        startDate: { type: GraphQLString }, // TODO: GraphQLScalarType?
        referenceNumber: { type: GraphQLString },
        notes: { type: GraphQLString },
        client: { 
            type: ClientSchema,
            resolve(parent, args) {
                return ClientModel.findById(parent.clientId)
            }
        }
        // invoices: {
        //     type: GraphQLList(InvoiceSchema),
        //     resolve(parent, args) {
        //         return InvoiceModel.find({
        //             projectId: parent.projectId
        //         });
        //     }
        // }
    })
});

const ProjectMutation = {
    addProject: {
        type: ProjectSchema,
        args: {
            clientId: { type: new GraphQLNonNull(GraphQLID) },
            title: { type: new GraphQLNonNull(GraphQLString) },
            description: { type: GraphQLString },
            startDate: { type: new GraphQLNonNull(GraphQLString) }, // TODO: GraphQLScalarType?
            endDate: { type: GraphQLString }, // TODO: GraphQLScalarType?
            referenceNumber: { type: GraphQLString },
            notes: { type: GraphQLString }
        },
        resolve(parent, args) {
            let project = new ProjectModel({
                clientId: args.clientId,
                title: args.title,
                description: args.description,
                startDate: args.startDate,
                endDate: args.endDate,
                referenceNumber: args.referenceNumber,
                notes: args.notes
            });
            return project.save();
        }
    }
};

module.exports = {
    ProjectModel,
    ProjectSchema,
    ProjectMutation
};