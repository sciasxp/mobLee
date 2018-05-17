const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLSchema,
	GraphQLList,
	GraphQLNonNull
} = require('graphql');

// Hardcoded data
const customer = [
	{id:'1', name:'John Doe', email:'jdoe@gmail.com', age:35},
	{id:'2', name:'Steve Smith', email:'steve@gmail.com', age:29},
	{id:'3', name:'Sara Williams', email:'sara@gmail.com', age:32},
];

//CustomerType
const CustomerType = new GraphQLObjectType({
	name:'Customer',
	fields:() => ({
		id: {type:GraphQLString},
		name: {type:GraphQLString},
		email: {type:GraphQLString},
		age: {type:GraphQLInt},
	})
});

// Root Query
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields:{
		customer:{
			type:CustomerType,
			args:{
				id:{type:GraphQLString}
			},
			resolve(parentValue, args){
				for (let i = 0; i < customer.length; i++){
					if (customer[i].id == args.id) {
						return customer[i];
					}
				}
			}
		},
		customers:{
			type: new GraphQLList(CustomerType),
			resolve(parentValue, args){
				return customer;
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});