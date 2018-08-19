'use strict';

const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLFloat
} = graphql;

// import models
const ClientModel = require('../models/client')
,   ProjectModel = require('../models/project')
,   InvoiceModel = require('../models/invoice')
,   StatusModel = require('../models/status')
,   UnitTypeModel = require('../models/unitType')
,   ChargeTypeModel = require('../models/chargeType')
,   LineitemModel = require('../models/lineitem')
,   ContactTypeModel = require('../models/contactType')
,   ClientContactModel = require('../models/clientContact');

// import schemas
// const { ClientType, ClientMutation } = require('./client');
// const { ProjectType, ProjectMutation } = require('./project');

const ClientType = new GraphQLObjectType({
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
            type: GraphQLList(ProjectType),
            resolve(parent, args) {
                return ProjectModel.find({
                    clientId: parent.id
                });
            }
        }
    })
});

const ClientMutation = {
    addClient: {
        type: ClientType,
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

const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        startDate: { type: GraphQLString }, // TODO: GraphQLScalarType?
        endDate: { type: GraphQLString }, // TODO: GraphQLScalarType?
        referenceNumber: { type: GraphQLString },
        notes: { type: GraphQLString },
        client: { 
            type: ClientType,
            resolve(parent, args) {
                return ClientModel.findById(parent.clientId)
            }
        },
        invoices: {
            type: GraphQLList(InvoiceType),
            resolve(parent, args) {
                return InvoiceModel.find({
                    projectId: parent.id
                });
            }
        }
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

const InvoiceType = new GraphQLObjectType({
    name: 'Invoice',
    fields: () => ({
        id: { type: GraphQLID },
        invoiceDate: { type: GraphQLString },
        notes: { type: GraphQLString },
        status: {
            type: StatusType,
            resolve(parent, args) {
                return StatusModel.findById(parent.statusId);
            }
        },
        project: {
            type: ProjectType,
            resolve(parent, args) {
                return ProjectModel.findById(parent.projectId);
            }
        },
        // lineitems: {
        //     type: GraphQLList(LineitemType),
        //     resolve(parent, args) {
        //         return LineitemModel.find({
        //             invoiceId: parent.id
        //         });
        //     }
        // }
    }),
});

const InvoiceMutation = {
    addInvoice: {
        type: InvoiceType,
        args: {
            projectId: { type: new GraphQLNonNull(GraphQLID) },
            statusId: { type: GraphQLID, description: 'Don\'t enter unless you want to override the default' },
            invoiceDate: { type: new GraphQLNonNull(GraphQLString) },
            notes: { type: GraphQLString }
        },
        resolve(parent, args) {
            let invoice = new InvoiceModel({
                projectId: args.projectId,
                statusId: args.statusId || StatusModel.findOne({default: {$eq: true}}).id,
                invoiceDate: args.invoiceDate,
                notes: args.notes
            });
            return invoice.save();
        }
    }
};

const StatusType = new GraphQLObjectType({
    name: 'Status',
    fields: () => ({
        id: { type: GraphQLID },
        status: { type: GraphQLString },
        default: { type: GraphQLBoolean }
    })
});

const StatusMutation = {
    addStatus: {
        type: StatusType,
        args: {
            status: { type: new GraphQLNonNull(GraphQLString) },
            default: { type: GraphQLBoolean }
        },
        resolve(parent, args) {
            let status = new StatusModel({
                status: args.status,
                default: args.default || false
            });
            return status.save();
        }
    }
};

const UnitTypeType = new GraphQLObjectType({
    name: 'UnitType',
    fields: () => ({
        id: { type: GraphQLID },
        typeName: { type: GraphQLString },
        default: { type: GraphQLBoolean }
    })
});

const UnitTypeMutation = {
    addUnitType: {
        type: UnitTypeType,
        args: {
            typeName: { type: new GraphQLNonNull(GraphQLString) },
            default: { type: GraphQLBoolean }
        },
        resolve(parent, args) {
            let unitType = new UnitTypeModel({
                typeName: args.typeName,
                default: args.default || false
            });
            return unitType.save();
        }
    }
};

const ChargeTypeType = new GraphQLObjectType({
    name: 'ChargeType',
    fields: () => ({
        id: { type: GraphQLID },
        typeName: { type: GraphQLString },
        default: { type: GraphQLBoolean }
    })
});

const ChargeTypeMutation = {
    addChargeType: {
        type: ChargeTypeType,
        args: {
            typeName: { type: new GraphQLNonNull(GraphQLString) },
            default: { type: GraphQLBoolean }
        },
        resolve(parent, args) {
            let chargeType = new UnitTypeModel({
                typeName: args.typeName,
                default: args.default || false
            });
            return chargeType.save();
        }
    }
};

const ContactTypeType = new GraphQLObjectType({
    name: 'ContactType',
    fields: () => ({
        id: { type: GraphQLID },
        typeName: { type: GraphQLString },
        default: { type: GraphQLBoolean }
    })
});

const ContactTypeMutation = {
    addContactType: {
        type: ContactTypeType,
        args: {
            typeName: { type: new GraphQLNonNull(GraphQLString) },
            default: { type: GraphQLBoolean }
        },
        resolve(parent, args) {
            let contactType = new UnitTypeModel({
                typeName: args.typeName,
                default: args.default || false
            });
            return contactType.save();
        }
    }
};

const ClientContactType = new GraphQLObjectType({
    name: 'ClientContact',
    fields: () => ({
        id: { type: GraphQLID },
        contactValue: { type: GraphQLString },
        client: {
            type: ClientType,
            resolve(parent, args) {
                return ClientModel.findById(parent.clientId);
            }
        },
        contactType: {
            type: ContactTypeType,
            resolve(parent, args) {
                return ContactTypeModel.findById(parent.contactTypeId);
            }
        }
    }),
});

const ClientContactMutation = {
    addClientContact: {
        type: ClientContactType,
        args: {
            clientId: { type: new GraphQLNonNull(GraphQLID) },
            contactTypeId: { type: GraphQLID, description: 'Don\'t enter unless you want to override the default' },
            contactValue: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve(parent, args) {
            let clientContact = new ClientContactModel({
                clientId: args.clientId,
                contactTypeId: args.contactTypeId || ClientContactModel.findOne({default: {$eq: true}}).id,
                contactValue: args.contactValue
            });
            return clientContact.save();
        }
    }
};

const LineitemType = new GraphQLObjectType({
    name: 'Lineitem',
    fields: () => ({
        id: { type: GraphQLID },
        quantity: { type: GraphQLInt },
        rate: { type: GraphQLFloat },
        amountPaid: { type: GraphQLFloat },
        invoice: {
            type: InvoiceType,
            resolve(parent, args) {
                return InvoiceModel.findById(parent.invoiceId);
            }
        },
        chargeType: {
            type: ChargeTypeType,
            resolve(parent, args) {
                return ChargeTypeModel.findById(parent.chargeTypeId);
            }
        },
        unitType: {
            type: UnitTypeType,
            resolve(parent, args) {
                return UnitTypeModel.findById(parent.unitTypeId);
            }
        },
    }),
});

const LineitemMutation = {
    addLineitem: {
        type: LineitemType,
        args: {
            invoiceId: { type: new GraphQLNonNull(GraphQLID) },
            chargeTypeId: { type: GraphQLID, description: 'Don\'t enter unless you want to override the default' },
            unitTypeId: { type: GraphQLID, description: 'Don\'t enter unless you want to override the default' },
            quantity: { type: GraphQLInt, description: 'Don\'t enter unless you want to override the default' },
            rate: { type: GraphQLFloat },
            amountPaid: { type: GraphQLFloat }
        },
        resolve(parent, args) {
            let lineitem = new LineitemModel({
                invoiceId: args.invoiceId,
                chargeTypeId: args.chargeTypeId || ChargeTypeModel.findOne({default: {$eq: true}}).id,
                unitTypeId: args.unitTypeId || UnitTypeModel.findOne({default: {$eq: true}}).id,
                quantity: args.quantity,
                rate: args.rate,
                amountPaid: args.amountPaid
            });
            return lineitem.save();
        }
    }
};

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        client: {
            type: ClientType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return ClientModel.findById(args.id);
            }
        },
        clients: {
            type: GraphQLList(ClientType),
            resolve(parent, args) {
                return ClientModel.find({});
            }
        },
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return ProjectModel.findById(args.id);
            }
        },
        projects: {
            type: GraphQLList(ProjectType),
            resolve(parent, args) {
                return ProjectModel.find({});
            }
        },
        invoice: {
            type: InvoiceType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return InvoiceModel.findById(args.id);
            }
        },
        invoices: {
            type: GraphQLList(InvoiceType),
            resolve(parent, args) {
                return InvoiceModel.find({});
            }
        },
        statuses: {
            type: GraphQLList(StatusType),
            resolve(parent, args) {
                return StatusModel.find({});
            }
        },
        unitTypes: {
            type: GraphQLList(UnitTypeType),
            resolve(parent, args) {
                return UnitTypeModel.find({});
            }
        },
        chargeTypes: {
            type: GraphQLList(ChargeTypeType),
            resolve(parent, args) {
                return ChargeTypeModel.find({});
            }
        },
        contactTypes: {
            type: GraphQLList(ContactTypeType),
            resolve(parent, args) {
                return ContactTypeModel.find({});
            }
        },
        clientContact: {
            type: ClientContactType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return ClientContactModel.findById(args.id);
            }
        },
        clientContacts: {
            type: GraphQLList(ClientContactType),
            resolve(parent, args) {
                return ClientContactModel.find({});
            }
        },
        lineitem: {
            type: LineitemType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return LineitemModel.findById(args.id);
            }
        },
        lineitems: {
            type: GraphQLList(LineitemType),
            resolve(parent, args) {
                return LineitemModel.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: mapMutations([
        ClientMutation, 
        ProjectMutation, 
        InvoiceMutation, 
        StatusMutation, 
        UnitTypeMutation,
        ChargeTypeMutation,
        ContactTypeMutation,
        ClientContactMutation,
        LineitemMutation
    ])
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