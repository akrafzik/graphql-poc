const { ApolloServer, gql } = require('apollo-server');
const employees = require("@jsdevtools/static-mock-data/employees.json");

const typeDefs = gql`
    type Query {
        employees: [Employee]
    }
    type Employee {
        id: ID!
        username: String,
        gender: String,
        email: String,
        department: String @deprecated (reason: "Because I want to test a deprecation decorator"),
        roles: [String]
    }
`

const resolvers = {
    Query: {
        employees: () => {
            return employees
        }
    }
}

const gqlServer = new ApolloServer({ typeDefs, resolvers });

gqlServer.listen({ port: process.env.port || 4000 })
    .then(({ url }) => console.log(`graphQL server started on ${url}`))