const axios = require('axios');

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLSchema,
	GraphQLList,
	GraphQLNonNull
} = require('graphql');

const BASE_URL = 'https://api.stackexchange.com/2.2/questions';

//User Type
const UserType = new GraphQLObjectType({
	name: 'User',
	description: '',
	fields: () => ({
		diplayName: {
			type: GraphQLString,
			resolve: user => user.display_name,
		},
		id: {
			type: GraphQLInt,
			resolve: user => user.user_id,
		},
		reputation: {type:GraphQLInt},
		link: {type:GraphQLString}
	})
});

//Question Type
const QuestionType = new GraphQLObjectType({
	name: 'Question',
	fields: () => ({
		title: {type: GraphQLString},
		questionId: {
			type: GraphQLString,
			resolve: question => question.question_id,
		},
		link: {type: GraphQLString},
		score: {type: GraphQLInt},
		owner: {type: UserType}
	})
});

// Root Query
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		questions: {
			type: new GraphQLList(QuestionType),
			args: {
				tag: {type:GraphQLString},
				limit: {type:GraphQLInt},
				score: {type:GraphQLInt},
				sort: {type:GraphQLString}
			},
			resolve(parentValue, args){
				var relativeURL = '?sort='+args.sort+'&pagesize='+args.limit+'&site=stackoverflow&tagged='+args.tag+'&min='+args.score;
				return axios.get(BASE_URL+relativeURL)
					.then(res => res.data.items);
					/*
					.then(function(response) {
         		console.log(response.data);
      		}).catch(function(error) {
         		console.log(error.response.data);
      		});
      		*/
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});
