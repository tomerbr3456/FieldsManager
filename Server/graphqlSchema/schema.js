import graphql from "graphql";
import { addField, getFields, } from "../logics/fields.js";
import { addReservedField, getReservedFields, removeReservedField } from "../logics/reservedFields.js";

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = graphql;

const FieldType = new GraphQLObjectType({
  name: "Field",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    picture: { type: GraphQLString },
    city: { type: GraphQLString },
    address: { type: GraphQLString },
    field_type: { type: GraphQLString },
    lng: { type: GraphQLString },
    lat: { type: GraphQLString },
  }),
});

const ReservedFieldType = new GraphQLObjectType({
  name: "ReservedField",
  fields: () => ({
    id: { type: GraphQLString },
    reservedBy: { type: GraphQLString },
    fieldId: { type: GraphQLString },
    date: { type: GraphQLString },
    field: {
      type: FieldType,
      resolve(parent, args) {
        return getField(parent.field_id);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "rootQueryType",
  fields: {
    fields: {
      type: new GraphQLList(FieldType),
      resolve: async (parent, args) => {
        const x = await getFields();
        return x;
      },
    },
    reservedfields: {
      type: new GraphQLList(ReservedFieldType),
      resolve: async (parent, args) => {
        const x = await getReservedFields();
        return x;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",

  fields: {
    addField: {
      type: FieldType,
      args: {
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        city: { type: GraphQLString },
        address: { type: GraphQLString },
        field_type: { type: GraphQLString },
      },
      resolve(parent, args) {
        console.log("parent", parent);
        console.log("args", args);
        addField(args);
      },
    },

    addReservedField: {
      type: ReservedFieldType,
      args: {
        reservedBy: { type: GraphQLString },
        fieldId: { type: GraphQLString },
        date: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        console.log("args", args);
        const y = await addReservedField(args);
        console.log("y", y);
        return y;
      },
    },
    removeReservedField: {
      type: ReservedFieldType,
      args: {
        fieldId: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        const y = await removeReservedField(args);
        return y;
      }
    },
  }
})

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});