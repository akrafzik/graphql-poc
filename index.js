const { ApolloServer, gql } = require('apollo-server');
const EmployeeService = require('./datasource/file');

const typeDefs = gql`
    type Query {
        employees(        
            username: String,
            gender: String,
            email: String,
            department: String,
            roles: [String]
            ): [Employee],
        findEmployeeByEmail(email: String): Employee
    }
    type Employee {
        username: String,
        gender: String,
        email: String,
        department: String @deprecated (reason: "Because I want to test a deprecation decorator"),
        roles: [String]
    }
`

const dataSources = () => ({
    employeeService: new EmployeeService()
})

const resolvers = {
    Query: {
        employees: (parent, args, { dataSources }, info) => {
            return dataSources.employeeService.getEmployees(args)
        },
        findEmployeeByEmail: (parent, { email }, { dataSources }, info) => {
            return dataSources.employeeService.getEmployeeByEmail(email);
        }
    }
}

const gqlServer = new ApolloServer({ typeDefs, resolvers, dataSources });

gqlServer.listen({ port: process.env.port || 4000 })
    .then(({ url }) => console.log(`graphQL server started on ${url}`))