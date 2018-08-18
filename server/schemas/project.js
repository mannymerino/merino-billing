'use strict';

const graphql = require('graphql');
const ProjectModel = require('../models/project');
const {ClientType, ClientModel} = require('./client');
// const {InvoiceType, InvoiceModel} = require('./invoice');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLScalarType, // for dates?
    GraphQLList,
    GraphQLNonNull
} = graphql;

const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        startDate: { type: GraphQLString }, // TODO: GraphQLScalarType?
        startDate: { type: GraphQLString }, // TODO: GraphQLScalarType?
        referenceNumber: { type: GraphQLString },
        notes: { type: GraphQLString },
        client: {   // TODO: resolve --> throws error in this modularized version:
                    // "The type of Project.client must be Output Type but got: undefined."
            type: ClientType,
            resolve(parent, args) {
                return ClientModel.findById(parent.clientId)
            }
        }
        // invoices: {
        //     type: GraphQLList(InvoiceType),
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
        type: ProjectType,
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
    ProjectType,
    ProjectMutation
};